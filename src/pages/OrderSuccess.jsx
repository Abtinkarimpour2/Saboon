import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-serif text-gold mb-6"
        >
          سفارش شما ثبت شد!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-dark/70 mb-4"
        >
          🎉 ممنون از خرید شما!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-dark/60 mb-12 max-w-md mx-auto"
        >
          سفارش شما با موفقیت ثبت شد و به زودی با شما تماس خواهیم گرفت.
          <br />
          <span className="text-gold font-medium">
            تیم ما در تمام ساعات شبانه‌روز در خدمت شماست!
          </span>
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="bg-gold text-white px-8 py-4 rounded-lg font-medium hover:bg-gold/90 transition-all transform hover:scale-105 shadow-lg text-lg min-w-[200px]"
          >
            🏠 بازگشت به صفحه اصلی
          </Link>
          <Link
            to="/shop"
            className="bg-white text-gold border-2 border-gold px-8 py-4 rounded-lg font-medium hover:bg-gold hover:text-white transition-all transform hover:scale-105 shadow-lg text-lg min-w-[200px]"
          >
            🛍️ مشاهده محصولات بیشتر
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center gap-2 text-4xl"
        >
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>
            ✨
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            🌟
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            ✨
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

