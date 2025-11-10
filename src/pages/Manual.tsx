import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/Dialog'
import Button from '../components/ui/Button'
import { fishDiseases, Disease } from '../data/fishDiseases'
import { shrimpDiseases } from '../data/shrimpDiseases'

const DiseaseCard = ({ disease, onViewDetails }: { disease: Disease; onViewDetails: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="card-hover group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{disease.name}</CardTitle>
              <CardDescription className="line-clamp-2">{disease.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-lg mb-4 group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <Button onClick={onViewDetails} variant="outline" className="w-full group-hover:border-primary-400">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function DiseaseModal({
  disease,
  open,
  onOpenChange,
}: {
  disease: Disease | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!disease) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{disease.name}</DialogTitle>
          <DialogDescription>{disease.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div>
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Symptoms:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {disease.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Treatment:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Medicines: </span>
                <span className="text-muted-foreground">
                  {disease.treatment.medicines.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-medium">Dosage: </span>
                <span className="text-muted-foreground">{disease.treatment.dosage}</span>
              </div>
              <div>
                <span className="font-medium">Duration: </span>
                <span className="text-muted-foreground">{disease.treatment.duration}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Prevention:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {disease.treatment.prevention.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Manual() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && (tab === 'fish' || tab === 'shrimp')) {
      // Tab is already set correctly
    } else {
      setSearchParams({ tab: 'fish' })
    }
  }, [searchParams, setSearchParams])

  const currentTab = searchParams.get('tab') || 'fish'

  const handleViewDetails = (disease: Disease) => {
    setSelectedDisease(disease)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">Disease Manual</h1>
        <p className="text-center text-muted-foreground mb-8">
          Comprehensive guide to fish and shrimp diseases
        </p>

        <Tabs
          value={currentTab}
          onValueChange={(value) => setSearchParams({ tab: value })}
          className="max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="fish">🐟 Fish Diseases</TabsTrigger>
            <TabsTrigger value="shrimp">🦐 Shrimp Diseases</TabsTrigger>
          </TabsList>

          <TabsContent value="fish">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fishDiseases.map((disease) => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  onViewDetails={() => handleViewDetails(disease)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shrimp">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shrimpDiseases.map((disease) => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  onViewDetails={() => handleViewDetails(disease)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DiseaseModal
          disease={selectedDisease}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </motion.div>
    </div>
  )
}

