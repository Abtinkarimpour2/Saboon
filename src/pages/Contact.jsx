import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContactMessages } from '../context/ContactMessagesContext'

export default function Contact() {
  const { addMessage } = useContactMessages()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'wholesale',
  })

  const validatePhone = (phone) => {
    // Remove all spaces for validation
    const cleanPhone = phone.replace(/\s/g, '')
    
    // Iran: +989121003434 or 09121003434 (11 digits starting with 0 or +98)
    const iranPattern = /^(\+98|0)?9\d{9}$/
    
    // Turkey: +905355599991 or 05355599991 (11 digits starting with 0 or +90)
    const turkeyPattern = /^(\+90|0)?5\d{9}$/
    
    return iranPattern.test(cleanPhone) || turkeyPattern.test(cleanPhone)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate phone number
    if (!validatePhone(formData.phone)) {
      alert('لطفاً یک شماره تلفن معتبر ایرانی یا ترکی وارد کنید')
      return
    }
    
    // ذخیره پیام
    addMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      type: formData.type,
    })
    
    alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      type: 'wholesale',
    })
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-2 text-gold">
              Biaresh
            </h1>
            <p className="text-xl md:text-2xl font-serif text-dark/80 tracking-wide">
              Bath & Body
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            تماس با ما
          </h2>
          <p className="text-dark/70 max-w-2xl mx-auto">
            ما اینجا هستیم تا به سوالات شما پاسخ دهیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-serif mb-6">فرم تماس</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  نوع درخواست
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="wholesale">خرید عمده</option>
                  <option value="retail">خرید خرده</option>
                  <option value="question">سوال</option>
                  <option value="other">سایر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ایمیل <span className="text-dark/50 text-xs">(اختیاری)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">پیام</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-white py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors"
              >
                ارسال پیام
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif mb-6">اطلاعات تماس</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">ایمیل</h3>
                  <a
                    href="mailto:info@biaresh.com"
                    className="text-gold hover:underline"
                  >
                    info@biaresh.com
                  </a>
                </div>

                <div>
                  <h3 className="font-medium mb-2">شماره تماس</h3>
                  <a
                    href="https://wa.me/905393349676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    +90 (539) 334 96 76
                  </a>
                </div>

                <div>
                  <h3 className="font-medium mb-2">اینستاگرام</h3>
                  <a
                    href="https://instagram.com/biaresh_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    @biaresh_shop
                  </a>
                </div>

                <div>
                  <h3 className="font-medium mb-2">ساعات کاری</h3>
                  <p className="text-dark/70">
                    24/7 - در تمام ساعات شبانه‌روز در خدمت شما هستیم
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif mb-6">خرید عمده</h2>
              <p className="text-dark/70 mb-4">
                برای خرید عمده و همکاری، لطفاً فرم تماس را پر کنید یا مستقیماً
                با ما تماس بگیرید.
              </p>
              <a
                href="https://wa.me/905393349676"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                تماس از طریق واتساپ
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

