import { NAV_LINKS, SITE } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-brand/10 bg-charcoal py-12 text-cream/70">
      <div className="container-max grid gap-10 px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-brand font-serif text-xl font-bold text-white">
              L
            </div>
            <div>
              <p className="font-serif text-base font-semibold text-cream">Luna Cottage</p>
              <p className="text-xs uppercase tracking-widest text-gold">Adult Family Home</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed md:text-base">
            Compassionate, individualized elder care in South Everett, Washington.
          </p>
        </div>

        <div>
          <p className="label-gold mb-4">Navigate</p>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="text-sm transition hover:text-gold md:text-base">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="label-gold mb-4">Contact</p>
          <p className="text-sm md:text-base">{SITE.address}</p>
          {SITE.phones.map((p) => (
            <a
              key={p.number}
              href={`tel:${p.number.replace(/-/g, '')}`}
              className="mt-2 block text-sm hover:text-gold md:text-base"
            >
              {p.label}: {p.number}
            </a>
          ))}
          <a href={`mailto:${SITE.email}`} className="mt-2 block text-sm hover:text-gold md:text-base">
            {SITE.email}
          </a>
        </div>
      </div>

      <p className="container-max mt-10 px-6 text-center text-xs text-cream/40 md:text-sm">
        © {new Date().getFullYear()} Luna Cottage AFH. All rights reserved.
      </p>
    </footer>
  )
}
