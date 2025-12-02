import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrdersContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function OrdersList() {
  const { logout } = useAuth()
  const { orders, updateOrderStatus, deleteOrder } = useOrders()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  const handleDelete = (id) => {
    deleteOrder(id)
    setDeleteConfirm(null)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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

  const filteredOrders =
    statusFilter === 'all'
      ? orders
      : orders.filter((order) => order.status === statusFilter)

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold">مدیریت سفارشات</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {[
            { key: 'all', label: 'همه' },
            { key: 'pending', label: 'در انتظار' },
            { key: 'processing', label: 'در حال پردازش' },
            { key: 'shipped', label: 'ارسال شده' },
            { key: 'delivered', label: 'تحویل شده' },
            { key: 'cancelled', label: 'لغو شده' },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setStatusFilter(stat.key)}
              className={`p-4 rounded-lg text-center transition-all ${
                statusFilter === stat.key
                  ? 'bg-gold text-white shadow-lg'
                  : 'bg-white text-dark hover:bg-ivory'
              }`}
            >
              <div className="text-2xl font-serif mb-1">
                {statusCounts[stat.key]}
              </div>
              <div className="text-xs">{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ivory">
                <tr>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    شماره سفارش
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    مشتری
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    محصولات
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    مبلغ کل
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    وضعیت
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    تاریخ
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-dark">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-dark/50">
                        سفارشی یافت نشد
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        className="border-b border-dark/5 hover:bg-ivory transition-colors"
                      >
                        <td className="py-4 px-6 font-medium">#{order.id}</td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium">
                              {order.customer.firstName} {order.customer.lastName}
                            </div>
                            <div className="text-sm text-dark/50">
                              {order.customer.phone}
                            </div>
                            <div className="text-xs text-dark/50">
                              {order.customer.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            {order.items.length} محصول
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder?.id === order.id ? null : order
                                )
                              }
                              className="text-gold hover:underline mr-2"
                            >
                              مشاهده
                            </button>
                          </div>
                          {selectedOrder?.id === order.id && (
                            <div className="mt-2 space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-2 text-xs bg-ivory p-2 rounded"
                                >
                                  <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                  <div>
                                    <div>{item.productName}</div>
                                    <div className="text-dark/50">
                                      {item.quantity} × {formatPrice(item.price)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )} border-0 focus:outline-none focus:ring-2 focus:ring-gold`}
                          >
                            <option value="pending">در انتظار</option>
                            <option value="processing">در حال پردازش</option>
                            <option value="shipped">ارسال شده</option>
                            <option value="delivered">تحویل داده شده</option>
                            <option value="cancelled">لغو شده</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-sm text-dark/70">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder?.id === order.id ? null : order
                                )
                              }
                              className="text-blue-500 hover:text-blue-700 text-sm"
                            >
                              {selectedOrder?.id === order.id
                                ? 'بستن'
                                : 'جزئیات'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(order.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedOrder && selectedOrder.id && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-dark/50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif">
                    جزئیات سفارش #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-dark/50 hover:text-dark"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-serif text-lg mb-3">اطلاعات مشتری</h4>
                    <div className="bg-ivory p-4 rounded-lg space-y-2 text-sm">
                      <div>
                        <strong>نام:</strong> {selectedOrder.customer.firstName}{' '}
                        {selectedOrder.customer.lastName}
                      </div>
                      <div>
                        <strong>ایمیل:</strong> {selectedOrder.customer.email}
                      </div>
                      <div>
                        <strong>تلفن:</strong> {selectedOrder.customer.phone}
                      </div>
                      <div>
                        <strong>آدرس:</strong> {selectedOrder.customer.address}
                      </div>
                      <div>
                        <strong>شهر:</strong> {selectedOrder.customer.city} -{' '}
                        {selectedOrder.customer.postalCode}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-serif text-lg mb-3">محصولات</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 bg-ivory p-4 rounded-lg"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-sm text-dark/70">
                              تعداد: {item.quantity}
                            </div>
                            <div className="text-sm text-dark/70">
                              قیمت واحد: {formatPrice(item.price)}
                            </div>
                            <div className="text-gold font-medium mt-1">
                              جمع: {formatPrice(item.total)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-dark/10 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">جمع کل:</span>
                      <span className="text-xl font-serif text-gold">
                        {formatPrice(selectedOrder.total)}
                      </span>
                    </div>
                    {selectedOrder.notes && (
                      <div className="mt-4">
                        <strong>یادداشت:</strong>
                        <p className="text-sm text-dark/70 mt-1">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    )}
                    <div className="mt-4">
                      <strong>تاریخ ثبت:</strong>
                      <p className="text-sm text-dark/70 mt-1">
                        {formatDate(selectedOrder.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
                <h3 className="text-xl font-serif mb-4">حذف سفارش</h3>
                <p className="text-dark/70 mb-6">
                  آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ این عمل
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
    </div>
  )
}

