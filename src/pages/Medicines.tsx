import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Pill,
  Stethoscope,
  FlaskConical,
  Droplets,
  Shield,
  Leaf,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { medicines, Medicine } from '../data/medicines'

const categoryIcons = {
  Medicine: Pill,
  Drugs: Stethoscope,
  Probiotics: FlaskConical,
  Disinfectant: Droplets,
  Immunostimulants: Shield,
  'Feed Additives': Leaf,
}

const categoryColors = {
  Medicine: 'bg-blue-100 text-blue-600',
  Drugs: 'bg-red-100 text-red-600',
  Probiotics: 'bg-green-100 text-green-600',
  Disinfectant: 'bg-purple-100 text-purple-600',
  Immunostimulants: 'bg-orange-100 text-orange-600',
  'Feed Additives': 'bg-teal-100 text-teal-600',
}

type Category = Medicine['category']

export default function Medicines() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const categories: Category[] = [
    'Medicine',
    'Drugs',
    'Probiotics',
    'Disinfectant',
    'Immunostimulants',
    'Feed Additives',
  ]

  const filteredMedicines = useMemo(
    () => (selectedCategory ? medicines.filter((m) => m.category === selectedCategory) : medicines),
    [selectedCategory]
  )

  if (selectedCategory) {
      return (
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 pb-24 md:pb-8 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 xs:mb-6 text-primary-600 hover:text-primary-700 flex items-center min-h-[44px] text-sm xs:text-base"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Categories
            </button>
            <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold mb-3 xs:mb-4">{selectedCategory}</h1>
          <p className="text-muted-foreground mb-8">
            {filteredMedicines.length} items found
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
            {filteredMedicines.map((medicine) => {
              const Icon = categoryIcons[medicine.category]
              return (
                <motion.div
                  key={medicine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full card-hover">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${categoryColors[medicine.category]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{medicine.name}</CardTitle>
                      </div>
                          <CardDescription className="text-base sm:text-lg">{medicine.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Usage:</h4>
                        <p className="text-sm text-muted-foreground">{medicine.usage}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Dosage:</h4>
                        <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                      </div>
                      {medicine.precautions.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Precautions:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {medicine.precautions.map((precaution, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{precaution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">Medicine Reference</h1>
        <p className="text-center text-muted-foreground mb-12">
          Browse medicines and supplements by category
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category]
            const count = medicines.filter((m) => m.category === category).length
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="cursor-pointer card-hover h-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div
                        className={`p-4 rounded-full ${categoryColors[category]}`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{category}</h3>
                        <p className="text-sm text-muted-foreground">{count} items</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

