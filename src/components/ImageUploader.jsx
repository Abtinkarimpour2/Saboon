import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageUploader({
  images = [],
  onChange,
  multiple = false,
  maxImages = 5,
}) {
  const [previewImages, setPreviewImages] = useState(images)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    const remainingSlots = maxImages - previewImages.length
    const filesToProcess = fileArray.slice(0, remainingSlots)

    filesToProcess.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64Image = e.target.result
          const newImages = multiple
            ? [...previewImages, base64Image]
            : [base64Image]
          setPreviewImages(newImages)
          onChange(multiple ? newImages : newImages[0])
        }
        reader.readAsDataURL(file)
      } else {
        alert('لطفاً فقط فایل تصویری انتخاب کنید')
      }
    })
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeImage = (index) => {
    const newImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(newImages)
    onChange(multiple ? newImages : newImages[0] || '')
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {previewImages.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-gold bg-gold/10'
              : 'border-dark/20 hover:border-gold hover:bg-ivory'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="space-y-2">
            <svg
              className="w-12 h-12 mx-auto text-dark/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-dark/70">
              {isDragging
                ? 'رها کنید تا آپلود شود'
                : 'برای آپلود کلیک کنید یا فایل را بکشید'}
            </p>
            <p className="text-xs text-dark/50">
              فرمت‌های پشتیبانی شده: JPG, PNG, GIF, WEBP
            </p>
            {multiple && (
              <p className="text-xs text-dark/50">
                می‌توانید تا {maxImages} تصویر آپلود کنید (
                {previewImages.length}/{maxImages})
              </p>
            )}
          </div>
        </div>
      )}

      {/* Preview Images */}
      <AnimatePresence>
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-dark/10"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <svg
                    className="w-4 h-4"
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
                {index === 0 && !multiple && (
                  <div className="absolute bottom-2 right-2 bg-gold text-white text-xs px-2 py-1 rounded">
                    تصویر اصلی
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Image Order Info (for multiple images) */}
      {multiple && previewImages.length > 1 && (
        <p className="text-xs text-dark/50">
          💡 می‌توانید با drag & drop ترتیب تصاویر را تغییر دهید (به زودی)
        </p>
      )}
    </div>
  )
}

