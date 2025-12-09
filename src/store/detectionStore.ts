import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Medicine {
  name: string
  dosage?: string
  duration?: string
}

export interface DetectionResult {
  id: string
  image: string // Base64 image - excluded from persistence to avoid localStorage quota
  diseaseName: string
  confidence: number
  description: string
  medicines: Medicine[]
  timestamp: string
}

// Type for persisted detection (without image to save space)
export interface PersistedDetection {
  id: string
  diseaseName: string
  confidence: number
  description: string
  medicines: Medicine[]
  timestamp: string
}

interface DetectionState {
  detections: DetectionResult[]
  pendingFile: { data: string; name: string; type: string } | null
  addDetection: (detection: DetectionResult) => void
  clearDetections: () => void
  setPendingFile: (file: { data: string; name: string; type: string } | null) => void
}

export const useDetectionStore = create<DetectionState>()(
  persist(
    (set) => ({
      detections: [],
      pendingFile: null,
      addDetection: (detection) =>
        set((state) => {
          // Limit to last 10 detections to prevent localStorage overflow
          const newDetections = [detection, ...state.detections].slice(0, 10)
          return { detections: newDetections }
        }),
      clearDetections: () => set({ detections: [] }),
      setPendingFile: (file) => set({ pendingFile: file }),
    }),
    {
      name: 'detection-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist metadata without images to avoid localStorage quota issues
        // Images are excluded because base64 encoding makes them very large
        detections: state.detections.map(({ image, ...rest }) => ({
          ...rest,
          image: '', // Store empty string instead of base64 image
        })),
      }),
    }
  )
)

