import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, Brain } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { useState, useEffect } from 'react'
import Button from './ui/Button'

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/detect', label: 'Detect Disease' },
    { path: '/manual', label: 'Disease Manual' },
    { path: '/medicines', label: 'Medicines' },
    { path: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile: Hamburger Menu + Logo */}
          <div className="flex items-center space-x-3 md:space-x-2">
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
              <div className="text-xl md:text-2xl font-bold text-foreground">
                AquaVeritas
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile: Theme Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900'
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

