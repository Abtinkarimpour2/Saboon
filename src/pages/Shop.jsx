import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories } from '../data/products'
import { useProducts } from '../context/ProductsContext'

export default function Shop() {
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch =
      product.name.includes(searchQuery) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
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
          <h2 className="text-3xl md:text-5xl font-serif mb-4">فروشگاه</h2>
          <p className="text-dark/70 max-w-2xl mx-auto">
            مجموعه کامل محصولات لوکس و دست‌ساز ما
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gold text-white'
                    : 'bg-white text-dark/70 hover:bg-blush'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark/50 text-lg">محصولی یافت نشد</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        مشاهده جزئیات
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                    <p className="text-dark/70 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-gold text-lg font-medium">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

