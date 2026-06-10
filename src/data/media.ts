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

export const GALLERY_IMAGES = [
  { src: MEDIA.dayExterior, alt: 'Day exterior of Luna Cottage', tag: 'Exterior' },
  { src: MEDIA.nightWide, alt: 'Night exterior with garden lighting', tag: 'Exterior' },
  { src: MEDIA.nightGarage, alt: 'Front elevation at night', tag: 'Exterior' },
  { src: MEDIA.nightPath, alt: 'Garden path with warm lights', tag: 'Exterior' },
  { src: MEDIA.livingRoom, alt: 'Living room with fireplace', tag: 'Living' },
  { src: MEDIA.dining, alt: 'Dining room and kitchen', tag: 'Dining' },
  { src: MEDIA.kitchen, alt: 'Open kitchen and dining area', tag: 'Dining' },
] as const

export type GalleryTag = (typeof GALLERY_IMAGES)[number]['tag']
