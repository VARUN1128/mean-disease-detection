import { useRef, useEffect, useState } from 'react'
import { X, Camera, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button'

interface CameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (file: File) => void
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, facingMode])

  const startCamera = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode === 'user' ? 'user' : { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Please check permissions and try again.')
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob, then to File
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now()
        })
        onCapture(file)
        stopCamera()
        onClose()
      }
    }, 'image/jpeg', 0.95)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Camera</h2>
            <button
              onClick={() => {
                stopCamera()
                onClose()
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close camera"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Video Preview */}
          <div className="relative bg-black aspect-video flex items-center justify-center">
            {isLoading && (
              <div className="text-white">Loading camera...</div>
            )}
            {error && (
              <div className="text-red-400 p-4 text-center">
                <p>{error}</p>
                <Button
                  onClick={startCamera}
                  className="mt-4"
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-contain ${isLoading || error ? 'hidden' : ''}`}
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Controls */}
          <div className="p-4 flex items-center justify-center gap-4 bg-gray-50">
            <Button
              onClick={switchCamera}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading || !!error}
            >
              <RotateCcw className="h-4 w-4" />
              Switch Camera
            </Button>
            <Button
              onClick={capturePhoto}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || !!error}
            >
              <Camera className="h-5 w-5" />
              Capture Photo
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

