-- Seed data for diseases table
-- Run this SQL in your Supabase SQL Editor to populate the diseases table

-- Insert disease records with treatments and medicine suggestions
INSERT INTO diseases (id, name, description, common_treatment, medicine_suggestion) VALUES
(
    gen_random_uuid(),
    'Bacterial Gill Disease',
    'Bacterial infection affecting the gills, causing respiratory distress and reduced oxygen uptake.',
    'Bath treatment: Maintain low ammonia levels (<0.25 ppm), increase aeration, perform 30-minute salt bath (1-3% salinity) daily for 3-5 days. Isolate affected fish.',
    'Oxytetracycline: 50-100 mg per liter of water for 5-7 days. Administer as bath treatment. Can also use at 2-4 g per 100 kg of fish body weight in feed for 10-14 days.'
),
(
    gen_random_uuid(),
    'Aeromoniasis',
    'Caused by Aeromonas bacteria, characterized by ulcers, fin rot, and internal hemorrhaging.',
    'Salt bath treatment: 1-3% salt solution for 10-30 minutes daily. Improve water quality, reduce stress. Maintain optimal temperature and pH. Remove dead or severely affected fish immediately.',
    'Enrofloxacin: 10-20 mg per kg of fish body weight orally for 5-7 days. Or use as bath treatment at 2-5 mg per liter for 1-2 hours daily. Salt bath (1-3%) can be combined for better results.'
),
(
    gen_random_uuid(),
    'Parasitic',
    'Parasitic infestation including protozoans, flukes, and other external parasites causing irritation and tissue damage.',
    'Formalin dip: 25 ppm for 1 hour or 167 ppm for 45 minutes. Potassium permanganate bath: 2-4 ppm for 4 hours. Increase water temperature gradually if species allows. Quarantine new fish before introduction.',
    'Formalin: Use at 15-25 ppm as prolonged bath or 167-250 ppm as short dip. Potassium permanganate: 2-4 ppm for 4-6 hours. Praziquantel: 2-5 mg per liter for 3-5 days for flukes. Always follow manufacturer instructions.'
),
(
    gen_random_uuid(),
    'Viral White tail',
    'Viral disease causing white tail appearance, often associated with stress and poor water conditions.',
    'Supportive care only: Maintain excellent water quality, reduce stress factors, provide optimal nutrition. Implement strict biosecurity measures. Isolate affected fish. No specific antiviral treatment available.',
    'No specific antiviral medicine. Supportive treatment: Vitamin C supplements (100-200 mg per kg feed), immune boosters. Maintain water temperature at optimal range. Prevent secondary bacterial infections with good water quality.'
),
(
    gen_random_uuid(),
    'Fungal Saprolegniasis',
    'Fungal infection appearing as cotton-like growth on skin, fins, or gills, often secondary to injury or stress.',
    'Malachite green treatment: 0.1-0.2 ppm for 1 hour daily for 3-5 days. Salt bath: 1-3% for 10-30 minutes. Improve water quality, remove dead organic matter. Address underlying causes (injuries, stress).',
    'Malachite green: 0.1-0.2 ppm as bath treatment for 1 hour, repeat daily for 3-5 days. Formalin: 25 ppm for 1 hour can also be effective. Salt: 1-3% salt bath for 10-30 minutes daily. Treat underlying injuries to prevent recurrence.'
),
(
    gen_random_uuid(),
    'Bacterial Red Disease',
    'Bacterial infection causing reddening of skin, fins, and body, often with hemorrhaging and ulceration.',
    'Oxytetracycline bath: 50-100 mg per liter for 5-7 days. Improve water quality immediately. Increase aeration. Isolate affected fish. Maintain optimal temperature and pH. Remove dead fish promptly.',
    'Oxytetracycline: 50-100 mg per liter of water as bath treatment for 5-7 days. Alternative: 2-4 g per 100 kg of fish body weight mixed in feed for 10-14 days. Can combine with salt bath (1-3%) for enhanced effectiveness.'
),
(
    gen_random_uuid(),
    'Healthy Fish',
    'No disease detected. Fish appears healthy with normal behavior and appearance.',
    'No treatment required. Maintain good water quality, provide balanced nutrition, monitor regularly for early signs of disease. Continue preventive care practices.',
    'No medicine needed. Continue regular health monitoring. Ensure proper nutrition, water quality, and stress-free environment. Regular health checks recommended.'
);

-- Verify the insertions
SELECT id, name, common_treatment, medicine_suggestion FROM diseases ORDER BY name;

