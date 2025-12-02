import { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../data/products'

const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider')
  }
  return context
}

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // بارگذاری محصولات از localStorage یا استفاده از داده‌های اولیه
    const savedProducts = localStorage.getItem('biaresh-products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(initialProducts)
      localStorage.setItem('biaresh-products', JSON.stringify(initialProducts))
    }
  }, [])

  const saveProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('biaresh-products', JSON.stringify(newProducts))
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // ID ساده برای مثال
      price: parseInt(product.price),
    }
    const updatedProducts = [...products, newProduct]
    saveProducts(updatedProducts)
    return newProduct
  }

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((p) =>
      p.id === id
        ? {
            ...updatedProduct,
            id,
            price: parseInt(updatedProduct.price),
          }
        : p
    )
    saveProducts(updatedProducts)
  }

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id)
    saveProducts(updatedProducts)
  }

  const getProductById = (id) => {
    return products.find((p) => p.id === parseInt(id))
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

