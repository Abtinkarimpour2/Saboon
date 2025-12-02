import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../context/ProductsContext'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { logout } = useAuth()
  const { products } = useProducts()
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
      title: 'صابون‌ها',
      value: products.filter((p) => p.category === 'soaps').length,
      icon: '🧼',
      color: 'bg-pink-500',
    },
    {
      title: 'روغن‌ها',
      value: products.filter((p) => p.category === 'oils').length,
      icon: '💧',
      color: 'bg-yellow-500',
    },
    {
      title: 'ست‌های هدیه',
      value: products.filter((p) => p.category === 'gift-sets').length,
      icon: '🎁',
      color: 'bg-green-500',
    },
  ]

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
              to="/admin/products/new"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              افزودن محصول جدید
            </Link>
          </div>
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

