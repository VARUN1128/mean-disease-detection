import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ResultCardProps {
  diseaseName: string
  confidence: number
  description: string
  medicines: string[]
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
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary-200 dark:border-primary-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{diseaseName}</CardTitle>
            {confidence >= 80 ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Confidence:</span>
              <span className={`text-lg font-bold ${confidenceColor}`}>{confidence}%</span>
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
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description:</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recommended Medicines:</h4>
            <ul className="space-y-2">
              {medicines.map((medicine, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-2 text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                  <span>{medicine}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

