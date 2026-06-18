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
  // Web3Forms access key for the contact form. Create a FREE key at https://web3forms.com
  // for the inbox that should receive inquiries (Emunetluna@gmail.com). It is tied to
  // that email and is safe to commit. Until set, the form shows a graceful fallback
  // telling visitors to call/text instead.
  formAccessKey: '', // TODO: paste Web3Forms access key here
  // Google reCAPTCHA v2 ("I'm not a robot") site key. Create one for your domain at
  // https://www.google.com/recaptcha/admin and enable reCAPTCHA in your Web3Forms
  // dashboard. Leave blank to hide the captcha (the form still works without it).
  recaptchaSiteKey: '', // TODO: paste reCAPTCHA v2 site key here
} as const

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
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
    title: "Health Services & Management",
    icon: "♥",
    items: [
      "RN Case Management",
      "24-hour care with awake night staff.",
      "In-home Beautician",
      "Individual care plans",
      "Medication administration, supervision and management",
      "Doctor appointments and coordination of transportation",
      "Documentation of resident glucose, blood pressure and weight charting",
      "Call buttons in every room",
      "Feeding assistance",
      "Bathing and dressing",
      "Personal hygiene and grooming",
      "Housekeeping / laundry",
      "In-home doctor and podiatrist visits",
      "Diabetic management and insulin administration (nurse-delegated)",
      "Wound care, eye drops, injections, and catheter care",
    ],
  },
  {
    title: "We Specialize In",
    icon: "◆",
    items: [
      "Alzheimer's",
      "Cardiac",
      "Dementia",
      "Diabetes",
      "Home Health oversight",
      "Hospice Care",
      "Incontinence",
      "Parkinson's",
      "Stroke",
      "Arthritis",
      "Congestive Heart Failure",
      "Mental Health",
      "Oxygen Therapy",
      "Tube Feeding",
      "Ostomy",
      "Ileostomy",
      "Rehab Needs",
      "Specialized DDA services",
    ],
  },
  {
    title: "Activities",
    icon: "✦",
    items: [
      "Group socialization",
      "In-home recreational activities: music, reading, games, movies",
      "Family room/library with music system, CDs, records, and cassette tape for music and books on tape/CD",
      "Birthday and holiday celebrations",
      "Outdoor walks",
      "Barbeques",
      "Educational, social, and cultural activities",
      "Fitness and well-being programs",
      "Exercises tailored to each resident's abilities",
      "Monthly Musician Visits",
    ],
  },
  {
    title: "Amenities",
    icon: "⌂",
    items: [
      "Several private rooms feature attached private bathrooms ",
      "Wheel-chair and walker access",
      "Indoor common areas",
      "Secure, safe surroundings",
      "Cable TV in each room",
      "Handicap-friendly bathrooms",
      "Walk-in showers",
      "High toilet seats",
      "Backyard and patio",
      "Smoke alarm in every room",
      "Medicaid or private pay accepted",
      "Welcoming to all cultures, ethnicities, and beliefs",
    ],
  },
] as const;

export const BROCHURE = {
  // Print-ready files live in /public and open in a new tab for "Save as PDF".
  brochureUrl: '/brochure.html',
  businessCardUrl: '/business-card.html',
}
