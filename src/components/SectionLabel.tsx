type Props = { number: string; label: string; light?: boolean }

export default function SectionLabel({ number, label, light = false }: Props) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className={`font-sans text-sm font-bold tracking-[0.22em] ${
          light ? 'text-gold' : 'text-gold'
        }`}
      >
        {number}
      </span>
      <span className={`h-px w-10 ${light ? 'bg-gold/60' : 'bg-gold/50'}`} />
      <span
        className={`font-sans text-sm font-semibold uppercase tracking-[0.18em] ${
          light ? 'text-creamCard/75' : 'text-plum/60'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
