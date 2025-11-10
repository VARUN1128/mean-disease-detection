import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Brain } from 'lucide-react'
import { useState } from 'react'
import Button from './ui/Button'

export default function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/detect', label: 'Detect Disease' },
    { path: '/manual', label: 'Disease Manual' },
    { path: '/medicines', label: 'Medicines' },
    { path: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b glass shadow-elegant">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="flex h-14 xs:h-16 items-center justify-between">
          {/* Mobile: Hamburger Menu + Logo */}
          <div className="flex items-center space-x-2 xs:space-x-3 md:space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              {/* Logo with Brain */}
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg xs:text-xl sm:text-xl md:text-2xl font-bold text-foreground">
                AquaVeritas
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm lg:text-base font-medium transition-colors hover:text-primary-600 px-2 py-1 ${
                  location.pathname === link.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 xs:py-4 space-y-1 xs:space-y-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 xs:py-3 text-sm xs:text-base font-medium rounded-md transition-colors min-h-[44px] flex items-center ${
                  location.pathname === link.path
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

