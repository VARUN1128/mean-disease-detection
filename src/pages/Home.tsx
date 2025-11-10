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
  Sparkles,
  Zap,
  Award,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'

const medicineCategories = [
  { icon: Pill, label: 'Medicine', color: 'text-blue-600' },
  { icon: Stethoscope, label: 'Drugs', color: 'text-red-600' },
  { icon: FlaskConical, label: 'Probiotics', color: 'text-green-600' },
  { icon: Droplets, label: 'Disinfectant', color: 'text-purple-600' },
  { icon: Shield, label: 'Immunostimulants', color: 'text-orange-600' },
  { icon: Leaf, label: 'Feed Additives', color: 'text-teal-600' },
]

export default function Home() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setPendingFile } = useDetectionStore()

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

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero Section - Enhanced & Catchy */}
      <section className="container mx-auto px-4 pt-4 pb-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border-2 border-gray-300 shadow-md">
            <Sparkles className="h-4 w-4 text-gray-800" />
            <span className="text-xs font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-wide">
              AI-Powered • Instant Results
            </span>
          </div>
        </motion.div>

        {/* Main Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent font-extrabold">
              Detect Fish Diseases
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 bg-clip-text text-transparent font-bold">in Seconds, Not Days</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-normal max-w-2xl font-medium">
            World's first <span className="font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">real-time AI-powered</span> fish disease detection. Upload a photo and get instant diagnosis with treatment recommendations.
          </p>
        </motion.div>

        {/* Stats/Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="flex flex-col items-center p-4 rounded-xl bg-white border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <Zap className="h-6 w-6 text-gray-800 mb-2" />
            <span className="text-base font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-0.5">Instant</span>
            <span className="text-xs font-bold text-gray-600">Results</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <Award className="h-6 w-6 text-gray-800 mb-2" />
            <span className="text-base font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-0.5">95%+</span>
            <span className="text-xs font-bold text-gray-600">Accuracy</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white border-2 border-gray-900 shadow-lg hover:shadow-xl transition-shadow">
            <Fish className="h-6 w-6 text-gray-800 mb-2" />
            <span className="text-base font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-0.5">100+</span>
            <span className="text-xs font-bold text-gray-600">Diseases</span>
          </div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Link to="/search">
            <div className="relative">
              <div className="relative bg-white rounded-xl border-2 border-gray-900 shadow-md hover:shadow-lg transition-shadow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Search diseases, medicines, treatments..."
                  readOnly
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 text-base font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = '/search'
                  }}
                />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Detection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <Card className="border-2 shadow-elegant-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Detect the disease
              </CardTitle>
              
              {/* Step Flow - Mobile Horizontal Layout */}
              <div className="flex items-center justify-between mb-6 gap-2">
                {/* Step 1: Take a picture */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-dashed border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-orange-50 flex-shrink-0">
                    <Fish className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">Take a picture</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                
                {/* Step 2: See diagnosis */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-green-50 flex-shrink-0">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">See diagnosis</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                
                {/* Step 3: Get medicine */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-blue-50 flex-shrink-0">
                    <Pill className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">Get medicine</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  size="lg"
                  onClick={handleUploadClick}
                  className="flex-1 w-full sm:w-auto"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  <span className="text-white">Upload Image</span>
                </Button>
                <Button
                  size="lg"
                  onClick={handleUploadClick}
                  variant="outline"
                  className="flex-1 w-full sm:w-auto !border-blue-600 !text-blue-600 hover:!bg-blue-50"
                >
                  <Camera className="h-5 w-5 mr-2" />
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
            </CardHeader>
          </Card>
        </motion.div>

        {/* Disease Manuals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Disease Manuals</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/manual?tab=fish">
              <Card className="card-hover cursor-pointer h-full text-center p-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl bg-green-50 group-hover:bg-green-100 transition-colors">
                    <Fish className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Fish</CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/manual?tab=shrimp">
              <Card className="card-hover cursor-pointer h-full text-center p-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <Shrimp className="h-12 w-12 text-orange-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Shrimp</CardTitle>
                </div>
              </Card>
            </Link>
          </div>
        </motion.div>

            {/* Medicine & Supplements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Medicine and supplements</h2>
              <div className="grid grid-cols-3 gap-4">
                {medicineCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <Link key={index} to="/medicines">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Card className="text-center card-hover cursor-pointer h-full group">
                          <CardContent className="pt-4 pb-3 px-2 flex flex-col h-full">
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 ${
                              category.color === 'text-blue-600' ? 'bg-blue-50' :
                              category.color === 'text-red-600' ? 'bg-red-50' :
                              category.color === 'text-green-600' ? 'bg-green-50' :
                              category.color === 'text-purple-600' ? 'bg-purple-50' :
                              category.color === 'text-orange-600' ? 'bg-orange-50' :
                              'bg-teal-50'
                            }`}>
                              <Icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <div className="h-10 flex items-center justify-center flex-grow">
                              <p className="text-[10px] sm:text-xs font-semibold leading-tight break-words text-foreground text-center">
                                {category.label}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
      </section>
    </div>
  )
}

