import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useDetectionStore } from '../store/detectionStore'
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
  Zap,
  Award,
  Clock,
  Activity,
  BookOpen,
  Package,
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

const quickFeatures = [
  { icon: Zap, label: 'Instant', value: 'AI Analysis' },
  { icon: Award, label: '95%+', value: 'Accuracy' },
  { icon: Activity, label: '100+', value: 'Diseases' },
]

const quickActions = [
  { icon: Camera, label: 'Capture', action: 'capture', color: 'bg-blue-600 hover:bg-blue-700' },
  { icon: Upload, label: 'Upload', action: 'upload', color: 'bg-teal-600 hover:bg-teal-700' },
  { icon: BookOpen, label: 'Manual', route: '/manual', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { icon: Package, label: 'Medicines', route: '/medicines', color: 'bg-cyan-600 hover:bg-cyan-700' },
]

export default function Home() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setPendingFile, detections } = useDetectionStore()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      // Convert file to base64 and store it
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target?.result as string
        setPendingFile({
          data,
          name: file.name,
          type: file.type,
        })
        // Navigate to detect page
        navigate('/detect')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleQuickAction = (action: string) => {
    if (action === 'upload' || action === 'capture') {
      handleUploadClick()
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
            {/* Feature Icons - Centered, Single Line */}
            <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto flex-shrink-0 w-full sm:w-auto">
              {quickFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-center gap-1.5 xs:gap-2 flex-shrink-0">
                    <div className="p-1.5 xs:p-2 sm:p-2.5 rounded-md bg-[#F8FAFC] border border-slate-200 shadow-sm flex-shrink-0">
                      <Icon className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 leading-tight text-xs xs:text-xs sm:text-sm md:text-base">{feature.label}</div>
                      <div className="text-[10px] xs:text-[10px] sm:text-xs md:text-sm text-slate-500 leading-tight">{feature.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Search Bar - Matches Feature Width on Mobile */}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-0 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 text-sm font-medium rounded-md touch-manipulation"
                >
                  <Upload className="h-4 w-4 mr-2" strokeWidth={2} />
                  <span>Upload Image</span>
                </Button>
                <Button
                  size="lg"
                  onClick={handleUploadClick}
                  variant="outline"
                  className="w-full border border-slate-300 text-slate-700 bg-[#F8FAFC] hover:bg-white active:bg-slate-50 shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 h-11 text-sm font-medium rounded-md cursor-pointer touch-manipulation"
                >
                  <Camera className="h-4 w-4 mr-2" strokeWidth={2} />
                  <span>Capture</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Upload or capture image"
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
                  onClick={handleUploadClick}
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
              const Icon = action.icon
              const content = (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="cursor-pointer"
                >
                  <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md active:shadow-sm bg-[#F8FAFC] transition-all duration-200 cursor-pointer">
                    <CardContent className="p-2.5 xs:p-3 sm:p-3.5 md:p-4 lg:p-5 flex flex-col items-center text-center">
                      <div className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-md ${action.color} flex items-center justify-center mb-1.5 xs:mb-2 sm:mb-2.5 shadow-sm`}>
                        <Icon className="h-5 w-5 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-medium text-slate-900 leading-tight">
                        {action.label}
                      </p>
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
    </div>
  )
}
