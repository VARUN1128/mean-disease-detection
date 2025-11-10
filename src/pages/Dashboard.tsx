import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Download, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useDetectionStore } from '../store/detectionStore'
import { format } from 'date-fns'

export default function Dashboard() {
  const { detections, clearDetections } = useDetectionStore()

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    alert('PDF export functionality will be implemented here')
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              View your detection history and manage your records
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={handleExportPDF}
              disabled={detections.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            {detections.length > 0 && (
              <Button variant="outline" onClick={clearDetections}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </Button>
            )}
          </div>
        </div>

        {detections.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No detection history yet</p>
              <Link to="/detect">
                <Button>Start Your First Detection</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {detections.length} detection{detections.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {detections.map((detection, index) => (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">{detection.diseaseName}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDate(detection.timestamp)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative overflow-hidden rounded-lg group">
                        <img
                          src={detection.image}
                          alt="Detection"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Confidence: {detection.confidence}%</h4>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                detection.confidence >= 80
                                  ? 'bg-green-600'
                                  : detection.confidence >= 60
                                    ? 'bg-yellow-600'
                                    : 'bg-red-600'
                              }`}
                              style={{ width: `${detection.confidence}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Description:</h4>
                          <p className="text-sm text-muted-foreground">{detection.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommended Medicines:</h4>
                          <ul className="space-y-1">
                            {detection.medicines.map((medicine, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center">
                                <span className="h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                                {medicine}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

