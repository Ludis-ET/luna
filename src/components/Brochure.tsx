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
      <div className="container-max px-6">
        <SectionLabel number="04" label="Resources" />
        <h2 className="section-title">
          Take Luna Cottage <span className="text-brand">with you</span>
        </h2>
        <p className="section-lead max-w-2xl">
          Browse our full brochure below, and save our card to your phone in a tap. Everything is
          ready to download, print, or share.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:items-start">
          {/* ============ BROCHURE: long, inline, scrollable document ============ */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-3xl border border-gold/25 bg-white shadow-[0_30px_80px_-30px_rgba(46,20,71,0.35)]">
              {/* document chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-gold/20 bg-cream/80 px-5 py-3 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-plum/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-plum/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/50" />
                  <span className="ml-2 hidden sm:inline">Luna Cottage Brochure</span>
                </div>
                <button
                  type="button"
                  onClick={() => printDocument(BROCHURE.brochureUrl)}
                  className="btn-primary px-5 py-2 text-sm"
                >
                  <QuickIcon d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  Download
                </button>
              </div>

              {/* the long page (data-lenis-prevent lets it scroll natively inside smooth-scroll) */}
              <div data-lenis-prevent className="h-[560px] overflow-y-auto md:h-[72vh]">
                <BrochureDocument />
              </div>
            </div>
          </motion.div>

          {/* ============ BUSINESS CARD: flippable + downloadable ============ */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-plum/50">
              Our business card
            </p>

            {/* static business card: matches the printable PDF exactly */}
            <div className="mx-auto w-full max-w-md">
              <div
                className="relative overflow-hidden rounded-2xl font-outfit shadow-[0_30px_70px_-20px_rgba(46,20,71,0.55)]"
                style={{
                  color: GOLD,
                  background:
                    'radial-gradient(120% 85% at 62% -12%, rgba(197,168,128,0.16) 0%, transparent 52%), linear-gradient(145deg, #371a52 0%, #2e1447 46%, #25103a 100%)',
                }}
              >
                {/* double gold frame */}
                <div
                  className="pointer-events-none absolute inset-3 z-10 rounded-[10px]"
                  style={{ border: `1px solid ${GOLD}` }}
                >
                  <div className="absolute inset-1 rounded-[7px]" style={{ border: `1px solid ${GOLD_45}` }} />
                </div>

                <div className="relative z-[4] flex">
                  {/* brand side */}
                  <div
                    className="flex flex-[0_0_45%] flex-col justify-between gap-6 py-7 pl-6 pr-4"
                    style={{ borderRight: `1px solid ${GOLD_30}` }}
                  >
                    <div>
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full font-cormorant text-2xl font-semibold"
                        style={{ color: GOLD, border: `1px solid ${GOLD}`, background: 'rgba(255,255,255,0.05)' }}
                      >
                        L
                      </span>
                      <p className="mt-3.5 font-cormorant text-[26px] font-bold leading-none" style={{ color: GOLD }}>
                        Luna Cottage
                      </p>
                      <p
                        className="mt-2 text-[9px] font-medium uppercase tracking-[0.25em]"
                        style={{ color: GOLD }}
                      >
                        Adult Family Home
                      </p>
                    </div>
                    <div>
                      <p className="font-cormorant text-xl font-semibold leading-tight" style={{ color: CREAM }}>
                        {SITE.owner}
                      </p>
                      <p className="mt-2.5 font-cormorant text-[13px] italic" style={{ color: GOLD_90 }}>
                        Where care feels like home.
                      </p>
                    </div>
                  </div>

                  {/* info side */}
                  <div className="flex flex-1 flex-col justify-center gap-2.5 py-7 pl-5 pr-6">
                    <div className="relative pb-2">
                      <p className="font-cormorant text-lg font-semibold" style={{ color: GOLD }}>
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

            {/* features */}
            <div className="mt-5 grid grid-cols-2 gap-3">
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
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    {children}
  </svg>
)

function CardRow({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-[3px] w-4 shrink-0" style={{ color: GOLD }}>
        {children}
      </span>
      <span className="leading-tight">
        <span className="block text-[8px] font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
          {label}
        </span>
        <span className="block break-words text-[13px] font-semibold" style={{ color: CREAM }}>
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
    <article className="relative bg-[#faf7f2] p-4 text-[#2d2d2d] md:p-6">
      {/* Decorative double border simulating print brochure */}
      <div className="absolute inset-2 pointer-events-none border border-[#c5a880]/40 rounded-2xl" />
      <div className="absolute inset-3 pointer-events-none border border-[#c5a880]/20 rounded-2xl" />

      <div className="relative z-10 space-y-6">
        {/* cover */}
        <div className="relative h-64 overflow-hidden rounded-xl border border-[#c5a880]/30">
          <img src={MEDIA.dayExterior} alt="Luna Cottage exterior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e1447]/95 via-[#2e1447]/60 to-[#2e1447]/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-[#faf7f2]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a880] bg-white/10 font-serif text-lg font-bold text-[#c5a880]">
                L
              </span>
              <div>
                <p className="font-serif text-lg font-bold leading-none">Luna Cottage</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">Adult Family Home</p>
              </div>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold italic leading-tight text-[#faf7f2]">Where care feels like home.</p>
              <p className="mt-2 max-w-md text-xs text-[#faf7f2]/85 font-light border-l border-[#c5a880] pl-2">
                A licensed, RN-owned adult family home in a peaceful South Everett neighborhood.
              </p>
            </div>
          </div>
        </div>

        {/* contact strip */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 rounded-lg bg-[#2e1447] border border-[#c5a880]/50 px-4 py-2.5 text-[11px] text-[#faf7f2]">
          <span><span className="font-semibold text-[#c5a880] uppercase tracking-wider text-[9px] mr-1">Owner:</span>{SITE.owner}</span>
          <span><span className="font-semibold text-[#c5a880] uppercase tracking-wider text-[9px] mr-1">Call/Text:</span>{primaryPhone.number}</span>
          {officePhone && <span><span className="font-semibold text-[#c5a880] uppercase tracking-wider text-[9px] mr-1">Office:</span>{officePhone.number}</span>}
          <span><span className="font-semibold text-[#c5a880] uppercase tracking-wider text-[9px] mr-1">Fax:</span>{SITE.fax}</span>
        </div>

        <div className="space-y-6 px-1">
          <section>
            <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
              Welcome <span className="h-[1px] w-8 bg-[#c5a880]" />
            </p>
            <h3 className="mt-1.5 font-serif text-xl font-bold text-[#2e1447]">A home built on compassion</h3>
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <p key={i} className="mt-2.5 text-xs leading-relaxed text-[#2d2d2d]/85">{p}</p>
            ))}
          </section>

          <blockquote className="relative rounded-r-xl border-l-3 border-[#c5a880] bg-[#c5a880]/8 p-4">
            <span className="absolute left-2 top-0 font-serif text-4xl text-[#c5a880]/30 select-none">“</span>
            <p className="relative z-10 pl-2 font-serif text-sm italic leading-relaxed text-[#2e1447]">
              {MISSION}
            </p>
          </blockquote>

          <section>
            <h4 className="font-serif text-sm font-semibold italic text-[#58217a]">Our philosophy of care</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#2d2d2d]/85">{PHILOSOPHY}</p>
          </section>

          <section>
            <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
              Services &amp; care <span className="h-[1px] w-8 bg-[#c5a880]" />
            </p>
            <h3 className="mt-1.5 font-serif text-xl font-bold text-[#2e1447]">What we provide</h3>
            <div className="mt-4 space-y-5">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.title} className="border-t border-[#c5a880]/15 pt-3 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2e1447]/10 text-xs text-[#2e1447]">
                      {cat.icon}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#2e1447]">{cat.title}</h4>
                  </div>
                  <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li key={item} className="relative pl-3.5 text-[11px] leading-snug text-[#2d2d2d]/80">
                        <span className="absolute left-0 top-1.5 text-[6px] text-[#c5a880]">◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl bg-[#2e1447] border border-[#c5a880]/70 p-5 text-[#faf7f2]">
            <div className="absolute inset-1 pointer-events-none border border-[#c5a880]/30 rounded-lg" />
            <h3 className="font-serif text-lg font-bold text-[#c5a880] text-center">Schedule a visit</h3>
            <p className="mt-1 text-center text-[11px] font-light text-[#faf7f2]/85">
              We would welcome the opportunity to earn your trust and show you the best care in the industry.
            </p>
            <div className="relative z-10 mt-4 grid grid-cols-2 gap-3 text-[11px]">
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
