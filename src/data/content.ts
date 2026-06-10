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
  'Luna Cottage Adult Family Home, situated in the serene South Everett area, is a six-bedroom single-level residence owned by an experienced Registered Nurse specializing in Geriatric care, Mental health services, and DDA. Our commitment is to offer a welcoming environment, irrespective of race, ethnicity, or religious beliefs. Our spacious living rooms are designed for easy wheelchair and walker access. Luna Cottage is dedicated to providing comprehensive and individualized care. Your loved ones will find comfort and care in our beautiful and quiet residential neighborhood.'

export const MISSION =
  'Creating a homely atmosphere, surpassing the cognitive and physical needs of each resident.'

export const EXPERIENCE_BEATS = [
  { text: 'Arrive with confidence', sub: 'A beautiful home in a quiet South Everett neighborhood' },
  { text: 'A place to call home', sub: 'Warm living spaces designed for comfort and accessibility' },
  { text: 'Meals cooked with love', sub: 'Fresh, home-cooked meals tailored to every diet' },
  { text: 'Nutrition for every need', sub: 'Open kitchen and dining with table service' },
  { text: 'Safe & serene — day and night', sub: 'Thoughtful lighting and a peaceful setting' },
  { text: '10524 — South Everett', sub: 'Your family\'s next chapter starts here' },
] as const

export const SERVICE_CATEGORIES = [
  {
    title: 'Medical & Health',
    icon: '♥',
    items: [
      'In-home doctor and podiatrist visits',
      'Diabetic management',
      'Medication management',
      'Wound care, eye drops, and injections',
      'Catheter & colostomy care',
      'Specialized Dementia & Hospice care',
      'Individualized care plan reviewed annually',
    ],
  },
  {
    title: 'Personal & Daily Living',
    icon: '⌂',
    items: [
      'All private rooms',
      'Housekeeping, laundry & linen services',
      'In-home beautician',
      'Handicap-friendly bathrooms',
      'Wheelchair & walker accessibility',
      'Easy Call light alert system',
      'Appointment scheduling',
    ],
  },
  {
    title: 'Nutrition & Activities',
    icon: '✦',
    items: [
      'Home-cooked meals & snacks for all diets',
      'Large dining room with table service',
      'Daily educational, social & cultural events',
      'Fitness and well-being programs',
      'Exercises, activities & community outings',
    ],
  },
] as const

export const WHY_US = [
  'All private rooms',
  'Wheelchair & walker accessible throughout',
  'Living room with cable TV',
  'Handicap-friendly bathrooms',
  'Large dining room for residents and guests',
  'Landscaped and well-maintained backyard',
  'Freshly cooked meals for all diets and restrictions',
  'Welcoming to all cultures, ethnicities, and beliefs',
] as const
