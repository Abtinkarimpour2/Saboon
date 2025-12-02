import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../context/ProductsContext'
import { categories } from '../../data/products'
import ImageUploader from '../../components/ImageUploader'

export default function ProductForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { addProduct, updateProduct, getProductById } = useProducts()

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    price: '',
    category: 'soaps',
    image: '',
    images: [],
    description: '',
    scentProfile: '',
    benefits: '',
    ingredients: '',
    perfectFor: '',
  })

  const [errors, setErrors] = useState({})
  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    if (isEdit) {
      const product = getProductById(id)
      if (product) {
        const images = Array.isArray(product.images)
          ? product.images
          : product.image
          ? [product.image]
          : []
        setFormData({
          name: product.name || '',
          nameEn: product.nameEn || '',
          price: product.price || '',
          category: product.category || 'soaps',
          image: product.image || '',
          images: images,
          description: product.description || '',
          scentProfile: product.scentProfile || '',
          benefits: Array.isArray(product.benefits) ? product.benefits.join(', ') : product.benefits || '',
          ingredients: product.ingredients || '',
          perfectFor: product.perfectFor || '',
        })
        setProductImages(images)
      }
    }
  }, [id, isEdit, getProductById])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // پاک کردن خطا برای این فیلد
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'نام محصول الزامی است'
    if (!formData.nameEn.trim()) newErrors.nameEn = 'نام انگلیسی الزامی است'
    if (!formData.price || formData.price <= 0)
      newErrors.price = 'قیمت باید بیشتر از صفر باشد'
    if (productImages.length === 0) newErrors.image = 'حداقل یک تصویر الزامی است'
    if (!formData.description.trim())
      newErrors.description = 'توضیحات الزامی است'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const productData = {
      ...formData,
      price: parseInt(formData.price),
      image: productImages[0] || '',
      images: productImages,
      benefits: formData.benefits
        ? formData.benefits.split(',').map((b) => b.trim()).filter(Boolean)
        : [],
    }

    if (isEdit) {
      updateProduct(parseInt(id), productData)
    } else {
      addProduct(productData)
    }

    navigate('/admin/products')
  }

  const handleImagesChange = (newImages) => {
    setProductImages(Array.isArray(newImages) ? newImages : [newImages])
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold">
                {isEdit ? 'ویرایش محصول' : 'افزودن محصول جدید'}
              </h1>
              <p className="text-sm text-dark/70">Biaresh Bath & Body</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/products')}
                className="text-dark/70 hover:text-gold transition-colors text-sm"
              >
                بازگشت
              </button>
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
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                نام محصول (فارسی) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors ${
                  errors.name ? 'border-red-500' : 'border-dark/20'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Name English */}
            <div>
              <label className="block text-sm font-medium mb-2">
                نام محصول (انگلیسی) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors ${
                  errors.nameEn ? 'border-red-500' : 'border-dark/20'
                }`}
              />
              {errors.nameEn && (
                <p className="text-red-500 text-xs mt-1">{errors.nameEn}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                قیمت (تومان) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors ${
                  errors.price ? 'border-red-500' : 'border-dark/20'
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                دسته‌بندی <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Image Uploader */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                تصاویر محصول <span className="text-red-500">*</span>
              </label>
              <ImageUploader
                images={productImages}
                onChange={handleImagesChange}
                multiple={true}
                maxImages={5}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
              <p className="text-xs text-dark/50 mt-2">
                💡 می‌توانید تصاویر را از کامپیوتر خود آپلود کنید یا از URL استفاده کنید
              </p>
            </div>

            {/* Alternative: URL Input (for backward compatibility) */}
            <div className="md:col-span-2">
              <details className="border border-dark/10 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-dark/70 hover:text-dark">
                  یا از URL تصویر استفاده کنید (اختیاری)
                </summary>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      آدرس تصویر اصلی
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={(e) => {
                        handleChange(e)
                        if (e.target.value && !productImages.includes(e.target.value)) {
                          setProductImages([e.target.value, ...productImages])
                        }
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
              </details>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                توضیحات <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-gold transition-colors resize-none ${
                  errors.description ? 'border-red-500' : 'border-dark/20'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            {/* Scent Profile */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                پروفایل عطر
              </label>
              <input
                type="text"
                name="scentProfile"
                value={formData.scentProfile}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Benefits */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                فواید (جدا شده با کاما)
              </label>
              <input
                type="text"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="فواید 1, فواید 2, فواید 3"
                className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Ingredients */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                مواد تشکیل‌دهنده
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            {/* Perfect For */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                مناسب برای
              </label>
              <input
                type="text"
                name="perfectFor"
                value={formData.perfectFor}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-dark/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="bg-gold text-white px-8 py-3 rounded-lg hover:bg-gold/90 transition-colors font-medium"
            >
              {isEdit ? 'ذخیره تغییرات' : 'افزودن محصول'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="bg-dark/10 text-dark px-8 py-3 rounded-lg hover:bg-dark/20 transition-colors font-medium"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

