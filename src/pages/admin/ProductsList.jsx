import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../context/ProductsContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductsList() {
  const { logout } = useAuth()
  const { products, deleteProduct } = useProducts()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleDelete = (id) => {
    deleteProduct(id)
    setDeleteConfirm(null)
  }

  const filteredProducts = products.filter((product) =>
    product.name.includes(searchQuery) ||
    product.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold">مدیریت محصولات</h1>
              <p className="text-sm text-dark/70">Biaresh Bath & Body</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="text-dark/70 hover:text-gold transition-colors text-sm"
              >
                داشبورد
              </Link>
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
        {/* Actions Bar */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 px-4 py-2 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <Link
              to="/admin/products/new"
              className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors whitespace-nowrap"
            >
              + افزودن محصول جدید
            </Link>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ivory">
                <tr>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    تصویر
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    نام محصول
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    دسته‌بندی
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    قیمت
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="border-b border-dark/5 hover:bg-ivory transition-colors"
                    >
                      <td className="py-4 px-6">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-dark/50">
                            {product.nameEn}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-dark/70 text-sm">
                        {product.category}
                      </td>
                      <td className="py-4 px-6 font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            ویرایش
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-dark/50">
              محصولی یافت نشد
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="fixed inset-0 bg-dark/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-serif mb-4">حذف محصول</h3>
              <p className="text-dark/70 mb-6">
                آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟ این عمل
                قابل بازگشت نیست.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  حذف
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-dark/10 text-dark py-2 rounded-lg hover:bg-dark/20 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

