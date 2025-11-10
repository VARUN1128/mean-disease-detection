import { Link } from 'react-router-dom'

export default function Footer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <footer className={`border-t bg-background backdrop-blur-sm shadow-elegant ${className || ''}`} style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">🌊 AquaVeritas</h3>
            <p className="text-base sm:text-lg text-muted-foreground">
              World's 1st Real-Time Fish Disease Detection Software powered by AI.
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-base sm:text-lg">
              <li>
                <Link to="/detect" className="text-muted-foreground hover:text-primary-600">
                  Detect Disease
                </Link>
              </li>
              <li>
                <Link to="/manual" className="text-muted-foreground hover:text-primary-600">
                  Disease Manual
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-muted-foreground hover:text-primary-600">
                  Medicines
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">About</h4>
            <p className="text-base sm:text-lg text-muted-foreground">
              AquaVeritas helps aquaculture professionals and hobbyists detect and treat fish
              diseases with AI-powered technology.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-base sm:text-lg text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AquaVeritas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

