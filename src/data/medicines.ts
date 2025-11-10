export interface Medicine {
  id: string
  name: string
  category: 'Medicine' | 'Drugs' | 'Probiotics' | 'Disinfectant' | 'Immunostimulants' | 'Feed Additives'
  description: string
  usage: string
  dosage: string
  precautions: string[]
}

export const medicines: Medicine[] = [
  {
    id: 'm1',
    name: 'Malachite Green',
    category: 'Medicine',
    description: 'Antiparasitic medication effective against Ich and other external parasites.',
    usage: 'Add to aquarium water as per instructions. Effective against protozoan parasites.',
    dosage: '0.1-0.2 mg/L for 3-5 days',
    precautions: ['Remove activated carbon', 'Not for food fish', 'Handle with care']
  },
  {
    id: 'm2',
    name: 'Tetracycline',
    category: 'Drugs',
    description: 'Broad-spectrum antibiotic for bacterial infections like fin rot and columnaris.',
    usage: 'Can be administered via food or water. Effective against gram-positive and gram-negative bacteria.',
    dosage: '10-20 mg/L in water or 50-75 mg/kg in food',
    precautions: ['Complete full course', 'Monitor water quality', 'May affect beneficial bacteria']
  },
  {
    id: 'm3',
    name: 'AquaProbiotic Plus',
    category: 'Probiotics',
    description: 'Beneficial bacteria supplement to improve gut health and water quality.',
    usage: 'Add directly to water or mix with feed. Enhances digestion and immune system.',
    dosage: '1-2 ml per 10 gallons weekly',
    precautions: ['Store in cool place', 'Don\'t use with antibiotics', 'Shake well before use']
  },
  {
    id: 'm4',
    name: 'Chlorine-Based Disinfectant',
    category: 'Disinfectant',
    description: 'Powerful disinfectant for equipment and tank sterilization.',
    usage: 'Use for cleaning equipment, nets, and tanks. Rinse thoroughly after use.',
    dosage: '1:10 dilution for equipment cleaning',
    precautions: ['Never use with fish present', 'Ventilate area', 'Wear protective gear']
  },
  {
    id: 'm5',
    name: 'Beta-Glucan Immunostimulant',
    category: 'Immunostimulants',
    description: 'Natural immune system booster derived from yeast and mushrooms.',
    usage: 'Add to feed or water to enhance fish immune response and disease resistance.',
    dosage: '0.1-0.2% of feed weight',
    precautions: ['Use as preventive measure', 'Not a cure for active disease', 'Store properly']
  },
  {
    id: 'm6',
    name: 'Vitamin C Feed Additive',
    category: 'Feed Additives',
    description: 'Essential vitamin supplement to boost immunity and reduce stress.',
    usage: 'Mix with regular feed. Helps in wound healing and stress reduction.',
    dosage: '100-200 mg per kg of feed',
    precautions: ['Don\'t exceed recommended dose', 'Store in dark, cool place', 'Use within expiry']
  },
  {
    id: 'm7',
    name: 'Formalin',
    category: 'Medicine',
    description: 'Antiparasitic and antifungal treatment for external infections.',
    usage: 'Bath treatment for fish. Effective against parasites and fungi.',
    dosage: '15-25 ppm for 30-60 minutes',
    precautions: ['Highly toxic', 'Use in well-ventilated area', 'Remove fish if stressed']
  },
  {
    id: 'm8',
    name: 'Kanamycin',
    category: 'Drugs',
    description: 'Aminoglycoside antibiotic for severe bacterial infections.',
    usage: 'Injectable or water treatment for internal and external bacterial infections.',
    dosage: '5-10 mg/L in water or 20-30 mg/kg body weight',
    precautions: ['Prescription required', 'Monitor kidney function', 'Complete full course']
  },
  {
    id: 'm9',
    name: 'Lactobacillus Probiotic',
    category: 'Probiotics',
    description: 'Beneficial gut bacteria to improve digestion and nutrient absorption.',
    usage: 'Add to feed or water. Promotes healthy gut microbiome.',
    dosage: '1-2 billion CFU per kg feed',
    precautions: ['Don\'t use with antibiotics', 'Refrigerate', 'Use fresh']
  },
  {
    id: 'm10',
    name: 'Potassium Permanganate',
    category: 'Disinfectant',
    description: 'Oxidizing agent for treating parasites and disinfecting equipment.',
    usage: 'Bath treatment or equipment disinfection. Effective against various pathogens.',
    dosage: '2-4 ppm for 4 hours',
    precautions: ['Stains everything', 'Use exact dosage', 'Remove activated carbon']
  },
  {
    id: 'm11',
    name: 'Echinacea Extract',
    category: 'Immunostimulants',
    description: 'Herbal immune booster to enhance natural disease resistance.',
    usage: 'Add to feed or water. Natural alternative to synthetic immunostimulants.',
    dosage: '0.05-0.1% of feed',
    precautions: ['Natural product', 'May vary in potency', 'Store away from light']
  },
  {
    id: 'm12',
    name: 'Omega-3 Fatty Acids',
    category: 'Feed Additives',
    description: 'Essential fatty acids for growth, reproduction, and immune function.',
    usage: 'Mix with feed. Improves overall health and disease resistance.',
    dosage: '1-2% of feed weight',
    precautions: ['Store in cool, dark place', 'Prevent oxidation', 'Use quality source']
  }
]

