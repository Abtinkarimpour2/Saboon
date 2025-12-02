import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-dark/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'tween',
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed top-0 left-0 h-full w-full md:w-96 bg-ivory shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif">سبد خرید</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-dark/70 hover:text-gold transition-colors"
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

              {/* Cart Items */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-dark/50 mb-4">سبد خرید شما خالی است</p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="text-gold hover:underline"
                  >
                    شروع خرید
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-white rounded-lg"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-gold text-sm mb-2">
                            {formatPrice(item.product.price)}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-dark/20 rounded hover:border-gold transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-dark/20 rounded hover:border-gold transition-colors"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="mr-auto text-red-500 hover:text-red-700 text-sm"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-dark/10 pt-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">جمع کل:</span>
                      <span className="text-xl font-serif text-gold">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full bg-gold text-white text-center py-3 rounded-lg hover:bg-gold/90 transition-colors mb-2"
                    >
                      تسویه حساب
                    </Link>
                    <button
                      onClick={clearCart}
                      className="block w-full text-dark/50 text-center py-2 text-sm hover:text-dark transition-colors"
                    >
                      پاک کردن سبد خرید
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

