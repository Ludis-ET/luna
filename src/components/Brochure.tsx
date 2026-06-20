import { useState } from 'react'
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
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="brochure" className="section-pad bg-gradient-to-b from-cream via-cream to-lavender/20">
      <div className="container-max px-6">
        <SectionLabel number="04" label="Resources" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Take Luna Cottage <span className="text-brand">with you</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg">
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
            <div className="overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_80px_-30px_rgba(123,45,158,0.4)]">
              {/* document chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-charcoal/10 bg-cream/80 px-5 py-3 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-glow/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand/60" />
                  <span className="ml-2 hidden sm:inline">Luna Cottage Brochure</span>
                </div>
                <button
                  type="button"
                  onClick={() => printDocument(BROCHURE.brochureUrl)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-cream transition hover:bg-brand/90"
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45">
              Tap the card to flip
            </p>

            {/* flip stage */}
            <div className="perspective-1200 mx-auto w-full max-w-md">
              <button
                type="button"
                onClick={() => setFlipped((v) => !v)}
                aria-label="Flip business card"
                className="relative block aspect-[3.5/2] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <div
                  className={`transform-style-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    flipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT */}
                  <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-[#2e1447] p-5 text-[#faf7f2] shadow-[0_24px_60px_-20px_rgba(46,20,71,0.6)] border border-[#c5a880]/30">
                    <div className="absolute inset-2 pointer-events-none border border-[#c5a880]/30 rounded-xl" />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a880] bg-white/5 font-serif text-lg font-bold text-[#c5a880]">
                        L
                      </span>
                      <div>
                        <p className="font-serif text-base font-bold leading-none text-[#faf7f2]">Luna Cottage</p>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
                          Adult Family Home
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-serif text-base font-semibold text-[#faf7f2]">{SITE.owner}</p>
                    </div>
                    <p className="text-[9px] font-serif italic text-[#faf7f2]/80">Where care feels like home.</p>
                  </div>

                  {/* BACK */}
                  <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-center gap-1.5 overflow-hidden rounded-2xl border border-[#c5a880]/40 bg-[#faf7f2] p-4 shadow-[0_24px_60px_-20px_rgba(45,45,45,0.25)] sm:p-5">
                    <div className="absolute inset-2 pointer-events-none border border-[#c5a880]/25 rounded-xl" />
                    <p className="mb-0.5 font-serif text-[11px] font-bold uppercase tracking-wider text-[#2e1447] sm:text-xs">Get in touch</p>
                    <CardLine label="Call / Text" value={primaryPhone.number} />
                    {officePhone && <CardLine label="Office" value={officePhone.number} />}
                    <CardLine label="Fax" value={SITE.fax} />
                    <CardLine label="Email" value={SITE.email} />
                    <CardLine label="Address" value={SITE.address} compact />
                    <span className="mt-1 w-fit rounded bg-[#2e1447]/5 border border-[#2e1447]/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#2e1447]">
                      Private pay &amp; Medicaid
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* features */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFlipped((v) => !v)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand/20 bg-white/70 px-4 py-3 text-sm font-semibold text-brand transition hover:bg-white"
              >
                <QuickIcon d="M4 4v5h5M20 20v-5h-5M5 9a7 7 0 0112-3M19 15a7 7 0 01-12 3" />
                Flip card
              </button>
              <button
                type="button"
                onClick={downloadVCard}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand/20 bg-white/70 px-4 py-3 text-sm font-semibold text-brand transition hover:bg-white"
              >
                <QuickIcon d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM19 8v6M22 11h-6" />
                Save contact
              </button>
              <button
                type="button"
                onClick={() => printDocument(BROCHURE.businessCardUrl)}
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-cream shadow-brand transition hover:bg-brand/90"
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

function CardLine({ label, value, compact }: { label: string; value: string; compact?: boolean }) {
  return (
    <p className="flex items-baseline gap-2 text-[9px] leading-tight text-[#2d2d2d]/90 sm:text-[10px]">
      <span className="min-w-[48px] shrink-0 text-[7px] font-semibold uppercase tracking-wider text-[#2e1447] sm:min-w-[54px] sm:text-[8px]">{label}</span>
      <span className={`font-medium ${compact ? 'text-[8px] leading-snug sm:text-[9px]' : ''}`}>{value}</span>
    </p>
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
