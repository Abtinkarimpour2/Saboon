import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (login(username, password)) {
      navigate('/admin/dashboard')
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است')
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-gold mb-2">Biaresh</h1>
          <h2 className="text-xl font-medium text-dark/70">پنل مدیریت</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-dark">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-dark">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              placeholder="admin123"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-white py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
          >
            ورود
          </button>
        </form>

        <div className="mt-6 p-4 bg-ivory rounded-lg text-xs text-dark/50">
          <p className="font-medium mb-1">اطلاعات ورود پیش‌فرض:</p>
          <p>نام کاربری: admin</p>
          <p>رمز عبور: admin123</p>
        </div>
      </motion.div>
    </div>
  )
}

