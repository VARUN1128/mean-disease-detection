import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface DetectionResult {
  id: string
  image: string
  diseaseName: string
  confidence: number
  description: string
  medicines: string[]
  timestamp: string
}

interface DetectionState {
  detections: DetectionResult[]
  addDetection: (detection: DetectionResult) => void
  clearDetections: () => void
}

export const useDetectionStore = create<DetectionState>()(
  persist(
    (set) => ({
      detections: [],
      addDetection: (detection) =>
        set((state) => ({
          detections: [detection, ...state.detections],
        })),
      clearDetections: () => set({ detections: [] }),
    }),
    {
      name: 'detection-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

