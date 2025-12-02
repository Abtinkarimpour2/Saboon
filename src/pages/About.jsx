import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function About() {
  const values = [
    {
      title: 'طبیعی و خالص',
      description: 'ما فقط از بهترین مواد طبیعی استفاده می‌کنیم',
      icon: '🌿',
    },
    {
      title: 'دست‌ساز با عشق',
      description: 'هر محصول با دست و با دقت ساخته می‌شود',
      icon: '✋',
    },
    {
      title: 'کیفیت برتر',
      description: 'تعهد به ارائه بهترین کیفیت در هر محصول',
      icon: '✨',
    },
    {
      title: 'پایداری',
      description: 'احترام به محیط زیست و استفاده از مواد پایدار',
      icon: '🌍',
    },
  ]

  return (
    <div className="pt-24 pb-20 min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600857062242-afdab41e7c0a?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-dark/50"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-serif mb-4">درباره ما</h1>
        </motion.div>
      </section>

      <div className="container mx-auto px-4">
        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">
            داستان ما
          </h2>
          <div className="prose prose-lg max-w-none text-dark/70 leading-relaxed space-y-4">
            <p>
              ما در Biaresh Bath & Body، محصولات دست‌ساز با کیفیت بالا می‌سازیم
              که از مواد طبیعی و تکنیک‌های سنتی استفاده می‌کنند. هر محصول برای
              ارتقای حس‌های شما و ایجاد تجربه‌ای لوکس طراحی شده است.
            </p>
            <p>
              تعهد ما به کیفیت و استفاده از بهترین مواد طبیعی، ما را به یکی از
              برندهای محبوب در زمینه محصولات حمام و بدن تبدیل کرده است. ما
              معتقدیم که مراقبت از خود باید یک تجربه حسی و آرامش‌بخش باشد.
            </p>
            <p>
              هر محصول ما با دقت و عشق ساخته می‌شود، از صابون‌های دست‌ساز گرفته
              تا روغن‌های ماساژ طبیعی. ما از هیچ چربی حیوانی استفاده نمی‌کنیم
              و تمام محصولات ما تست شده و مناسب برای انواع پوست هستند.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">ارزش‌های ما</h2>
            <p className="text-dark/70 max-w-2xl mx-auto">
              اصولی که ما را راهنمایی می‌کنند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-dark/70 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              فرآیند ساخت
            </h2>
            <p className="text-dark/70 max-w-2xl mx-auto">
              چگونه محصولات ما ساخته می‌شوند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'انتخاب مواد',
                description: 'انتخاب بهترین مواد طبیعی و ارگانیک',
              },
              {
                step: '2',
                title: 'ساخت دستی',
                description: 'ساخت هر محصول با دست و با دقت',
              },
              {
                step: '3',
                title: 'بسته‌بندی',
                description: 'بسته‌بندی زیبا و لوکس برای شما',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="font-serif text-xl mb-2">{process.title}</h3>
                <p className="text-dark/70 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white p-12 rounded-lg"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            آماده تجربه لوکس هستید؟
          </h2>
          <p className="text-dark/70 mb-8 max-w-2xl mx-auto">
            مجموعه کامل محصولات ما را مشاهده کنید
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </motion.section>
      </div>
    </div>
  )
}

