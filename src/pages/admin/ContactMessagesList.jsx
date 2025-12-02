import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useContactMessages } from '../../context/ContactMessagesContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactMessagesList() {
  const { logout } = useAuth()
  const {
    messages,
    markAsRead,
    markAsUnread,
    deleteMessage,
  } = useContactMessages()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all') // all, read, unread
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleDelete = (id) => {
    deleteMessage(id)
    setDeleteConfirm(null)
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

  const getTypeLabel = (type) => {
    const labels = {
      wholesale: 'خرید عمده',
      retail: 'خرید خرده',
      question: 'سوال',
      other: 'سایر',
    }
    return labels[type] || type
  }

  const filteredMessages = messages.filter((message) => {
    if (filter === 'read') return message.read
    if (filter === 'unread') return !message.read
    return true
  })

  const unreadCount = messages.filter((m) => !m.read).length
  const readCount = messages.filter((m) => m.read).length

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold">
                پیام‌های تماس
              </h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`p-4 rounded-lg text-center transition-all ${
              filter === 'all'
                ? 'bg-gold text-white shadow-lg'
                : 'bg-white text-dark hover:bg-ivory'
            }`}
          >
            <div className="text-2xl font-serif mb-1">{messages.length}</div>
            <div className="text-xs">همه پیام‌ها</div>
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`p-4 rounded-lg text-center transition-all relative ${
              filter === 'unread'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-dark hover:bg-ivory'
            }`}
          >
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <div className="text-2xl font-serif mb-1">{unreadCount}</div>
            <div className="text-xs">خوانده نشده</div>
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`p-4 rounded-lg text-center transition-all ${
              filter === 'read'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white text-dark hover:bg-ivory'
            }`}
          >
            <div className="text-2xl font-serif mb-1">{readCount}</div>
            <div className="text-xs">خوانده شده</div>
          </button>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-dark/50">
              پیامی یافت نشد
            </div>
          ) : (
            <div className="divide-y divide-dark/5">
              <AnimatePresence>
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className={`p-6 hover:bg-ivory transition-colors cursor-pointer ${
                      !message.read ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => {
                      setSelectedMessage(message)
                      if (!message.read) {
                        markAsRead(message.id)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">
                            {message.name}
                          </h3>
                          {!message.read && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              جدید
                            </span>
                          )}
                          <span className="text-xs bg-ivory px-2 py-1 rounded">
                            {getTypeLabel(message.type)}
                          </span>
                        </div>
                        <div className="text-sm text-dark/70 mb-2">
                          <span>{message.email}</span>
                          {message.phone && (
                            <span className="mr-4"> • {message.phone}</span>
                          )}
                        </div>
                        <p className="text-dark/80 line-clamp-2">
                          {message.message}
                        </p>
                        <div className="text-xs text-dark/50 mt-2">
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() =>
                            message.read
                              ? markAsUnread(message.id)
                              : markAsRead(message.id)
                          }
                          className={`px-3 py-1 rounded text-xs transition-colors ${
                            message.read
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {message.read ? 'نشان‌گذاری به عنوان خوانده نشده' : 'خوانده شد'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(message.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Message Details Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="fixed inset-0 bg-dark/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif">جزئیات پیام</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
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

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white text-xl font-serif">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">
                        {selectedMessage.name}
                      </h4>
                      <div className="text-sm text-dark/70">
                        {selectedMessage.email}
                      </div>
                    </div>
                    <span className="mr-auto bg-ivory px-3 py-1 rounded text-sm">
                      {getTypeLabel(selectedMessage.type)}
                    </span>
                  </div>
                </div>

                <div className="bg-ivory p-4 rounded-lg space-y-2 text-sm">
                  <div>
                    <strong>ایمیل:</strong> {selectedMessage.email}
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <strong>تلفن:</strong> {selectedMessage.phone}
                    </div>
                  )}
                  <div>
                    <strong>نوع درخواست:</strong>{' '}
                    {getTypeLabel(selectedMessage.type)}
                  </div>
                  <div>
                    <strong>تاریخ ارسال:</strong>{' '}
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>

                <div>
                  <strong className="block mb-2">پیام:</strong>
                  <div className="bg-ivory p-4 rounded-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-dark/10">
                  <button
                    onClick={() => {
                      selectedMessage.read
                        ? markAsUnread(selectedMessage.id)
                        : markAsRead(selectedMessage.id)
                      setSelectedMessage({
                        ...selectedMessage,
                        read: !selectedMessage.read,
                      })
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      selectedMessage.read
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedMessage.read
                      ? 'نشان‌گذاری به عنوان خوانده نشده'
                      : 'علامت‌گذاری به عنوان خوانده شده'}
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex-1 bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors text-center"
                  >
                    پاسخ از طریق ایمیل
                  </a>
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
              <h3 className="text-xl font-serif mb-4">حذف پیام</h3>
              <p className="text-dark/70 mb-6">
                آیا مطمئن هستید که می‌خواهید این پیام را حذف کنید؟ این عمل
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

