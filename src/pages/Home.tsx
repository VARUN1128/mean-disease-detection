import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useDetectionStore } from '../store/detectionStore'
import CameraModal from '../components/CameraModal'
import {
  Pill,
  Stethoscope,
  FlaskConical,
  Shield,
  Leaf,
  Droplets,
  CheckCircle2,
  ArrowRight,
  Fish,
  Shrimp,
  Search,
  Upload,
  Camera,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { format } from 'date-fns'

const medicineCategories = [
  { icon: Pill, label: 'Medicine', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: Stethoscope, label: 'Drugs', color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { icon: FlaskConical, label: 'Probiotics', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { icon: Droplets, label: 'Disinfectant', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  { icon: Shield, label: 'Immunostimulants', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { icon: Leaf, label: 'Feed Additives', color: 'text-green-600', bgColor: 'bg-green-50' },
]


const quickActions = [
  { image: '/images/quick-actions/camera.png', label: 'Capture', action: 'capture', color: 'bg-blue-600 hover:bg-blue-700' },
  { image: '/images/quick-actions/upload.png', label: 'Upload', action: 'upload', color: 'bg-teal-600 hover:bg-teal-700' },
  { image: '/images/quick-actions/manual.png', label: 'Manual', route: '/manual', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { image: '/images/quick-actions/medicine.png', label: 'Medicines', route: '/medicines', color: 'bg-cyan-600 hover:bg-cyan-700' },
]

// Check if device is mobile - more reliable detection
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check user agent
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
  
  // Check screen width (mobile is typically < 768px)
  const isMobileWidth = window.innerWidth < 768
  
  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Consider it mobile if it matches user agent OR (has touch AND small width)
  return isMobileUA || (hasTouch && isMobileWidth)
}

export default function Home() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const captureInputRef = useRef<HTMLInputElement>(null)
  const isNavigatingRef = useRef(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const { setPendingFile, detections } = useDetectionStore()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const inputElement = e.target
    
    if (file && file.type.startsWith('image/')) {
      // Convert file to base64 and store it
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = event.target?.result as string
          if (!data) {
            console.error('No data from file reader')
            if (inputElement) {
              inputElement.value = ''
            }
            return
          }
          
          setPendingFile({
            data,
            name: file.name || 'captured-image.jpg',
            type: file.type || 'image/jpeg',
          })
          
          // Reset input value after file is processed
          if (inputElement) {
            inputElement.value = ''
          }
          
          // Prevent multiple navigations
          if (!isNavigatingRef.current) {
            isNavigatingRef.current = true
            console.log('File processed, navigating to /detect')
            // Small delay to ensure state is set before navigation
            setTimeout(() => {
              try {
                navigate('/detect', { replace: false })
                console.log('Navigation to /detect completed')
              } catch (error) {
                console.error('Navigation error:', error)
                isNavigatingRef.current = false
              }
              // Reset flag after navigation
              setTimeout(() => {
                isNavigatingRef.current = false
              }, 2000)
            }, 200)
          } else {
            console.log('Navigation already in progress, skipping')
          }
        } catch (error) {
          console.error('Error processing file:', error)
          if (inputElement) {
            inputElement.value = ''
          }
        }
      }
      reader.onerror = (error) => {
        console.error('FileReader error:', error)
        if (inputElement) {
          inputElement.value = ''
        }
      }
      reader.readAsDataURL(file)
    } else {
      // Reset input if no valid file
      if (inputElement) {
        inputElement.value = ''
      }
    }
  }

  const handleUploadClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    console.log('📤 Upload button clicked, triggering upload input')
    if (fileInputRef.current) {
      fileInputRef.current.click()
      console.log('📤 Upload input clicked')
    } else {
      console.error('❌ Upload input ref is null')
    }
  }

  const handleCaptureClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior and stop propagation
    e?.preventDefault()
    e?.stopPropagation()
    
    // On mobile, use file input with capture attribute
    // On desktop, open camera modal
    const isMobile = isMobileDevice()
    console.log('🔵 Capture button clicked!', {
      isMobile,
      userAgent: navigator.userAgent,
      captureInputExists: !!captureInputRef.current,
      uploadInputExists: !!fileInputRef.current
    })
    
    if (isMobile) {
      if (captureInputRef.current) {
        console.log('📷 Triggering capture input (mobile)')
        // Reset and trigger capture input
        captureInputRef.current.value = ''
        // Small delay to ensure reset is processed
        setTimeout(() => {
          if (captureInputRef.current) {
            console.log('📷 Clicking capture input element')
            captureInputRef.current.click()
          } else {
            console.error('❌ Capture input ref became null')
          }
        }, 100)
      } else {
        console.error('❌ Capture input ref is null')
      }
    } else {
      // Desktop: Open camera modal
      console.log('🖥️ Opening camera modal (desktop)')
      setIsCameraOpen(true)
    }
  }

  const handleCameraCapture = (file: File) => {
    // Process the captured file the same way as file selection
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = event.target?.result as string
        if (!data) {
          console.error('No data from file reader')
          return
        }
        
        setPendingFile({
          data,
          name: file.name || 'camera-capture.jpg',
          type: file.type || 'image/jpeg',
        })
        
        // Navigate to detect page
        if (!isNavigatingRef.current) {
          isNavigatingRef.current = true
          setTimeout(() => {
            navigate('/detect', { replace: false })
            setTimeout(() => {
              isNavigatingRef.current = false
            }, 2000)
          }, 200)
        }
      } catch (error) {
        console.error('Error processing camera capture:', error)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleQuickAction = (action: string) => {
    if (action === 'upload') {
      handleUploadClick()
    } else if (action === 'capture') {
      handleCaptureClick()
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, HH:mm')
    } catch {
      return dateString
    }
  }

  const recentDetections = detections.slice(0, 3)

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-slate-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 pt-3 xs:pt-4 sm:pt-5 md:pt-6 lg:pt-8 pb-3 xs:pb-4 sm:pb-5 md:pb-6">
        {/* Header Section - Mobile Optimized */}
        <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          {/* Mobile: Stacked, Desktop: Same Line */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 xs:gap-3 sm:gap-4">
            {/* Search Bar */}
            <Link to="/search" className="cursor-pointer flex-shrink-0 w-full sm:w-auto self-center">
              <div className="relative w-full sm:w-auto">
                <div className="bg-[#F8FAFC] rounded-md border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 hover:border-blue-300 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none z-10" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="Search..."
                    readOnly
                    className="w-full sm:w-40 md:w-48 lg:w-52 pl-8 pr-2.5 py-1.5 xs:py-2 rounded-md bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-medium cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = '/search'
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6"></div>

        {/* Primary Detection Card - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto"
        >
          <Card className="border border-slate-200 shadow-md hover:shadow-lg active:shadow-md bg-[#F8FAFC] transition-all duration-200">
            <CardHeader className="pb-2.5 xs:pb-3 sm:pb-4 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pt-3 xs:pt-4 sm:pt-5 md:pt-6">
              <CardTitle className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-1">
                Detect Disease
              </CardTitle>
              <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-slate-600">
                Upload or capture an image for AI analysis
              </p>
            </CardHeader>
            
            <CardContent className="pt-0 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-3 xs:pb-4 sm:pb-5 md:pb-6">
              {/* Step Flow - Mobile Optimized */}
              <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6 gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
                {[
                  { icon: Camera, label: 'Capture', color: 'bg-blue-100 text-blue-700' },
                  { icon: CheckCircle2, label: 'Analyze', color: 'bg-teal-100 text-teal-700' },
                  { icon: Pill, label: 'Treat', color: 'bg-emerald-100 text-emerald-700' },
                ].map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={index} className="flex items-center flex-1 min-w-0">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <div className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md ${step.color} flex items-center justify-center mb-1.5 shadow-sm flex-shrink-0`}>
                          <Icon className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" strokeWidth={2} />
                        </div>
                        <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-center font-medium text-slate-700 leading-tight truncate w-full">
                          {step.label}
                        </p>
                      </div>
                      {index < 2 && (
                        <ArrowRight className="h-3 w-3 text-slate-300 mx-0.5 xs:mx-1 flex-shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* Action Buttons - Mobile */}
              <div className="flex md:hidden flex-col gap-2.5">
                <Button
                  size="lg"
                  onClick={handleUploadClick}
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-0 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 text-sm font-medium rounded-md touch-manipulation relative z-10"
                  style={{ pointerEvents: 'auto', zIndex: 10 }}
                >
                  <Upload className="h-4 w-4 mr-2" strokeWidth={2} />
                  <span>Upload Image</span>
                </Button>
                <button
                  onClick={handleCaptureClick}
                  type="button"
                  className="w-full border border-slate-300 text-slate-700 bg-[#F8FAFC] hover:bg-white active:bg-slate-50 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 text-sm font-medium rounded-md cursor-pointer touch-manipulation relative z-10 inline-flex items-center justify-center"
                  style={{ pointerEvents: 'auto', zIndex: 10 }}
                  aria-label="Capture image with camera"
                >
                  <Camera className="h-4 w-4 mr-2" strokeWidth={2} />
                  <span>Capture</span>
                </button>
                {/* Upload input - opens gallery (no capture attribute) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log('📤 Upload input changed - source: upload-input')
                    handleFileSelect(e)
                  }}
                  className="hidden"
                  aria-label="Upload image from gallery"
                  id="upload-input"
                  data-input-type="upload"
                />
                {/* Capture input - opens camera (with capture attribute) */}
                <input
                  ref={captureInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    console.log('📷 Capture input changed - source: capture-input')
                    handleFileSelect(e)
                  }}
                  className="hidden"
                  aria-label="Capture image with camera"
                  id="capture-input"
                  data-input-type="capture"
                />
              </div>
              
              {/* Action Buttons - Desktop */}
              <div className="hidden md:flex gap-2.5 md:gap-3 lg:gap-4">
                <Button
                  size="lg"
                  onClick={handleUploadClick}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-0 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 md:h-12 lg:h-14 text-sm md:text-base font-medium rounded-md md:rounded-lg"
                >
                  <Upload className="h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" strokeWidth={2} />
                  <span>Upload Image</span>
                </Button>
                <Button
                  size="lg"
                  onClick={handleCaptureClick}
                  variant="outline"
                  className="flex-1 border border-slate-300 text-slate-700 bg-[#F8FAFC] hover:bg-white active:bg-slate-50 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 md:h-12 lg:h-14 text-sm md:text-base font-medium rounded-md md:rounded-lg cursor-pointer"
                >
                  <Camera className="h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2" strokeWidth={2} />
                  <span>Capture</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6"></div>

        {/* Recent Detections Section - Mobile Optimized */}
        {recentDetections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-8"
          >
            <div className="flex items-center justify-between mb-2.5 xs:mb-3 sm:mb-4">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-slate-900">Recent Detections</h2>
              <Link to="/dashboard" className="text-[10px] xs:text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-700 active:text-blue-800 font-medium cursor-pointer whitespace-nowrap">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
              {recentDetections.map((detection, index) => (
                <Link key={detection.id} to="/dashboard" className="cursor-pointer">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + index * 0.03 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-[#F8FAFC] transition-all duration-200 cursor-pointer">
                      <CardContent className="p-2.5 xs:p-3 sm:p-3.5 md:p-4 lg:p-5">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs xs:text-sm md:text-base font-semibold text-slate-900 truncate mb-1">
                              {detection.diseaseName}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-slate-500">
                              <Clock className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
                              <span className="truncate">{formatDate(detection.timestamp)}</span>
                            </div>
                          </div>
                          <div className={`px-1.5 xs:px-2 sm:px-2.5 md:px-3 py-0.5 xs:py-1 rounded-full text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
                            detection.confidence >= 80
                              ? 'bg-green-100 text-green-700'
                              : detection.confidence >= 60
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }`}>
                            {detection.confidence}%
                          </div>
                        </div>
                        <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {detection.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Divider */}
        {recentDetections.length > 0 && <div className="h-px bg-slate-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6"></div>}

        {/* Quick Actions Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-4 xs:mb-5 sm:mb-6 md:mb-8"
        >
          <h3 className="text-sm xs:text-base sm:text-base md:text-lg font-semibold text-slate-900 mb-2.5 xs:mb-3 sm:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-2.5 md:gap-3 lg:gap-4">
            {quickActions.map((action, index) => {
              const content = (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="cursor-pointer"
                >
                  <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-white transition-all duration-200 cursor-pointer overflow-hidden">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Image fills the entire box */}
                      <div className="w-full aspect-square relative overflow-hidden">
                        <img 
                          src={action.image} 
                          alt={action.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(`Failed to load image: ${action.image}`)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      {/* Label below the image */}
                      <div className="p-2 xs:p-2.5 sm:p-3 text-center bg-[#F8FAFC]">
                        <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium text-slate-900 leading-tight">
                          {action.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )

              if (action.route) {
                return (
                  <Link key={index} to={action.route} className="cursor-pointer">
                    {content}
                  </Link>
                )
              }

              return (
                <div key={index} onClick={() => {
                  if (action.action) {
                    handleQuickAction(action.action)
                  }
                }} className="cursor-pointer">
                  {content}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6"></div>

        {/* Quick Access Sections - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          {/* Disease Manuals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h3 className="text-sm xs:text-base sm:text-base md:text-lg font-semibold text-slate-900 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">Disease Manuals</h3>
            <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-2.5 md:gap-3 lg:gap-4">
              <Link to="/manual?tab=fish" className="cursor-pointer">
                <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-[#F8FAFC] transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-2.5 xs:p-3 sm:p-3.5 md:p-4 lg:p-5 text-center">
                    <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 flex items-center justify-center rounded-md bg-emerald-100 group-hover:bg-emerald-200 active:bg-emerald-300 transition-colors">
                      <Fish className="h-5 w-5 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-emerald-600" strokeWidth={2} />
                    </div>
                    <p className="text-xs xs:text-sm sm:text-sm md:text-base font-medium text-slate-900">Fish</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/manual?tab=shrimp" className="cursor-pointer">
                <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-[#F8FAFC] transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-2.5 xs:p-3 sm:p-3.5 md:p-4 lg:p-5 text-center">
                    <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 flex items-center justify-center rounded-md bg-cyan-100 group-hover:bg-cyan-200 active:bg-cyan-300 transition-colors">
                      <Shrimp className="h-5 w-5 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-cyan-600" strokeWidth={2} />
                    </div>
                    <p className="text-xs xs:text-sm sm:text-sm md:text-base font-medium text-slate-900">Shrimp</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>

          {/* Medicine Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-sm xs:text-base sm:text-base md:text-lg font-semibold text-slate-900 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">Medicine Categories</h3>
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
              {medicineCategories.slice(0, 6).map((category, index) => {
                const Icon = category.icon
                return (
                  <Link key={index} to="/medicines" className="cursor-pointer">
                    <motion.div
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-[#F8FAFC] transition-all duration-200 cursor-pointer group">
                        <CardContent className="p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex flex-col items-center text-center">
                          <div className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md ${category.bgColor} group-hover:opacity-80 active:opacity-70 flex items-center justify-center mb-1 xs:mb-1.5 sm:mb-2 shadow-sm transition-all duration-200`}>
                            <Icon className={`h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 ${category.color}`} strokeWidth={2} />
                          </div>
                          <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-slate-800 leading-tight line-clamp-2">
                            {category.label}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Camera Modal for Desktop */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  )
}
