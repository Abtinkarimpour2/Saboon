import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-ivory mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="text-2xl font-serif font-bold text-gold">
                Biaresh
              </div>
              <div className="text-sm">Bath & Body</div>
            </div>
            <p className="text-ivory/70 text-sm mb-4 max-w-md">
              ما محصولات دست‌ساز لوکس با مواد طبیعی و تکنیک‌های سنتی می‌سازیم.
              هر محصول برای ارتقای حس‌های شما طراحی شده است.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://instagram.com/biaresh_shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/70 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-ivory/70 text-xs mt-2">@biaresh_shop</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-ivory/70 hover:text-gold transition-colors text-sm"
                >
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-ivory/70 hover:text-gold transition-colors text-sm"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-ivory/70 hover:text-gold transition-colors text-sm"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg mb-4">اطلاعات تماس</h3>
            <ul className="space-y-2 text-ivory/70 text-sm">
              <li>پشتیبانی 24/7</li>
              <li>در تمام ساعات شبانه‌روز</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/20 mt-8 pt-8 text-center text-ivory/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Biaresh Bath & Body. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}

