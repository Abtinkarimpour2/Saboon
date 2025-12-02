import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCartLoaded, setIsCartLoaded] = useState(false)

  useEffect(() => {
    // Load cart from localStorage on mount
    try {
      const savedCart = localStorage.getItem('biaresh-cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsCartLoaded(true)
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes (only after initial load)
    if (isCartLoaded) {
      try {
        // Always save cart, even if empty (to preserve state on refresh)
        localStorage.setItem('biaresh-cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cart, isCartLoaded])

  const addToCart = (product, variant = {}, openCart = false) => {
    const cartItem = {
      id: `${product.id}-${JSON.stringify(variant)}`,
      product,
      variant,
      quantity: 1,
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === cartItem.id
      )
      const newCart = existingItem
        ? prevCart.map((item) =>
            item.id === cartItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, cartItem]
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('biaresh-cart', JSON.stringify(newCart))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
      
      return newCart
    })
    
    // Only open cart if explicitly requested
    if (openCart) {
      setIsCartOpen(true)
    }
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
    try {
      localStorage.removeItem('biaresh-cart')
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        isCartOpen,
        setIsCartOpen,
        clearCart,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

