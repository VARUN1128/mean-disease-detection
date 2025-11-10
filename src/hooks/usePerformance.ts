import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    // Log performance metrics in development
    // Note: This is a placeholder for performance monitoring
    // In production, you would use a proper analytics service
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      window.addEventListener('load', () => {
        if ('performance' in window) {
          const perfData = window.performance.timing
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
          const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart
          
          console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime}ms`,
            domContentLoaded: `${domContentLoaded}ms`,
          })
        }
      })
    }
  }, [])
}

export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, callback, options])
}

