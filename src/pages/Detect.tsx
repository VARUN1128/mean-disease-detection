import { useState } from 'react'
import { motion } from 'framer-motion'
import UploadCard from '../components/UploadCard'
import Loader from '../components/Loader'
import ResultCard from '../components/ResultCard'
import { useDetectionStore, DetectionResult } from '../store/detectionStore'
import { fishDiseases } from '../data/fishDiseases'
import { shrimpDiseases } from '../data/shrimpDiseases'

// Mock AI detection function
const simulateDetection = (imageFile: File): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select a disease (mix of fish and shrimp)
      const allDiseases = [...fishDiseases, ...shrimpDiseases]
      const randomDisease = allDiseases[Math.floor(Math.random() * allDiseases.length)]
      const confidence = Math.floor(Math.random() * 30) + 70 // 70-100%

      const reader = new FileReader()
      reader.onload = (e) => {
        const result: DetectionResult = {
          id: Date.now().toString(),
          image: e.target?.result as string,
          diseaseName: randomDisease.name,
          confidence,
          description: randomDisease.description,
          medicines: randomDisease.treatment.medicines,
          timestamp: new Date().toISOString(),
        }
        resolve(result)
      }
      reader.readAsDataURL(imageFile)
    }, 2000) // Simulate 2 second processing
  })
}

export default function Detect() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const { addDetection } = useDetectionStore()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
  }

  const handleDetect = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    try {
      const detectionResult = await simulateDetection(selectedFile)
      setResult(detectionResult)
      addDetection(detectionResult)
    } catch (error) {
      console.error('Detection failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">Disease Detection</h1>
        <p className="text-center text-muted-foreground mb-8">
          Upload an image of your fish or shrimp to get an AI-powered diagnosis
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          {!preview && !isProcessing && (
            <UploadCard onFileSelect={handleFileSelect} />
          )}

          {preview && !isProcessing && !result && (
            <div className="space-y-4">
              <UploadCard preview={preview} onRemove={handleRemove} />
              <div className="text-center">
                <button
                  onClick={handleDetect}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Analyze Image
                </button>
              </div>
            </div>
          )}

          {isProcessing && <Loader />}

          {result && (
            <div className="space-y-4">
              <UploadCard preview={result.image} onRemove={handleRemove} />
              <ResultCard
                diseaseName={result.diseaseName}
                confidence={result.confidence}
                description={result.description}
                medicines={result.medicines}
              />
              <div className="text-center">
                <button
                  onClick={handleRemove}
                  className="px-6 py-2 border border-input bg-background rounded-lg font-medium hover:bg-accent transition-colors"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

