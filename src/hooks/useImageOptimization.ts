import { useState, useEffect } from 'react'

export function useImageOptimization(src: string, maxWidth: number = 1920) {
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) {
      setLoading(false)
      return
    }

    const img = new Image()
    img.onload = () => {
      // Create canvas to resize if needed
      if (img.width > maxWidth) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          setOptimizedSrc(src)
          setLoading(false)
          return
        }

        const ratio = maxWidth / img.width
        canvas.width = maxWidth
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const optimized = canvas.toDataURL('image/jpeg', 0.85)
        setOptimizedSrc(optimized)
      } else {
        setOptimizedSrc(src)
      }
      setLoading(false)
    }

    img.onerror = () => {
      setError(true)
      setLoading(false)
    }

    img.src = src
  }, [src, maxWidth])

  return { optimizedSrc, loading, error }
}

