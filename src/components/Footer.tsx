import { Link } from 'react-router-dom'

export default function Footer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <footer className={`border-t bg-background backdrop-blur-sm shadow-elegant ${className || ''}`} style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-tight text-slate-900">🌊 FinX Aqua</h3>
            <p className="text-base text-slate-500">
              World's 1st Real-Time Fish Disease Detection Software powered by AI.
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 tracking-tight text-slate-900">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/detect" className="text-slate-500 hover:text-primary-600">
                  Detect Disease
                </Link>
              </li>
              <li>
                <Link to="/manual" className="text-slate-500 hover:text-primary-600">
                  Disease Manual
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-slate-500 hover:text-primary-600">
                  Medicines
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 tracking-tight text-slate-900">About</h4>
            <p className="text-base text-slate-500">
              FinX Aqua helps aquaculture professionals and hobbyists detect and treat fish
              diseases with AI-powered technology.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} FinX Aqua. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

