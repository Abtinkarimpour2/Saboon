import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../context/ProductsContext'

export default function Home() {
  const { products } = useProducts()
  const featuredProducts = products.slice(0, 4)

  const features = [
    {
      icon: '🌿',
      title: 'مواد طبیعی',
      description: 'استفاده از بهترین مواد طبیعی و ارگانیک',
    },
    {
      icon: '✋',
      title: 'دست‌ساز',
      description: 'هر محصول با دست و با دقت ساخته می‌شود',
    },
    {
      icon: '💧',
      title: 'گلیسیرین بالا',
      description: 'محتوای گلیسیرین بالا برای مرطوب‌کنندگی بیشتر',
    },
    {
      icon: '🐰',
      title: 'بدون چربی حیوانی',
      description: 'کاملاً گیاهی و مناسب برای همه',
    },
    {
      icon: '✅',
      title: 'تست شده',
      description: 'تست شده توسط متخصصین پوست',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-dark/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-2 text-gold drop-shadow-lg">
              Biaresh
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/95 tracking-wide">
              Bath & Body
            </p>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            لوکس دست‌ساز برای بدن و روح شما
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            محصولات طبیعی و دست‌ساز برای تجربه‌ای لوکس و آرامش‌بخش
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/shop"
              className="bg-gold text-white px-8 py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              خرید کنید
            </Link>
            <Link
              to="/about"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              مجموعه ما
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">
                Biaresh Bath & Body
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif mb-4">
              چرا ما را انتخاب کنید؟
            </h3>
            <p className="text-dark/70 max-w-2xl mx-auto">
              ما تعهد داریم که بهترین محصولات طبیعی و دست‌ساز را برای شما
              فراهم کنیم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-ivory rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
                <p className="text-dark/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">
                Biaresh Bath & Body
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif mb-4">
              محصولات برجسته
            </h3>
            <p className="text-dark/70 max-w-2xl mx-auto">
              مجموعه‌ای از بهترین محصولات ما
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                    <p className="text-gold text-lg font-medium">
                      {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              ما را در اینستاگرام دنبال کنید
            </h2>
            <a
              href="https://instagram.com/biaresh_shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline text-xl"
            >
              @biaresh_shop
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-ivory rounded-lg overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80&sig=${i}`}
                  alt="Instagram post"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

