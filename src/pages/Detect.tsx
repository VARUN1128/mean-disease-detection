import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import UploadCard from '../components/UploadCard'
import Loader from '../components/Loader'
import ResultCard from '../components/ResultCard'
import { useDetectionStore, DetectionResult } from '../store/detectionStore'
import { predictDisease } from '../utils/api'
import { AlertCircle } from 'lucide-react'
import { cleanText } from '../utils/textCleaner'

export default function Detect() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { addDetection, pendingFile, setPendingFile } = useDetectionStore()

  // Handle file passed from Home page via store
  useEffect(() => {
    if (pendingFile) {
      // Convert base64 back to File object
      const byteString = atob(pendingFile.data.split(',')[1])
      const mimeString = pendingFile.data.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: mimeString })
      const file = new File([blob], pendingFile.name, { type: pendingFile.type })
      
      handleFileSelect(file)
      setPendingFile(null) // Clear pending file
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingFile])

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleRemove = useCallback(() => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }, [])

  const handleDetect = useCallback(async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    try {
      console.log('Starting prediction for file:', selectedFile.name, selectedFile.size, 'bytes')
      
      // Call the backend API directly (no authentication required)
      const apiResponse = await predictDisease(selectedFile)
      
      console.log('Prediction successful:', apiResponse)

      // Clean description and recommended text first
      let cleanDescription = cleanText(apiResponse.description || '')
      if (cleanDescription.toLowerCase().includes('disclaimer')) {
        const disclaimerIndex = cleanDescription.toLowerCase().indexOf('disclaimer')
        cleanDescription = cleanDescription.substring(0, disclaimerIndex).trim()
      }
      
      let cleanRecommended = cleanText(apiResponse.recommended || '')
      
      // Parse recommended medicines from Gemini response
      const parseMedicines = (text: string) => {
        const medicines: Array<{ name: string; dosage: string; duration: string }> = []
        
        // Split by common patterns (numbered lists, bullet points, or line breaks)
        const lines = text
          .split(/\n+/)
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.toLowerCase().includes('disclaimer'))
        
        for (const line of lines) {
          // Skip headers or section titles
          if (line.toLowerCase().includes('treatment') && line.length < 50) continue
          if (line.toLowerCase().includes('dosage') && line.length < 30) continue
          
          // Try to parse "Medicine Name: dosage info" format
          if (line.includes(':')) {
            const [name, ...dosageParts] = line.split(':')
            const nameClean = name.trim().replace(/^[-•\d.\s]+/, '').trim() // Remove bullets/numbers
            const dosageClean = dosageParts.join(':').trim()
            
            if (nameClean.length > 0) {
              medicines.push({
                name: nameClean,
                dosage: dosageClean || '',
                duration: '',
              })
            }
          } else if (line.length > 10) {
            // If no colon, treat the whole line as medicine name
            const nameClean = line.replace(/^[-•\d.\s]+/, '').trim()
            if (nameClean.length > 0) {
              medicines.push({
                name: nameClean,
                dosage: '',
                duration: '',
              })
            }
          }
        }
        
        // If no medicines parsed, create a single entry with the full text
        if (medicines.length === 0 && text.trim().length > 0) {
          medicines.push({
            name: text.split('\n')[0].substring(0, 100) || 'See recommended treatments',
            dosage: '',
            duration: '',
          })
        }
        
        return medicines.slice(0, 5) // Limit to 5 medicines
      }
      
      const medicines = parseMedicines(cleanRecommended)
      
      console.log('Parsed medicines:', medicines)
      console.log('Clean description length:', cleanDescription.length)
      console.log('Clean recommended length:', cleanRecommended.length)

      // Convert API response to DetectionResult format
      const reader = new FileReader()
      reader.onload = (e) => {
        const detectionResult: DetectionResult = {
          id: Date.now().toString(),
          image: e.target?.result as string,
          diseaseName: apiResponse.prediction,
          confidence: Math.round(apiResponse.confidence * 100), // Convert to percentage
          description: cleanDescription,
          medicines: medicines,
          timestamp: new Date().toISOString(),
        }
        console.log('Setting result:', {
          diseaseName: detectionResult.diseaseName,
          confidence: detectionResult.confidence,
          descriptionLength: detectionResult.description.length,
          medicinesCount: detectionResult.medicines.length
        })
        setResult(detectionResult)
        addDetection(detectionResult)
      }
      reader.onerror = (error) => {
        console.error('FileReader error:', error)
        setError('Failed to process image file')
        setIsProcessing(false)
      }
      reader.readAsDataURL(selectedFile)
    } catch (err) {
      // Enhanced error handling with user-friendly messages
      let errorMessage = 'Detection failed. Please try again.'
      
      if (err instanceof Error) {
        errorMessage = err.message
        
        // Provide more specific error messages
        if (err.message.includes('Failed to fetch') || err.message.includes('ERR_CONNECTION_RESET')) {
          errorMessage = 'Cannot connect to the server. Please make sure the backend is running on http://localhost:8000'
        } else if (err.message.includes('API error 500')) {
          errorMessage = 'Server error occurred. Please try again or contact support.'
        } else if (err.message.includes('API error 400')) {
          errorMessage = 'Invalid image file. Please upload a valid image.'
        }
      }
      
      setError(errorMessage)
      console.error('Detection failed:', err)
    } finally {
      setIsProcessing(false)
    }
  }, [selectedFile, addDetection])

  return (
    <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 pb-24 md:pb-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-3 xs:mb-4">Disease Detection</h1>
        <p className="text-center text-base xs:text-lg sm:text-xl text-muted-foreground mb-6 xs:mb-8 px-2">
          Upload an image of your fish or shrimp to get an AI-powered diagnosis
        </p>

        <div className="max-w-4xl mx-auto space-y-4 xs:space-y-6 sm:space-y-8">
          {!preview && !isProcessing && (
            <UploadCard onFileSelect={handleFileSelect} />
          )}

          {preview && !isProcessing && !result && (
            <div className="space-y-4">
              <UploadCard preview={preview} onRemove={handleRemove} />
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm sm:text-base">{error}</p>
                </motion.div>
              )}
              <div className="text-center">
                <button
                  onClick={handleDetect}
                  className="px-6 xs:px-8 py-2.5 xs:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors min-h-[44px] text-base xs:text-lg w-full xs:w-auto"
                >
                  Detect Now
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
                  className="px-5 xs:px-6 py-2 border border-input bg-background rounded-lg font-medium hover:bg-accent transition-colors min-h-[44px] text-base xs:text-lg w-full xs:w-auto"
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
