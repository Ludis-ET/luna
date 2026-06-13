export const SITE = {
  name: 'Luna Cottage',
  tagline: 'Adult Family Home',
  phones: ['206-398-9638', '425-337-9724'],
  fax: '425-357-1170',
  email: 'fitsum.awoke@lunacottageafh.com',
  address: '10524 23rd Dr SE, Everett, WA 98208',
  website: 'www.lunacottageafhinc.com',
} as const

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
] as const

export const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'services',
  'mission',
  'why-us',
  'gallery',
  'tour',
  'contact',
] as const

export const TRUST_STATS = [
  { value: '6', label: 'Private Rooms' },
  { value: 'RN', label: 'Owned & Operated' },
  { value: 'WA', label: 'South Everett' },
] as const

export const ABOUT_TEXT =
  'Luna Cottage Adult Family Home is a licensed, RN-owned and managed residence in the serene South Everett area — a six-bedroom, single-level home offering a bright, warm, and comforting atmosphere in a quiet residential neighborhood. We provide comprehensive senior care services, including advanced Dementia and Hospice care. A customized care plan is developed for each resident, considering their interests, preferences, and capabilities to provide the best assistance and support possible.'

export const ABOUT_EXTENDED =
  'Our residents enjoy a clean, thoughtfully designed home built for senior comfort living. Our spacious living rooms are designed for easy wheelchair and walker access. We are committed to creating an authentic atmosphere where residents feel right at home — irrespective of race, ethnicity, or religious beliefs. Small-setting senior care is a wonderful alternative to a nursing home or large assisted living facility. Luna Cottage is licensed by Washington State to care for up to six residents, with specialized expertise in Dementia, Mental Health, and DDA services, including nurse-delegated medication management and insulin administration.'

export const STAFF_TEXT =
  'We offer steady, consistent care from trained staff who meet all Washington State requirements — including CPR/First Aid, Mental Health and Dementia training, diabetes and insulin administration, and completed background and fingerprint checks. Our team continually further their education so your loved ones receive skilled, compassionate care and feel like part of our extended family.'

export const MISSION =
  'Creating a homely atmosphere, surpassing the cognitive and physical needs of each resident — with compassion, dignity, and respect.'

export const SERVICES_INTRO =
  'From daily living assistance to specialized clinical care — here is everything Luna Cottage provides for our residents and their families.'

export const EXPERIENCE_BEATS = [
  { text: 'Arrive with confidence', sub: 'A beautiful home in a quiet South Everett neighborhood' },
  { text: 'A place to call home', sub: 'Warm living spaces designed for comfort and accessibility' },
  { text: 'Meals cooked with love', sub: 'Fresh, home-cooked meals tailored to every diet' },
  { text: 'Nutrition for every need', sub: 'Open kitchen and dining with table service' },
  { text: 'Safe & serene — day and night', sub: 'Thoughtful lighting and a peaceful setting' },
  { text: '10524 — South Everett', sub: 'Your family\'s next chapter starts here' },
] as const

/** Health services & daily care — includes full Brightlight Care AFH service list */
export const SERVICE_CATEGORIES = [
  {
    title: 'Health Services & Management',
    icon: '♥',
    items: [
      'RN Case Management',
      '24-hour care — day and night awake staff',
      'Home cooked meals — dietary intake altered for special dietary needs or favorite foods',
      'Individual care plans',
      'Medication administration, supervision and management',
      'Doctor appointments and coordination of transportation',
      'Documentation of resident glucose, blood pressure and weight charting',
      'Call buttons in every room',
      'Feeding assistance',
      'Bathing and dressing',
      'Personal hygiene and grooming',
      'Housekeeping / laundry',
      'In-home doctor and podiatrist visits',
      'Diabetic management and insulin administration (nurse-delegated)',
      'Wound care, eye drops, injections, and catheter care',
    ],
  },
  {
    title: 'We Specialize In',
    icon: '◆',
    items: [
      "Alzheimer's",
      'Cardiac',
      'Dementia',
      'Diabetes',
      'Home Health oversight',
      'Hospice Care',
      'Incontinence',
      "Parkinson's",
      'Stroke',
      'Arthritis',
      'Congestive Heart Failure',
      'Mental Health',
      'Oxygen Therapy',
      'Tube Feeding',
      'Ostomy',
      'Ileostomy',
      'Rehab Needs',
      'Specialized DDA services',
    ],
  },
  {
    title: 'Activities',
    icon: '✦',
    items: [
      'Group socialization',
      'In-home recreational activities — music, reading, games, movies',
      'Family room/library with music system, CDs, records, and cassette tape for music and books on tape/CD',
      'Birthday and holiday celebrations',
      'Outdoor walks',
      'Barbeques',
      'Educational, social, and cultural activities',
      'Fitness and well-being programs',
      'Exercises tailored to each resident\'s abilities',
    ],
  },
  {
    title: 'Amenities',
    icon: '⌂',
    items: [
      'Private or semi-private rooms with semi-private bathroom',
      'Wheel-chair and walker access',
      'Indoor common areas',
      'Secure, safe surroundings',
      'Cable TV in each room',
      'Handicap-friendly bathrooms',
      'Walk-in showers',
      'High toilet seats',
      'Backyard and patio',
      'Smoke alarm in every room',
      'Male or female accepted',
      'Medicaid or private pay accepted',
      'Large dining room for residents and guests',
      'Welcoming to all cultures, ethnicities, and beliefs',
    ],
  },
] as const

export const WHY_US = [
  'RN-owned and operated with geriatric expertise',
  'All private rooms in a six-resident home',
  '24-hour awake staff — day and night',
  'Individualized care plans for every resident',
  'Wheelchair and walker accessible throughout',
  'Handicap-friendly bathrooms and easy call alerts',
  'Large dining room with home-cooked, diet-specific meals',
  'Living room with cable TV and indoor common areas',
  'Landscaped backyard and patio',
  'Specialized Dementia, Hospice, and Mental Health care',
  'In-home doctor visits and medication management',
  'Daily activities, outings, and social programs',
  'Welcoming to all cultures, ethnicities, and beliefs',
  'Medicaid and private pay accepted',
] as const
