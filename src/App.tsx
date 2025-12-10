import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SkeletonCard } from './components/Skeleton'

// Lazy load pages for code splitting with error handling
const lazyLoad = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  return lazy(() => 
    importFn().catch((error) => {
      console.error('Failed to load module:', error)
      // Return a fallback component
      return {
        default: () => (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Failed to load page</h2>
            <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        )
      }
    })
  )
}

const Home = lazyLoad(() => import('./pages/Home'))
const Detect = lazyLoad(() => import('./pages/Detect'))
const Manual = lazyLoad(() => import('./pages/Manual'))
const Medicines = lazyLoad(() => import('./pages/Medicines'))
const Dashboard = lazyLoad(() => import('./pages/Dashboard'))
const Search = lazyLoad(() => import('./pages/Search'))
const Market = lazyLoad(() => import('./pages/Market'))

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/detect"
            element={
              <PageWrapper>
                <Detect />
              </PageWrapper>
            }
          />
          <Route
            path="/manual"
            element={
              <PageWrapper>
                <Manual />
              </PageWrapper>
            }
          />
          <Route
            path="/medicines"
            element={
              <PageWrapper>
                <Medicines />
              </PageWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />
          <Route
            path="/search"
            element={
              <PageWrapper>
                <Search />
              </PageWrapper>
            }
          />
          <Route
            path="/market"
            element={
              <PageWrapper>
                <Market />
              </PageWrapper>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen relative bg-white">
          <Navbar />
          <main className="flex-1 pb-16 md:pb-[400px]">
            <AppRoutes />
          </main>
          <Footer className="fixed bottom-0 left-0 right-0 z-40 hidden md:block bg-white border-t shadow-elegant" style={{ position: 'fixed', transform: 'translateZ(0)' }} />
          <BottomNav />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

