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

/** Health services & daily care — aligned with comprehensive AFH offerings */
export const SERVICE_CATEGORIES = [
  {
    title: 'Health Services & Management',
    icon: '♥',
    items: [
      'RN case management and oversight',
      '24-hour care with day and night awake staff',
      'Individualized care plans — assessed on admission and reviewed annually',
      'Medication administration, supervision, and management',
      'In-home doctor and podiatrist visits',
      'Doctor appointments and coordination of transportation',
      'Documentation of glucose, blood pressure, and weight charting',
      'Diabetic management and insulin administration (nurse-delegated)',
      'Wound care, eye drops, injections, and catheter care',
      'Easy Call light alert system in every room',
      'Feeding assistance',
      'Bathing, dressing, and personal hygiene',
      'In-home beautician and grooming',
      'Housekeeping, personal laundry, and linen services',
      'Home-cooked meals and snacks — diets altered for special needs and favorite foods',
    ],
  },
  {
    title: 'We Specialize In',
    icon: '◆',
    items: [
      "Alzheimer's disease",
      'Arthritis',
      'Cardiac care',
      'Congestive heart failure',
      'Dementia',
      'Diabetes',
      'Home health oversight',
      'Hospice care',
      'Incontinence',
      'Mental health',
      'Oxygen therapy',
      'Parkinson\'s disease',
      'Stroke recovery',
      'Tube feeding',
      'Ostomy and ileostomy care',
      'Rehabilitation needs',
      'Specialized DDA services',
    ],
  },
  {
    title: 'Activities & Social Life',
    icon: '✦',
    items: [
      'Group socialization and daily event calendar',
      'In-home recreation — music, reading, games, and movies',
      'Living room with cable TV and shared common areas',
      'Educational, social, and cultural activities',
      'Fitness and well-being programs',
      'Birthday and holiday celebrations',
      'Outdoor walks and community outings',
      'Backyard gatherings and barbecues',
      'Exercises tailored to each resident\'s abilities',
    ],
  },
  {
    title: 'Amenities & Home Features',
    icon: '⌂',
    items: [
      'All private rooms',
      'Wheelchair and walker accessibility throughout',
      'Indoor common areas and large dining room for residents and guests',
      'Secure, safe surroundings in a quiet neighborhood',
      'Cable TV in living areas',
      'Handicap-friendly bathrooms',
      'Landscaped and well-maintained backyard and patio',
      'Freshly cooked meals for all diets and restrictions',
      'Welcoming to all cultures, ethnicities, and beliefs',
      'Male and female residents accepted',
      'Medicaid and private pay accepted',
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
