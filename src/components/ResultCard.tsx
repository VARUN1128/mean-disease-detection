import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cleanText } from '../utils/textCleaner'

interface Medicine {
  name: string
  dosage?: string
  duration?: string
}

interface ResultCardProps {
  diseaseName: string
  confidence: number
  description: string
  medicines: Medicine[] | string[]
}

export default function ResultCard({
  diseaseName,
  confidence,
  description,
  medicines,
}: ResultCardProps) {
  const confidenceColor =
    confidence >= 80 ? 'text-green-600' : confidence >= 60 ? 'text-yellow-600' : 'text-red-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="border-2 border-primary-200 shadow-elegant-lg bg-gradient-to-br from-card to-primary-50/30">
        <CardHeader>
          <div className="flex items-center justify-between">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl">{diseaseName}</CardTitle>
            {confidence >= 80 ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
                  <span className="text-base sm:text-lg font-medium">Confidence:</span>
                  <span className={`text-xl sm:text-2xl font-bold ${confidenceColor}`}>{confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  confidence >= 80
                    ? 'bg-green-600'
                    : confidence >= 60
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">Description</h4>
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {cleanText(description).split('\n').map((line, idx) => {
                    const trimmedLine = line.trim()
                    if (!trimmedLine) return null
                    return (
                      <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
                        {trimmedLine}
                      </p>
                    )
                  })}
                </div>
          </div>
          <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">Recommended Treatments</h4>
                {medicines.length > 0 ? (
                  <ul className="space-y-4">
                    {medicines.map((medicine, index) => {
                      // Handle both string and object formats
                      const medicineName = typeof medicine === 'string' ? medicine : medicine.name
                      const medicineDosage = typeof medicine === 'object' ? medicine.dosage : undefined
                      const medicineDuration = typeof medicine === 'object' ? medicine.duration : undefined
                      
                      return (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-2.5 flex-shrink-0"></span>
                          <div className="flex-1">
                            <div className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                              {cleanText(medicineName)}
                            </div>
                            {medicineDosage && (
                              <div className="text-sm sm:text-base text-gray-700 mt-1.5 leading-relaxed">
                                {cleanText(medicineDosage)}
                              </div>
                            )}
                            {medicineDuration && (
                              <div className="text-sm text-gray-600 mt-1">
                                Duration: {medicineDuration}
                              </div>
                            )}
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="text-base sm:text-lg text-gray-600">No specific recommendations available.</p>
                )}
          </div>
          <div className="pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
                  This information is AI-generated and not a medical diagnosis. Please consult a certified aquaculture veterinarian for professional advice.
                </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

