const asset = (name: string) => `/assets/${encodeURIComponent(name)}`

export const MEDIA = {
  video: asset('WhatsApp Video 2026-06-10 at 4.23.56 PM.mp4'),
  nightWide: asset('WhatsApp Image 2026-06-10 at 4.24.39 PM.jpeg'),
  nightPath: asset('WhatsApp Image 2026-06-10 at 4.24.40 PM.jpeg'),
  nightGarage: asset('WhatsApp Image 2026-06-10 at 4.24.40 PM (1).jpeg'),
  dayExterior: asset('WhatsApp Image 2026-06-10 at 4.24.41 PM.jpeg'),
  dining: asset('WhatsApp Image 2026-06-10 at 4.24.39 PM (1).jpeg'),
  kitchen: asset('WhatsApp Image 2026-06-10 at 4.24.39 PM (2).jpeg'),
  livingRoom: asset('WhatsApp Image 2026-06-10 at 4.24.40 PM (2).jpeg'),
} as const

// Gallery doubles as the resident experience: each image carries a short
// headline + caption so the walkthrough tells the story of a day at Luna Cottage.
export const GALLERY_IMAGES = [
  {
    src: MEDIA.dayExterior,
    tag: 'Exterior',
    title: 'Arrive with confidence',
    caption: 'A beautiful home in a quiet South Everett neighborhood',
    alt: 'Day exterior of Luna Cottage',
  },
  {
    src: MEDIA.livingRoom,
    tag: 'Living',
    title: 'A place to call home',
    caption: 'Warm living spaces designed for comfort and accessibility',
    alt: 'Living room with fireplace',
  },
  {
    src: MEDIA.dining,
    tag: 'Dining',
    title: 'Meals cooked with love',
    caption: 'Fresh, home-cooked meals tailored to every diet',
    alt: 'Dining room and kitchen',
  },
  {
    src: MEDIA.kitchen,
    tag: 'Dining',
    title: 'Nutrition for every need',
    caption: 'An open kitchen and dining area with table service',
    alt: 'Open kitchen and dining area',
  },
  {
    src: MEDIA.nightPath,
    tag: 'Exterior',
    title: 'Safe and serene, day and night',
    caption: 'Thoughtful lighting and a peaceful setting',
    alt: 'Garden path with warm lights',
  },
  {
    src: MEDIA.nightWide,
    tag: 'Exterior',
    title: 'Your next chapter starts here',
    caption: 'Warm garden lighting welcomes every visit',
    alt: 'Night exterior with garden lighting',
  },
  {
    src: MEDIA.nightGarage,
    tag: 'Exterior',
    title: 'Welcoming, every evening',
    caption: 'A bright, inviting front elevation',
    alt: 'Front elevation at night',
  },
] as const

export type GalleryTag = (typeof GALLERY_IMAGES)[number]['tag']
