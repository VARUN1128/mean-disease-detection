import { Disease } from './fishDiseases'

export const shrimpDiseases: Disease[] = [
  {
    id: 's1',
    name: 'White Spot Syndrome Virus (WSSV)',
    description: 'Highly contagious viral disease causing white spots on shrimp shell.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    symptoms: ['White spots on shell', 'Reduced feeding', 'Lethargy', 'High mortality'],
    treatment: {
      medicines: ['No direct treatment', 'Supportive care', 'Immune boosters'],
      dosage: 'N/A - Prevention focused',
      duration: 'N/A',
      prevention: ['Biosecurity measures', 'SPF (Specific Pathogen Free) stock', 'Water quality management']
    }
  },
  {
    id: 's2',
    name: 'Early Mortality Syndrome (EMS)',
    description: 'Bacterial disease causing rapid mortality in shrimp farms.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    symptoms: ['Empty gut', 'Pale hepatopancreas', 'Slow growth', 'High mortality'],
    treatment: {
      medicines: ['Probiotics', 'Antibiotics (under supervision)', 'Organic acids'],
      dosage: 'As per aquaculture specialist',
      duration: '10-14 days',
      prevention: ['Proper pond preparation', 'Probiotic supplementation', 'Water quality control']
    }
  },
  {
    id: 's3',
    name: 'Black Gill Disease',
    description: 'Fungal infection causing blackening of gills in shrimp.',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400',
    symptoms: ['Black gills', 'Reduced oxygen intake', 'Surface swimming', 'Mortality'],
    treatment: {
      medicines: ['Formalin', 'Potassium permanganate', 'Antifungal agents'],
      dosage: 'Follow aquaculture guidelines',
      duration: '7-10 days',
      prevention: ['Adequate aeration', 'Water exchange', 'Avoid organic buildup']
    }
  },
  {
    id: 's4',
    name: 'Vibriosis',
    description: 'Bacterial infection caused by Vibrio species affecting shrimp health.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    symptoms: ['Reduced feeding', 'Lethargy', 'Discoloration', 'Soft shell'],
    treatment: {
      medicines: ['Antibiotics (Oxytetracycline)', 'Probiotics', 'Immune stimulants'],
      dosage: 'As prescribed by specialist',
      duration: '7-10 days',
      prevention: ['Water quality management', 'Probiotic use', 'Stress reduction']
    }
  },
  {
    id: 's5',
    name: 'Yellow Head Virus (YHV)',
    description: 'Viral disease causing yellowing of cephalothorax in shrimp.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    symptoms: ['Yellow head', 'Pale body', 'Reduced feeding', 'High mortality'],
    treatment: {
      medicines: ['No direct treatment', 'Supportive management'],
      dosage: 'N/A',
      duration: 'N/A',
      prevention: ['Biosecurity', 'SPF stock', 'Proper disinfection']
    }
  }
]

