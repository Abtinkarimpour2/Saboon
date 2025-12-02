import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { getProductById, products } = useProducts()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState({})

  if (!product) {
    return (
      <div className="pt-24 pb-20 text-center">
        <p className="text-xl mb-4">محصول یافت نشد</p>
        <Link to="/shop" className="text-gold hover:underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const handleAddToCart = () => {
    addToCart(product, selectedVariant)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-ivory">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-dark/70">
          <Link to="/" className="hover:text-gold">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-gold">
            فروشگاه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 md:h-[600px] object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-gold'
                        : 'border-transparent hover:border-dark/20'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              {product.name}
            </h1>
            <p className="text-3xl text-gold mb-6">{formatPrice(product.price)}</p>

            <div className="mb-6">
              <h3 className="font-serif text-xl mb-2">توضیحات</h3>
              <p className="text-dark/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Scent Profile */}
            <div className="mb-6 p-4 bg-white rounded-lg">
              <h3 className="font-serif text-lg mb-2">پروفایل عطر</h3>
              <p className="text-dark/70">{product.scentProfile}</p>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="font-serif text-xl mb-3">فواید</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-dark/70">
                    <span className="text-gold ml-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="mb-6 p-4 bg-white rounded-lg">
              <h3 className="font-serif text-lg mb-2">مواد تشکیل‌دهنده</h3>
              <p className="text-dark/70 text-sm">{product.ingredients}</p>
            </div>

            {/* Perfect For */}
            <div className="mb-6">
              <h3 className="font-serif text-lg mb-2">مناسب برای:</h3>
              <p className="text-dark/70">{product.perfectFor}</p>
            </div>

            {/* Add to Cart */}
            <div className="sticky bottom-0 bg-ivory pt-6 border-t border-dark/10">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gold text-white py-4 rounded-lg font-medium hover:bg-gold/90 transition-colors text-lg"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif mb-8">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gold font-medium">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

