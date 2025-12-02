import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../context/ProductsContext'
import { useOrders } from '../../context/OrdersContext'
import { useContactMessages } from '../../context/ContactMessagesContext'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { logout } = useAuth()
  const { products } = useProducts()
  const { orders } = useOrders()
  const { messages, getUnreadCount } = useContactMessages()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const stats = [
    {
      title: 'کل محصولات',
      value: products.length,
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'کل سفارشات',
      value: orders.length,
      icon: '🛒',
      color: 'bg-purple-500',
    },
    {
      title: 'پیام‌های تماس',
      value: messages.length,
      icon: '📧',
      color: 'bg-indigo-500',
    },
    {
      title: 'پیام‌های خوانده نشده',
      value: getUnreadCount(),
      icon: '🔔',
      color: 'bg-orange-500',
    },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'در انتظار',
      processing: 'در حال پردازش',
      shipped: 'ارسال شده',
      delivered: 'تحویل داده شده',
      cancelled: 'لغو شده',
    }
    return labels[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600',
      processing: 'text-blue-600',
      shipped: 'text-purple-600',
      delivered: 'text-green-600',
      cancelled: 'text-red-600',
    }
    return colors[status] || 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold">پنل مدیریت</h1>
              <p className="text-sm text-dark/70">Biaresh Bath & Body</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-dark/70 hover:text-gold transition-colors text-sm"
              >
                بازگشت به سایت
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-dark/70 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-serif text-dark">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-serif mb-4">عملیات سریع</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/products"
              className="bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors"
            >
              مدیریت محصولات
            </Link>
            <Link
              to="/admin/orders"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              مدیریت سفارشات
            </Link>
            <Link
              to="/admin/contact-messages"
              className={`relative bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors ${
                getUnreadCount() > 0 ? 'pr-10' : ''
              }`}
            >
              پیام‌های تماس
              {getUnreadCount() > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getUnreadCount()}
                </span>
              )}
            </Link>
            <Link
              to="/admin/products/new"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              افزودن محصول جدید
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif">آخرین سفارشات</h2>
            <Link
              to="/admin/orders"
              className="text-gold hover:underline text-sm"
            >
              مشاهده همه
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-dark/50 text-center py-8">
              هنوز سفارشی ثبت نشده است
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark/10">
                    <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                      شماره سفارش
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                      مشتری
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                      مبلغ
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                      وضعیت
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                      تاریخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-dark/5 hover:bg-ivory transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">#{order.id}</td>
                      <td className="py-3 px-4">
                        {order.customer.firstName} {order.customer.lastName}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-sm ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-dark/70">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif">آخرین محصولات</h2>
            <Link
              to="/admin/products"
              className="text-gold hover:underline text-sm"
            >
              مشاهده همه
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark/10">
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                    نام محصول
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                    دسته‌بندی
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                    قیمت
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-dark/70">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-dark/5 hover:bg-ivory transition-colors"
                  >
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4 text-dark/70 text-sm">
                      {product.category}
                    </td>
                    <td className="py-3 px-4">
                      {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-gold hover:underline text-sm"
                      >
                        ویرایش
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

