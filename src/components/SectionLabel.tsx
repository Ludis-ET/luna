type Props = { number: string; label: string; light?: boolean }

export default function SectionLabel({ number, label, light = false }: Props) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className={`font-sans text-xs font-bold tracking-[0.25em] ${
          light ? 'text-glow' : 'text-brand'
        }`}
      >
        {number}
      </span>
      <span className={`h-px w-8 ${light ? 'bg-glow/50' : 'bg-brand/40'}`} />
      <span
        className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? 'text-cream/70' : 'text-charcoal/50'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
