import { createContext, useContext, useState, useEffect } from 'react'

const ContactMessagesContext = createContext()

export const useContactMessages = () => {
  const context = useContext(ContactMessagesContext)
  if (!context) {
    throw new Error('useContactMessages must be used within ContactMessagesProvider')
  }
  return context
}

export default function ContactMessagesProvider({ children }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // بارگذاری پیام‌ها از localStorage
    const savedMessages = localStorage.getItem('biaresh-contact-messages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  const saveMessages = (newMessages) => {
    setMessages(newMessages)
    localStorage.setItem('biaresh-contact-messages', JSON.stringify(newMessages))
  }

  const addMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      read: false,
      createdAt: new Date().toISOString(),
    }
    const updatedMessages = [newMessage, ...messages]
    saveMessages(updatedMessages)
    return newMessage
  }

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, read: true } : message
    )
    saveMessages(updatedMessages)
  }

  const markAsUnread = (messageId) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, read: false } : message
    )
    saveMessages(updatedMessages)
  }

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter((message) => message.id !== messageId)
    saveMessages(updatedMessages)
  }

  const getMessageById = (id) => {
    return messages.find((message) => message.id === parseInt(id))
  }

  const getUnreadCount = () => {
    return messages.filter((message) => !message.read).length
  }

  return (
    <ContactMessagesContext.Provider
      value={{
        messages,
        addMessage,
        markAsRead,
        markAsUnread,
        deleteMessage,
        getMessageById,
        getUnreadCount,
      }}
    >
      {children}
    </ContactMessagesContext.Provider>
  )
}

