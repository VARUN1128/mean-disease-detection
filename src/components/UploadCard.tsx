import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import { Card, CardContent } from './ui/Card'

interface UploadCardProps {
  onFileSelect?: (file: File) => void
  preview?: string | null
  onRemove?: () => void
}

export default function UploadCard({ onFileSelect, preview, onRemove }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/') && onFileSelect) {
      onFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/') && onFileSelect) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  if (preview) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain bg-muted"
            />
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={onRemove}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed transition-colors ${
        isDragging ? 'border-primary-600 bg-primary-50 dark:bg-primary-950' : 'border-muted'
      }`}
    >
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDragging ? (
            <Upload className="mx-auto h-16 w-16 text-primary-600 mb-4" />
          ) : (
            <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          )}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">
          {isDragging ? 'Drop your image here' : 'Upload or Take a Picture'}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Drag and drop an image here, or click to browse
        </p>
        <Button onClick={() => fileInputRef.current?.click()} size="lg">
          <Upload className="mr-2 h-4 w-4" />
          Select Image
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="File input"
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Supports: JPG, PNG, WEBP (Max 10MB)
        </p>
      </CardContent>
    </Card>
  )
}

