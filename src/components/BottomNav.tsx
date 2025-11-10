import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Store, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/market', label: 'Market', icon: Store },
    { path: '/dashboard', label: 'You', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 border-t border-gray-700 md:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors min-w-0 ${
                isActive
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-gray-200'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-300'}`} />
              <span className={`text-[10px] sm:text-xs font-medium truncate w-full text-center ${isActive ? 'text-blue-400' : 'text-gray-300'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

