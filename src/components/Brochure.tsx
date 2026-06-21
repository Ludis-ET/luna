import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import {
  SITE,
  BROCHURE,
  ABOUT_PARAGRAPHS,
  PHILOSOPHY,
  MISSION,
  SERVICE_CATEGORIES,
} from '../data/content'
import { MEDIA } from '../data/media'

const primaryPhone = SITE.phones.find((p) => p.primary) ?? SITE.phones[0]
const officePhone = SITE.phones.find((p) => !p.primary)
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
const smsHref = (n: string) => `sms:${n.replace(/[^\d+]/g, '')}`

// Card palette as inline colors so the card always renders gold/cream text,
// independent of Tailwind class generation or a stale CSS cache.
const GOLD = '#C5A880'
const GOLD_90 = 'rgba(197,168,128,0.9)'
const GOLD_45 = 'rgba(197,168,128,0.45)'
const GOLD_30 = 'rgba(197,168,128,0.3)'
const CREAM = '#FAF7F2'

function downloadVCard() {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Awoke;Fitsum;;;RN, BSN',
    'FN:Fitsum Awoke, RN, BSN',
    'ORG:Luna Cottage Adult Family Home',
    `TEL;TYPE=CELL,VOICE:${primaryPhone.number}`,
    officePhone ? `TEL;TYPE=WORK,VOICE:${officePhone.number}` : '',
    `TEL;TYPE=FAX:${SITE.fax}`,
    `EMAIL;TYPE=INTERNET:${SITE.email}`,
    'ADR;TYPE=WORK:;;10524 23rd Dr SE;Everett;WA;98208;USA',
    `URL:https://${SITE.website}`,
    'END:VCARD',
  ].filter(Boolean)
  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Luna-Cottage-Fitsum-Awoke.vcf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function printDocument(url: string) {
  const frameId = 'print-frame-element'
  let iframe = document.getElementById(frameId) as HTMLIFrameElement | null
  if (iframe) {
    iframe.remove()
  }
  iframe = document.createElement('iframe')
  iframe.id = frameId
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.src = url
  
  document.body.appendChild(iframe)
  
  iframe.onload = () => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }
  }
}

const QuickIcon = ({ d }: { d: string }) => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

export default function Brochure() {
  return (
    <section id="brochure" className="section-pad bg-gradient-to-b from-cream via-cream to-lavender/20">
      <div className="container-max px-4 sm:px-6">
        <SectionLabel number="04" label="Resources" />
        <h2 className="section-title">
          Take Luna Cottage <span className="text-brand">with you</span>
        </h2>
        <p className="section-lead max-w-2xl">
          Browse our full brochure below, and save our card to your phone in a tap. Everything is
          ready to download, print, or share.
        </p>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-5 lg:items-start lg:gap-8">
          {/* ============ BROCHURE: long, inline, scrollable document ============ */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="min-w-0 lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_30px_80px_-30px_rgba(46,20,71,0.35)] sm:rounded-3xl">
              <div className="flex flex-col gap-2 border-b border-gold/20 bg-cream/80 px-3 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-plum/70 sm:text-sm">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold/80" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-plum/60" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold/50" />
                  <span className="ml-1 truncate sm:ml-2">Luna Cottage Brochure</span>
                </div>
                <button
                  type="button"
                  onClick={() => printDocument(BROCHURE.brochureUrl)}
                  className="btn-primary w-full shrink-0 justify-center px-5 py-2 text-sm sm:w-auto"
                >
                  <QuickIcon d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  Download
                </button>
              </div>

              <div
                data-lenis-prevent
                className="h-[min(560px,62vh)] overflow-y-auto overscroll-contain sm:h-[min(620px,68vh)] md:h-[72vh]"
              >
                <BrochureDocument />
              </div>
            </div>
          </motion.div>

          {/* ============ BUSINESS CARD ============ */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="min-w-0 lg:col-span-2 lg:sticky lg:top-28"
          >
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-plum/50 sm:text-left">
              Our business card
            </p>

            <div className="mx-auto w-full max-w-md">
              <div
                className="relative overflow-hidden rounded-xl font-outfit shadow-[0_30px_70px_-20px_rgba(46,20,71,0.55)] sm:rounded-2xl"
                style={{
                  color: GOLD,
                  background:
                    'radial-gradient(120% 85% at 62% -12%, rgba(197,168,128,0.16) 0%, transparent 52%), linear-gradient(145deg, #371a52 0%, #2e1447 46%, #25103a 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-2 z-10 rounded-lg sm:inset-3 sm:rounded-[10px]"
                  style={{ border: `1px solid ${GOLD}` }}
                >
                  <div className="absolute inset-1 rounded-md sm:rounded-[7px]" style={{ border: `1px solid ${GOLD_45}` }} />
                </div>

                <div className="relative z-[4] flex flex-col sm:flex-row">
                  <div
                    className="flex flex-col justify-between gap-5 border-b px-5 py-6 sm:flex-[0_0_45%] sm:gap-6 sm:border-b-0 sm:border-r sm:py-7 sm:pl-6 sm:pr-4"
                    style={{ borderColor: GOLD_30 }}
                  >
                    <div>
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full font-cormorant text-xl font-semibold sm:h-12 sm:w-12 sm:text-2xl"
                        style={{ color: GOLD, border: `1px solid ${GOLD}`, background: 'rgba(255,255,255,0.05)' }}
                      >
                        L
                      </span>
                      <p className="mt-3 font-cormorant text-[22px] font-bold leading-none sm:mt-3.5 sm:text-[26px]" style={{ color: GOLD }}>
                        Luna Cottage
                      </p>
                      <p
                        className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.22em] sm:mt-2 sm:text-[9px] sm:tracking-[0.25em]"
                        style={{ color: GOLD }}
                      >
                        Adult Family Home
                      </p>
                    </div>
                    <div>
                      <p className="font-cormorant text-lg font-semibold leading-tight sm:text-xl" style={{ color: CREAM }}>
                        {SITE.owner}
                      </p>
                      <p className="mt-2 font-cormorant text-xs italic sm:mt-2.5 sm:text-[13px]" style={{ color: GOLD_90 }}>
                        Where care feels like home.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-5 sm:gap-2.5 sm:py-7 sm:pl-5 sm:pr-6">
                    <div className="relative pb-2">
                      <p className="font-cormorant text-base font-semibold sm:text-lg" style={{ color: GOLD }}>
                        Get in touch
                      </p>
                      <span
                        className="absolute bottom-0 left-0 h-px w-full"
                        style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_30})` }}
                      />
                    </div>
                    <CardRow label="Call or Text" value={primaryPhone.number}>
                      <Svg><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.97.757l.9 3.6a1 1 0 01-.29.96l-1.5 1.5a14 14 0 006.3 6.3l1.5-1.5a1 1 0 01.96-.29l3.6.9A1 1 0 0121 17.7V20a2 2 0 01-2 2A16 16 0 013 5z" /></Svg>
                    </CardRow>
                    {officePhone && (
                      <CardRow label="Office" value={officePhone.number}>
                        <Svg><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 4l9 5.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" /></Svg>
                      </CardRow>
                    )}
                    <CardRow label="Fax" value={SITE.fax}>
                      <Svg><path strokeLinecap="round" strokeLinejoin="round" d="M7 9V3h10v6M7 19H5a2 2 0 01-2-2v-3a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2h-2M7 15h10v6H7z" /></Svg>
                    </CardRow>
                    <CardRow label="Email" value={SITE.email}>
                      <Svg><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /></Svg>
                    </CardRow>
                    <CardRow label="Address" value={SITE.address}>
                      <Svg><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>
                    </CardRow>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={downloadVCard}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/30 bg-white/70 px-5 py-3.5 text-base font-semibold text-plum transition hover:bg-white"
              >
                <QuickIcon d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM19 8v6M22 11h-6" />
                Save contact
              </button>
              <button
                type="button"
                onClick={() => printDocument(BROCHURE.businessCardUrl)}
                className="btn-primary justify-center py-3.5"
              >
                <QuickIcon d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                Download card
              </button>
            </div>

            {/* quick actions */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <QuickAction href={telHref(primaryPhone.number)} label="Call" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.97.757l.9 3.6a1 1 0 01-.29.96l-1.5 1.5a14 14 0 006.3 6.3l1.5-1.5a1 1 0 01.96-.29l3.6.9A1 1 0 0121 17.7V20a2 2 0 01-2 2A16 16 0 013 5z" />
              <QuickAction href={smsHref(primaryPhone.number)} label="Text" d="M21 11.5a8.5 8.5 0 01-12.6 7.4L3 20l1.1-5.4A8.5 8.5 0 1121 11.5z" />
              <QuickAction href={`mailto:${SITE.email}`} label="Email" d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Svg = ({ children }: { children: ReactNode }) => (
  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    {children}
  </svg>
)

function CardRow({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 sm:gap-2.5">
      <span className="mt-0.5 w-3.5 shrink-0 sm:mt-[3px] sm:w-4" style={{ color: GOLD }}>
        {children}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[7px] font-semibold uppercase tracking-[0.12em] sm:text-[8px] sm:tracking-[0.14em]" style={{ color: GOLD }}>
          {label}
        </span>
        <span className="block break-words text-xs font-semibold sm:text-[13px]" style={{ color: CREAM }}>
          {value}
        </span>
      </span>
    </div>
  )
}

function QuickAction({ href, label, d }: { href: string; label: string; d: string }) {
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/15 bg-white/70 text-brand transition hover:bg-brand hover:text-cream"
    >
      <QuickIcon d={d} />
    </a>
  )
}

/* ---------- The long inline brochure document ---------- */
function BrochureDocument() {
  return (
    <article className="relative bg-[#faf7f2] p-3 text-[#2d2d2d] sm:p-5 md:p-6">
      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#c5a880]/40 sm:inset-2 sm:rounded-2xl" />
      <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-[#c5a880]/20 sm:inset-3 sm:rounded-2xl" />

      <div className="relative z-10 space-y-5 sm:space-y-6">
        <div className="relative h-44 overflow-hidden rounded-lg border border-[#c5a880]/30 sm:h-56 sm:rounded-xl md:h-64">
          <img src={MEDIA.dayExterior} alt="Luna Cottage exterior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e1447]/95 via-[#2e1447]/60 to-[#2e1447]/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-[#faf7f2] sm:p-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c5a880] bg-white/10 font-serif text-base font-bold text-[#c5a880] sm:h-10 sm:w-10 sm:text-lg">
                L
              </span>
              <div className="min-w-0">
                <p className="truncate font-serif text-base font-bold leading-none sm:text-lg">Luna Cottage</p>
                <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#c5a880] sm:text-[8px] sm:tracking-[0.2em]">
                  Adult Family Home
                </p>
              </div>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold italic leading-tight text-[#faf7f2] sm:text-xl md:text-2xl">
                Where care feels like home.
              </p>
              <p className="mt-1.5 max-w-md border-l border-[#c5a880] pl-2 text-[10px] font-light text-[#faf7f2]/85 sm:mt-2 sm:text-xs">
                A licensed, RN-owned adult family home in a peaceful South Everett neighborhood.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-[#c5a880]/50 bg-[#2e1447] px-3 py-2.5 text-[10px] text-[#faf7f2] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1.5 sm:px-4 sm:text-[11px]">
          <span className="break-words"><span className="mr-1 text-[8px] font-semibold uppercase tracking-wider text-[#c5a880] sm:text-[9px]">Owner:</span>{SITE.owner}</span>
          <span><span className="mr-1 text-[8px] font-semibold uppercase tracking-wider text-[#c5a880] sm:text-[9px]">Call/Text:</span>{primaryPhone.number}</span>
          {officePhone && <span><span className="mr-1 text-[8px] font-semibold uppercase tracking-wider text-[#c5a880] sm:text-[9px]">Office:</span>{officePhone.number}</span>}
          <span><span className="mr-1 text-[8px] font-semibold uppercase tracking-wider text-[#c5a880] sm:text-[9px]">Fax:</span>{SITE.fax}</span>
        </div>

        <div className="space-y-5 px-0.5 sm:space-y-6 sm:px-1">
          <section>
            <p className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#c5a880] sm:text-[9px] sm:tracking-[0.25em]">
              Welcome <span className="h-[1px] w-6 bg-[#c5a880] sm:w-8" />
            </p>
            <h3 className="mt-1.5 font-serif text-lg font-bold text-[#2e1447] sm:text-xl">A home built on compassion</h3>
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <p key={i} className="mt-2 text-[11px] leading-relaxed text-[#2d2d2d]/85 sm:mt-2.5 sm:text-xs">{p}</p>
            ))}
          </section>

          <blockquote className="relative rounded-r-lg border-l-[3px] border-[#c5a880] bg-[#c5a880]/8 p-3 sm:rounded-r-xl sm:p-4">
            <span className="absolute left-2 top-0 select-none font-serif text-3xl text-[#c5a880]/30 sm:text-4xl">“</span>
            <p className="relative z-10 pl-2 font-serif text-xs italic leading-relaxed text-[#2e1447] sm:text-sm">
              {MISSION}
            </p>
          </blockquote>

          <section>
            <h4 className="font-serif text-xs font-semibold italic text-[#58217a] sm:text-sm">Our philosophy of care</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-[#2d2d2d]/85 sm:text-xs">{PHILOSOPHY}</p>
          </section>

          <section>
            <p className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#c5a880] sm:text-[9px] sm:tracking-[0.25em]">
              Services &amp; care <span className="h-[1px] w-6 bg-[#c5a880] sm:w-8" />
            </p>
            <h3 className="mt-1.5 font-serif text-lg font-bold text-[#2e1447] sm:text-xl">What we provide</h3>
            <div className="mt-3 space-y-4 sm:mt-4 sm:space-y-5">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.title} className="border-t border-[#c5a880]/15 pt-3 first:border-0 first:pt-0">
                  <div className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#2e1447]/10 text-xs text-[#2e1447]">
                      {cat.icon}
                    </span>
                    <h4 className="font-serif text-xs font-semibold leading-snug text-[#2e1447] sm:text-sm">{cat.title}</h4>
                  </div>
                  <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li key={item} className="relative pl-3.5 text-[10px] leading-snug text-[#2d2d2d]/80 sm:text-[11px]">
                        <span className="absolute left-0 top-1.5 text-[6px] text-[#c5a880]">◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-lg border border-[#c5a880]/70 bg-[#2e1447] p-4 text-[#faf7f2] sm:rounded-xl sm:p-5">
            <div className="pointer-events-none absolute inset-1 rounded-md border border-[#c5a880]/30 sm:rounded-lg" />
            <h3 className="text-center font-serif text-base font-bold text-[#c5a880] sm:text-lg">Schedule a visit</h3>
            <p className="mt-1 text-center text-[10px] font-light text-[#faf7f2]/85 sm:text-[11px]">
              We would welcome the opportunity to earn your trust and show you the best care in the industry.
            </p>
            <div className="relative z-10 mt-3 grid grid-cols-1 gap-2.5 text-[10px] sm:mt-4 sm:grid-cols-2 sm:gap-3 sm:text-[11px]">
              <div>
                <p className="text-[8px] uppercase tracking-wider text-[#c5a880] font-semibold">Call or Text</p>
                <p className="font-medium">{primaryPhone.number}</p>
              </div>
              {officePhone && (
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-[#c5a880] font-semibold">Office</p>
                  <p className="font-medium">{officePhone.number}</p>
                </div>
              )}
              <div>
                <p className="text-[8px] uppercase tracking-wider text-[#c5a880] font-semibold">Fax</p>
                <p className="font-medium">{SITE.fax}</p>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-wider text-[#c5a880] font-semibold">Email</p>
                <p className="font-medium break-all">{SITE.email}</p>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-wider text-[#c5a880] font-semibold">Address</p>
                <p className="font-medium">10524 23rd Dr SE, Everett, WA 98208</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
