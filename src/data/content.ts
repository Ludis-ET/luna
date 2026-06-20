export const SITE = {
  name: 'Luna Cottage',
  tagline: 'Adult Family Home',
  owner: 'Fitsum Awoke, RN, BSN',
  // Cell is the number families should call or text first; office is the business line.
  phones: [
    { label: 'Call or Text', number: '206-398-9638', primary: true },
    { label: 'Office', number: '425-337-9724', primary: false },
  ],
  fax: '425-357-1170',
  email: 'Emunetluna@gmail.com',
  address: '10524 23rd Dr SE, Everett, WA 98208',
  // TODO: pick ONE canonical domain. The email currently uses gmail; if you adopt a
  // branded domain make sure it matches index.html (canonical + JSON-LD), robots.txt
  // and sitemap.xml.
  website: 'www.lunacottageafh.com',
  // TODO: add your WA DSHS Adult Family Home license number for a strong trust signal.
  license: '', // e.g. 'License #XXXXXX'
  // EmailJS sends the branded HTML inquiry email (see .env.example for setup).
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
  // Optional Google reCAPTCHA v3 site key — verified client-side before send.
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '',
} as const

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#brochure', label: 'Brochure' },
  { href: '#contact', label: 'Contact' },
] as const

export const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'mission',
  'gallery',
  'brochure',
  'tour',
  'contact',
] as const

export const TRUST_STATS = [
  { value: '6', label: 'Private Rooms' },
  { value: 'RN', label: 'Owned & Operated' },
  { value: 'WA', label: 'South Everett' },
] as const

export const ABOUT_PARAGRAPHS = [
  'Luna Cottage Adult Family Home is a licensed, RN-owned and managed care home located in a peaceful residential neighborhood in South Everett. We provide a warm, safe, and comfortable environment for up to six residents, offering personalized care tailored to each individual’s needs, preferences, and abilities.',
  'Our home is designed to feel like family, where residents are treated with dignity, respect, and compassion while receiving the support they need to live comfortably and safely.',
] as const

export const PHILOSOPHY =
  'Our philosophy is centered on person-centered care. We believe each resident is unique and deserves care that respects their history, preferences, and current abilities. We focus on creating a nurturing environment that supports physical, emotional, and social well-being.'

export const VALUES = [
  'Compassionate, respectful, and dignified care',
  'Resident-centered support tailored to individual needs',
  'Safe, clean, and home-like environment',
  'Strong communication with families and care teams',
  'Encouraging independence while providing appropriate assistance',
  'Commitment to quality care and continuous improvement',
  'RN-owned leadership with clinical oversight and experience',
] as const

export const MISSION =
  'Our mission is to provide high-quality, compassionate, and individualized care in a home-like setting where every resident feels valued, safe, and supported. We are committed to enhancing quality of life while promoting comfort, independence, and dignity.'

export const STAFF_TEXT =
  'We offer steady, consistent care from trained staff who meet all Washington State requirements, including CPR/First Aid, Mental Health and Dementia training, diabetes and insulin administration, and completed background and fingerprint checks. Our team continually further their education so your loved ones receive skilled, compassionate care and feel like part of our extended family.'

export const STAFF_CREDENTIALS = [
  'CPR / First Aid certified',
  'Mental Health & Dementia training',
  'Diabetes & insulin administration',
  'Background & fingerprint checks',
] as const

export const SERVICES_INTRO =
  'From daily living assistance to specialized clinical care, here is everything Luna Cottage provides for our residents and their families.'

/**
 * Health services & daily care.
 * TODO: VERIFY every line below is a service Luna Cottage actually provides.
 * Listing care you don't deliver (e.g. tube feeding, ostomy, ventilator) is a
 * licensing/liability risk. Remove anything that doesn't apply.
 */
export const SERVICE_CATEGORIES = [
  {
    title: 'Clinical Care & Daily Living',
    icon: '♥',
    items: [
      'Nurse-led case management and clinical oversight',
      'Awake caregivers on duty around the clock, day and night',
      'Care plans tailored at move-in and reviewed as needs change',
      'Prescription support: administering, monitoring, and managing medications',
      'Scheduling help and transportation for medical appointments',
      'Vital tracking: glucose, blood pressure, weight, and related charting',
      'Nurse-delegated diabetes care and insulin management',
      'Wound care, injections, eye drops, and catheter assistance',
      'Physician and podiatrist visits arranged in the home',
      'Emergency alert-call devices in every resident room',
      'Mealtime help and adaptive feeding support',
      'Bathing, dressing, hygiene, and daily grooming',
      'On-site beautician and personal grooming services',
      'Laundry, fresh linens, and light housekeeping',
    ],
  },
  {
    title: 'Conditions We Support',
    icon: '◆',
    items: [
      'Dementia and Alzheimer\'s memory care',
      'Parkinson\'s disease support',
      'Post-stroke recovery assistance',
      'Cardiac conditions and heart-related care',
      'Congestive heart failure management',
      'Diabetes and blood-sugar monitoring',
      'Hospice and comfort-focused end-of-life care',
      'Mental health and emotional wellness',
      'Arthritis and joint-mobility support',
      'Incontinence and continence care',
      'Coordinated home health services',
      'Oxygen therapy and respiratory support',
      'Tube feeding and nutritional support',
      'Ostomy and ileostomy care',
      'Short-term rehabilitation needs',
      'Specialized DDA services',
    ],
  },
  {
    title: 'Life Enrichment & Social Programs',
    icon: '✦',
    items: [
      'Live music and monthly visiting musicians',
      'Family lounge with books, music, and quiet reading',
      'Games, movies, and relaxed in-home recreation',
      'Group social time and daily companionship',
      'Cultural, educational, and community programs',
      'Fitness and wellness activities for every ability',
      'Personalized movement and exercise routines',
      'Birthday parties and seasonal holiday events',
      'Garden strolls and neighborhood walks',
      'Patio cookouts and outdoor gatherings',
    ],
  },
  {
    title: 'Our Home & Comfort Features',
    icon: '⌂',
    items: [
      'Private rooms, several with attached bathrooms',
      'Fully wheelchair and walker accessible throughout',
      'Bright shared living and dining spaces',
      'Accessible bathrooms with walk-in showers',
      'Comfort-height toilets for safer transfers',
      'Cable television in each bedroom',
      'Landscaped backyard and sheltered patio',
      'Peaceful, secure setting in a quiet neighborhood',
      'Smoke alarms installed in every room',
      'Both male and female residents welcome',
      'Medicaid and private-pay options available',
      'Respectful care for all cultures, ethnicities, and beliefs',
    ],
  },
] as const

export const BROCHURE = {
  // Print-ready files live in /public and open in a new tab for "Save as PDF".
  brochureUrl: '/brochure.html',
  businessCardUrl: '/business-card.html',
}
