import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProductsList from './pages/admin/ProductsList'
import ProductForm from './pages/admin/ProductForm'
import OrdersList from './pages/admin/OrdersList'
import ContactMessagesList from './pages/admin/ContactMessagesList'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import CartProvider from './context/CartContext'
import AuthProvider from './context/AuthContext'
import ProductsProvider from './context/ProductsContext'
import OrdersProvider from './context/OrdersContext'
import ContactMessagesProvider from './context/ContactMessagesContext'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <OrdersProvider>
          <ContactMessagesProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <ProductsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/:id"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <OrdersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contact-messages"
                element={
                  <ProtectedRoute>
                    <ContactMessagesList />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/shop"
                element={
                  <PublicLayout>
                    <Shop />
                  </PublicLayout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <PublicLayout>
                    <Product />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PublicLayout>
                    <Checkout />
                  </PublicLayout>
                }
              />
              <Route
                path="/order-success"
                element={
                  <PublicLayout>
                    <OrderSuccess />
                  </PublicLayout>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </ContactMessagesProvider>
      </OrdersProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
