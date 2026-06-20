import { useCallback, useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  type AnimationPlaybackControls,
} from 'framer-motion'
import SectionLabel from './SectionLabel'
import { ABOUT_PARAGRAPHS, PHILOSOPHY, VALUES, STAFF_TEXT, MISSION } from '../data/content'
import { MEDIA } from '../data/media'

type HangingCardProps = {
  label: string
  title: string
  children: ReactNode
  variant: 'dark' | 'light'
  monogram: string
  sway?: number
  stringLength?: number
  delay?: number
  className?: string
}

const MAX_SWING = 38

function HangingCard({
  label,
  title,
  children,
  variant,
  monogram,
  sway = 2.5,
  stringLength = 44,
  delay = 0,
  className = '',
}: HangingCardProps) {
  const isDark = variant === 'dark'
  const baseRotate = -sway * 0.45

  const pivotRef = useRef<HTMLDivElement>(null)
  const swingRef = useRef<HTMLDivElement>(null)
  const angle = useMotionValue(0)
  const idleAnim = useRef<AnimationPlaybackControls | null>(null)
  const releaseAnim = useRef<AnimationPlaybackControls | null>(null)
  const dragging = useRef(false)
  const grab = useRef({ x: 0, angle: 0 })
  const lastPointer = useRef({ angle: 0, t: 0 })
  const releaseVelocity = useRef(0)

  const clampAngle = useCallback(
    (value: number) => Math.max(-MAX_SWING, Math.min(MAX_SWING, value)),
    [],
  )

  const stopAllMotion = useCallback(() => {
    idleAnim.current?.stop()
    idleAnim.current = null
    releaseAnim.current?.stop()
    releaseAnim.current = null
    angle.stop()
  }, [angle])

  const startIdle = useCallback(() => {
    if (dragging.current) return
    stopAllMotion()
    idleAnim.current = animate(angle, [baseRotate, -baseRotate, baseRotate], {
      duration: 5.8 + delay * 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    })
  }, [angle, baseRotate, delay, stopAllMotion])

  useEffect(() => {
    startIdle()
    return () => stopAllMotion()
  }, [startIdle, stopAllMotion])

  useEffect(() => {
    const onWindowPointerMove = (e: globalThis.PointerEvent) => {
      if (!dragging.current) return
      e.preventDefault()
      const dx = e.clientX - grab.current.x
      const next = clampAngle(grab.current.angle - dx * 0.28)
      const now = performance.now()
      const dt = Math.max(now - lastPointer.current.t, 1)
      releaseVelocity.current = ((next - lastPointer.current.angle) / dt) * 1000
      angle.set(next)
      lastPointer.current = { angle: next, t: now }
    }

    const onWindowPointerUp = () => {
      if (!dragging.current) return
      dragging.current = false
      stopAllMotion()
      releaseAnim.current = animate(angle, 0, {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        mass: 0.75,
        velocity: releaseVelocity.current,
        onComplete: () => {
          if (!dragging.current) startIdle()
        },
      })
    }

    window.addEventListener('pointermove', onWindowPointerMove, { passive: false })
    window.addEventListener('pointerup', onWindowPointerUp)
    window.addEventListener('pointercancel', onWindowPointerUp)

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove)
      window.removeEventListener('pointerup', onWindowPointerUp)
      window.removeEventListener('pointercancel', onWindowPointerUp)
    }
  }, [angle, clampAngle, startIdle, stopAllMotion])

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      e.preventDefault()
      dragging.current = true
      stopAllMotion()
      const current = angle.get()
      grab.current = { x: e.clientX, angle: current }
      lastPointer.current = { angle: current, t: performance.now() }
      releaseVelocity.current = 0
      swingRef.current?.setPointerCapture(e.pointerId)
    },
    [angle, stopAllMotion],
  )

  const onPointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return
      dragging.current = false
      if (swingRef.current?.hasPointerCapture(e.pointerId)) {
        swingRef.current.releasePointerCapture(e.pointerId)
      }
      stopAllMotion()
      releaseAnim.current = animate(angle, 0, {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        mass: 0.75,
        velocity: releaseVelocity.current,
        onComplete: () => {
          if (!dragging.current) startIdle()
        },
      })
    },
    [angle, startIdle, stopAllMotion],
  )

  return (
    <motion.div
      className={`flex w-full max-w-[340px] flex-col items-center sm:max-w-sm ${className}`}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={pivotRef} className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-[#c5a880]/25 blur-sm" aria-hidden />
          <div className="relative h-3.5 w-3.5 rounded-full border-2 border-[#c5a880] bg-[#2e1447] shadow-[0_2px_8px_rgba(46,20,71,0.35)]" />
        </div>
      </div>

      <motion.div
        ref={swingRef}
        className="flex w-full origin-[top_center] touch-none select-none flex-col items-center"
        style={{ rotate: angle, willChange: 'transform' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="w-px bg-gradient-to-b from-[#c5a880] via-[#c5a880]/60 to-[#c5a880]/35"
          style={{ height: stringLength }}
          aria-hidden
        />

        <article
          className={`relative w-full cursor-grab overflow-hidden rounded-2xl p-6 active:cursor-grabbing sm:p-8 ${
            isDark
              ? 'border border-[#c5a880]/30 bg-[#2e1447] text-[#faf7f2] shadow-[0_32px_80px_-28px_rgba(46,20,71,0.7)]'
              : 'border border-[#c5a880]/40 bg-[#faf7f2] text-[#2e1447] shadow-[0_32px_80px_-28px_rgba(45,45,45,0.22)]'
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-2 rounded-xl border ${
              isDark ? 'border-[#c5a880]/25' : 'border-[#c5a880]/30'
            }`}
            aria-hidden
          />

          <div className="relative">
            <div className="mb-5 flex items-start gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-serif text-lg font-bold ${
                  isDark
                    ? 'border-[#c5a880] bg-white/5 text-[#c5a880]'
                    : 'border-[#2e1447]/15 bg-[#2e1447]/5 text-[#2e1447]'
                }`}
              >
                {monogram}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[0.24em] ${
                    isDark ? 'text-[#c5a880]' : 'text-brand'
                  }`}
                >
                  {label}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold leading-tight sm:text-2xl">{title}</h3>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed sm:text-[15px] sm:leading-relaxed ${
                isDark ? 'text-[#faf7f2]/88' : 'text-charcoal/78'
              }`}
            >
              {children}
            </p>

            <p
              className={`mt-6 border-t pt-4 font-serif text-[11px] italic ${
                isDark ? 'border-[#c5a880]/20 text-[#c5a880]/75' : 'border-[#2e1447]/10 text-brand/55'
              }`}
            >
              Where care feels like home.
            </p>
          </div>
        </article>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative bg-cream py-24 md:py-32">
      <div className="container-max px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="01" label="About" />
          <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
            A home built on <span className="text-brand">compassion</span>
          </h2>

          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base leading-relaxed text-charcoal/75 md:text-lg ${i === 0 ? 'mt-6' : 'mt-4'}`}
            >
              {paragraph}
            </p>
          ))}

          <p className="mt-8 text-sm italic text-charcoal/60 md:text-base">
            We would welcome the opportunity to earn your trust and show you the best care in the
            industry.
          </p>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(123,45,158,0.18)]">
            <img
              src={MEDIA.livingRoom}
              alt="Living room at Luna Cottage"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute -bottom-4 -left-4 rounded-xl border border-[#c5a880]/30 bg-[#2e1447] px-5 py-3.5 shadow-[0_16px_40px_-12px_rgba(46,20,71,0.45)]"
          >
            <p className="font-serif text-2xl font-bold text-[#c5a880]">6</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#faf7f2]/70">
              private rooms
            </p>
          </motion.div>
        </motion.div>
        </div>

        {/* Mission & philosophy — hanging from the About section */}
        <div className="relative -mt-2 pt-2 md:mt-0 md:pt-0">
          <div className="flex flex-col items-center justify-center gap-12 sm:gap-14 md:flex-row md:items-start md:justify-center md:gap-8 lg:gap-16">
            <HangingCard
              label="Our Mission"
              title="Care with purpose"
              variant="dark"
              monogram="M"
              sway={2.8}
              stringLength={40}
              delay={0.1}
              className="md:mt-2 lg:mt-4"
            >
              {MISSION}
            </HangingCard>

            <HangingCard
              label="Philosophy of Care"
              title="Person-centered always"
              variant="light"
              monogram="P"
              sway={-2.4}
              stringLength={52}
              delay={0.22}
              className="md:-mt-1"
            >
              {PHILOSOPHY}
            </HangingCard>
          </div>
        </div>
      </div>

      {/* Values & Approach */}
      <div className="container-max mt-16 px-6 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Values &amp; Approach</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            How we care, every day
          </h3>
        </motion.div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <motion.li
              key={value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-2xl border border-[#c5a880]/20 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:border-brand/25 hover:shadow-md"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c5a880]/40 bg-[#2e1447] text-[10px] font-bold text-[#c5a880]">
                ✓
              </span>
              <span className="text-sm leading-snug text-charcoal/80 md:text-base">{value}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Our Staff */}
      <div className="container-max mt-16 px-6 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#c5a880]/25 bg-[#2e1447] p-8 text-[#faf7f2] shadow-[0_28px_70px_-24px_rgba(46,20,71,0.55)] md:p-12"
        >
          <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#c5a880]/20" aria-hidden />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c5a880]">Our Staff</p>
            <h3 className="mt-2 max-w-2xl font-serif text-2xl font-semibold md:text-3xl">
              Trained, trusted, and always learning
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-[#faf7f2]/80">{STAFF_TEXT}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
