import { createContext, useContext, useState, useEffect } from 'react'

const OrdersContext = createContext()

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider')
  }
  return context
}

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // بارگذاری سفارشات از localStorage
    const savedOrders = localStorage.getItem('biaresh-orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const saveOrders = (newOrders) => {
    setOrders(newOrders)
    localStorage.setItem('biaresh-orders', JSON.stringify(newOrders))
  }

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending', // pending, processing, shipped, delivered, cancelled
      createdAt: new Date().toISOString(),
    }
    const updatedOrders = [newOrder, ...orders]
    saveOrders(updatedOrders)
    return newOrder
  }

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    saveOrders(updatedOrders)
  }

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId)
    saveOrders(updatedOrders)
  }

  const getOrderById = (id) => {
    return orders.find((order) => order.id === parseInt(id))
  }

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status)
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

