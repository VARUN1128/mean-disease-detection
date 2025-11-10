import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header Section - Mobile First */}
      <section className="container mx-auto px-4 pt-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-sm text-muted-foreground leading-relaxed break-words">
            World's 1st real time fish disease detection prediction software
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Link to="/search">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                readOnly
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/search'
                }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Detection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl mb-4">Detect the disease</CardTitle>
              
              {/* Step Flow - Mobile Horizontal Layout */}
              <div className="flex items-center justify-between mb-6 gap-2">
                {/* Step 1: Take a picture */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-dashed border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-orange-50 dark:bg-orange-950/20 flex-shrink-0">
                    <Fish className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">Take a picture</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                
                {/* Step 2: See diagnosis */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-green-50 dark:bg-green-950/20 flex-shrink-0">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">See diagnosis</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                
                {/* Step 3: Get medicine */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-16 h-16 border-2 border-primary-300 rounded-lg flex items-center justify-center mb-2 bg-blue-50 dark:bg-blue-950/20 flex-shrink-0">
                    <Pill className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-center font-medium leading-tight">Get medicine</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/detect">
                  <Button size="lg" className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3">
                    Take a picture
                  </Button>
                </Link>
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
          <h2 className="text-xl font-bold mb-4">Disease Manuals</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/manual?tab=fish">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <Fish className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Fish</CardTitle>
                </div>
              </Card>
            </Link>
            <Link to="/manual?tab=shrimp">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full text-center p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <Shrimp className="h-12 w-12 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Shrimp</CardTitle>
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
          <h2 className="text-xl font-bold mb-4">Medicine and supplements</h2>
          <div className="grid grid-cols-3 gap-4">
            {medicineCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link key={index} to="/medicines">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="pt-4 pb-3 px-2">
                        <Icon className={`h-10 w-10 mx-auto mb-2 ${category.color}`} />
                        <p className="text-[10px] sm:text-xs font-medium leading-tight break-words">
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
      </section>
    </div>
  )
}

