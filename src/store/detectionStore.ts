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
        set((state) => ({
          detections: [detection, ...state.detections],
        })),
      clearDetections: () => set({ detections: [] }),
      setPendingFile: (file) => set({ pendingFile: file }),
    }),
    {
      name: 'detection-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ detections: state.detections }), // Only persist detections, not pendingFile
    }
  )
)

