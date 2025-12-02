import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { motion } from 'framer-motion'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  })

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-20 text-center">
        <p className="text-xl mb-4">سبد خرید شما خالی است</p>
        <Link to="/shop" className="text-gold hover:underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const validatePhone = (phone) => {
    // Pattern for international phone numbers: allows +, digits, spaces, hyphens, parentheses
    const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
    return phonePattern.test(phone.replace(/\s/g, ''))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate phone number
    if (!validatePhone(formData.phone)) {
      alert('لطفاً یک شماره تلفن معتبر وارد کنید')
      return
    }
    
    // ایجاد سفارش
    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      })),
      total: getTotalPrice(),
      notes: formData.notes || '',
    }

    addOrder(orderData)
    clearCart()
    alert('سفارش شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.')
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // For phone input, only allow valid phone characters
    if (name === 'phone') {
      // Allow digits, +, -, spaces, parentheses
      const phoneValue = value.replace(/[^\d\+\-\(\)\s]/g, '')
      setFormData({
        ...formData,
        [name]: phoneValue,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-ivory">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center">
          تسویه حساب
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-2xl font-serif mb-6">خلاصه سفارش</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <p className="text-dark/50 text-xs">
                        تعداد: {item.quantity}
                      </p>
                      <p className="text-gold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark/70">جمع کل:</span>
                  <span className="text-xl font-serif text-gold">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif mb-6">اطلاعات تحویل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    شماره تماس <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+90 (539) 334 96 76"
                    pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                  <p className="text-xs text-dark/50 mt-1">
                    مثال: +90 (539) 334 96 76 یا 905393349676
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    آدرس
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    شهر
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد پستی
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    یادداشت (اختیاری)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-white py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors text-lg"
              >
                ثبت سفارش
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

