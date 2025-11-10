export interface Disease {
  id: string
  name: string
  description: string
  image: string
  symptoms: string[]
  treatment: {
    medicines: string[]
    dosage: string
    duration: string
    prevention: string[]
  }
}

export const fishDiseases: Disease[] = [
  {
    id: '1',
    name: 'Ichthyophthirius (White Spot Disease)',
    description: 'A common parasitic disease causing white spots on fish body and fins.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    symptoms: ['White spots on body', 'Rubbing against objects', 'Clamped fins', 'Rapid breathing'],
    treatment: {
      medicines: ['Malachite Green', 'Formalin', 'Copper Sulfate'],
      dosage: 'Follow manufacturer instructions',
      duration: '7-10 days',
      prevention: ['Quarantine new fish', 'Maintain water quality', 'Avoid temperature fluctuations']
    }
  },
  {
    id: '2',
    name: 'Fin Rot',
    description: 'Bacterial infection causing deterioration of fins and tail.',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400',
    symptoms: ['Frayed or disintegrating fins', 'Redness at fin base', 'White edges on fins'],
    treatment: {
      medicines: ['Antibiotics (Tetracycline)', 'Melafix', 'Pimafix'],
      dosage: 'As per veterinarian recommendation',
      duration: '5-7 days',
      prevention: ['Clean water conditions', 'Avoid overcrowding', 'Proper nutrition']
    }
  },
  {
    id: '3',
    name: 'Dropsy',
    description: 'A condition causing fluid accumulation and swelling in fish.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    symptoms: ['Swollen abdomen', 'Raised scales', 'Bulging eyes', 'Loss of appetite'],
    treatment: {
      medicines: ['Antibiotics (Kanamycin)', 'Epsom salt baths', 'Antibacterial food'],
      dosage: 'Consult veterinarian',
      duration: '10-14 days',
      prevention: ['Excellent water quality', 'Balanced diet', 'Stress reduction']
    }
  },
  {
    id: '4',
    name: 'Velvet Disease',
    description: 'Parasitic infection causing a velvety appearance on fish skin.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    symptoms: ['Dusty appearance', 'Rapid breathing', 'Flashing', 'Clamped fins'],
    treatment: {
      medicines: ['Copper Sulfate', 'Malachite Green', 'Formalin'],
      dosage: 'Follow product guidelines',
      duration: '7-10 days',
      prevention: ['Quarantine procedures', 'UV sterilization', 'Maintain optimal temperature']
    }
  },
  {
    id: '5',
    name: 'Columnaris (Cotton Mouth)',
    description: 'Bacterial infection causing white or gray patches on fish.',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400',
    symptoms: ['White patches on mouth', 'Frayed fins', 'Mucus production', 'Lethargy'],
    treatment: {
      medicines: ['Antibiotics (Kanamycin)', 'Furan-2', 'Salt treatment'],
      dosage: 'As prescribed',
      duration: '5-7 days',
      prevention: ['Good water circulation', 'Avoid stress', 'Proper filtration']
    }
  }
]

