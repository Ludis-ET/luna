import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

type Props = {
  src: string
  poster?: string
  title?: string
  className?: string
}

export default function VideoPlayer({ src, poster, title = 'Property tour', className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [pipSupported, setPipSupported] = useState(false)

  useEffect(() => {
    setPipSupported(!!document.pictureInPictureEnabled)
  }, [])

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (playing && !scrubbing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 2800)
    }
  }, [playing, scrubbing])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setHasStarted(true)
    } else {
      v.pause()
    }
  }, [])

  const seekTo = useCallback((ratio: number) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const t = Math.max(0, Math.min(1, ratio)) * v.duration
    v.currentTime = t
    setProgress(t / v.duration)
    setCurrentTime(t)
  }, [])

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const bar = progressRef.current
      if (!bar) return
      const rect = bar.getBoundingClientRect()
      seekTo((clientX - rect.left) / rect.width)
    },
    [seekTo],
  )

  const skip = useCallback((delta: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + delta))
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const changeVolume = useCallback((value: number) => {
    const v = videoRef.current
    if (!v) return
    const vol = Math.max(0, Math.min(1, value))
    v.volume = vol
    v.muted = vol === 0
    setVolume(vol)
    setMuted(vol === 0)
  }, [])

  const changeSpeed = useCallback((rate: number) => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = rate
    setSpeed(rate)
    setSpeedOpen(false)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
      setFullscreen(true)
    } else {
      await document.exitFullscreen()
      setFullscreen(false)
    }
  }, [])

  const togglePiP = useCallback(async () => {
    const v = videoRef.current
    if (!v || !document.pictureInPictureEnabled) return
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
    } else {
      await v.requestPictureInPicture()
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onPlay = () => { setPlaying(true); setLoading(false); resetHideTimer() }
    const onPause = () => { setPlaying(false); setShowControls(true) }
    const onTimeUpdate = () => {
      if (!scrubbing && v.duration) {
        setCurrentTime(v.currentTime)
        setProgress(v.currentTime / v.duration)
      }
    }
    const onLoadedMetadata = () => setDuration(v.duration)
    const onWaiting = () => setLoading(true)
    const onCanPlay = () => setLoading(false)
    const onProgress = () => {
      if (v.buffered.length > 0 && v.duration) {
        setBuffered(v.buffered.end(v.buffered.length - 1) / v.duration)
      }
    }
    const onEnded = () => { setPlaying(false); setShowControls(true) }

    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('loadedmetadata', onLoadedMetadata)
    v.addEventListener('waiting', onWaiting)
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('progress', onProgress)
    v.addEventListener('ended', onEnded)

    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('loadedmetadata', onLoadedMetadata)
      v.removeEventListener('waiting', onWaiting)
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('progress', onProgress)
      v.removeEventListener('ended', onEnded)
    }
  }, [resetHideTimer, scrubbing])

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay() }
    if (e.key === 'ArrowRight') { e.preventDefault(); skip(10) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); skip(-10) }
    if (e.key === 'ArrowUp') { e.preventDefault(); changeVolume(volume + 0.1) }
    if (e.key === 'ArrowDown') { e.preventDefault(); changeVolume(volume - 0.1) }
    if (e.key === 'm') toggleMute()
    if (e.key === 'f') void toggleFullscreen()
  }

  const onProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    seekFromClientX(e.clientX)
  }

  const onProgressPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setScrubbing(true)
    seekFromClientX(e.clientX)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onProgressPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (scrubbing) seekFromClientX(e.clientX)
  }

  const onProgressPointerUp = () => setScrubbing(false)

  const controlsVisible = showControls || !hasStarted

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label={`Video player: ${title}`}
      onKeyDown={onKeyDown}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
      onMouseLeave={() => playing && !scrubbing && setShowControls(false)}
      className={`group/player relative aspect-video w-full max-w-full overflow-hidden rounded-2xl bg-charcoal shadow-[0_24px_80px_-20px_rgba(123,45,158,0.35)] ring-1 ring-brand/15 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        onClick={togglePlay}
      />

      {/* Top gradient + title */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-charcoal/70 to-transparent px-3 pb-8 pt-3 transition-opacity duration-300 sm:px-5 sm:pb-10 sm:pt-4 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/50 sm:text-xs sm:tracking-[0.2em]">
          Virtual tour
        </p>
        <p className="mt-0.5 line-clamp-2 font-serif text-sm text-cream sm:mt-1 sm:text-lg">{title}</p>
      </div>

      {/* Center play overlay — flex center avoids transform offset bugs on mobile */}
      <AnimatePresence>
        {(!hasStarted || !playing) && !loading && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={togglePlay}
              className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream/95 text-brand shadow-[0_0_0_8px_rgba(250,246,238,0.25)] transition hover:scale-105 hover:bg-white sm:h-[4.5rem] sm:w-[4.5rem] sm:shadow-[0_0_0_12px_rgba(250,246,238,0.25)]"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-charcoal/30 backdrop-blur-[2px]"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls bar */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-transparent px-2 pb-2 pt-10 transition-opacity duration-300 sm:px-4 sm:pb-3 sm:pt-14 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress */}
        <div
          ref={progressRef}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="group/progress relative mb-2 h-2 cursor-pointer rounded-full bg-cream/20 sm:mb-3 sm:h-1.5"
          onClick={onProgressClick}
          onPointerDown={onProgressPointerDown}
          onPointerMove={onProgressPointerMove}
          onPointerUp={onProgressPointerUp}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-cream/25"
            style={{ width: `${buffered * 100}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-lavender"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-cream opacity-100 shadow-md transition sm:opacity-0 sm:group-hover/progress:opacity-100"
            style={{ left: `calc(${progress * 100}% - 7px)` }}
          />
        </div>

        {/* Row 1: primary controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ControlBtn label={playing ? 'Pause' : 'Play'} onClick={togglePlay} size="md">
            {playing ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </ControlBtn>

          <ControlBtn label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute} className="sm:hidden">
            {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </ControlBtn>

          <span className="hidden sm:inline-flex">
            <ControlBtn label="Rewind 10s" onClick={() => skip(-10)}>
              <SkipBackIcon />
            </ControlBtn>
          </span>

          <span className="hidden sm:inline-flex">
            <ControlBtn label="Forward 10s" onClick={() => skip(10)}>
              <SkipForwardIcon />
            </ControlBtn>
          </span>

          <span className="min-w-0 flex-1 truncate text-[10px] tabular-nums text-cream/70 sm:hidden">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="hidden items-center gap-2 sm:flex">
            <ControlBtn label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeOnIcon />}
            </ControlBtn>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="video-volume-slider w-16 accent-brand lg:w-20"
              aria-label="Volume"
            />
            <span className="min-w-[5.5rem] text-xs tabular-nums text-cream/70">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <div className="relative">
              <ControlBtn label="Playback speed" onClick={() => setSpeedOpen((v) => !v)}>
                <span className="text-[10px] font-semibold sm:text-xs">{speed === 1 ? '1×' : `${speed}×`}</span>
              </ControlBtn>
              <AnimatePresence>
                {speedOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute bottom-full right-0 z-30 mb-2 min-w-[5rem] overflow-hidden rounded-xl border border-cream/10 bg-charcoal/95 py-1 shadow-xl backdrop-blur-md"
                  >
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => changeSpeed(s)}
                        className={`block w-full px-4 py-2 text-left text-xs transition hover:bg-white/10 ${
                          speed === s ? 'text-glow' : 'text-cream/80'
                        }`}
                      >
                        {s}×
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {pipSupported && (
              <span className="hidden md:inline-flex">
                <ControlBtn label="Picture in picture" onClick={() => void togglePiP()}>
                  <PipIcon />
                </ControlBtn>
              </span>
            )}

            <ControlBtn label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={() => void toggleFullscreen()}>
              {fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </ControlBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlBtn({
  children,
  label,
  onClick,
  className = '',
  size = 'sm',
}: {
  children: ReactNode
  label: string
  onClick: () => void
  className?: string
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-lg text-cream/85 transition hover:bg-white/10 hover:text-cream ${
        size === 'md' ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-8 w-8 sm:h-9 sm:w-9'
      } ${className}`}
    >
      {children}
    </button>
  )
}

function VolumeOffIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M11 5L6 9H3v6h3l5 4V5zM19 9l-6 6M13 9l6 6" />
    </svg>
  )
}

function VolumeOnIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M11 5L6 9H3v6h3l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function SkipBackIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M12 6v6l4 2M3 12a9 9 0 1 0 3-6.7" />
    </svg>
  )
}

function SkipForwardIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M12 6v6l4 2M21 12a9 9 0 1 1-3-6.7" />
    </svg>
  )
}

function PipIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="11" y="11" width="8" height="6" rx="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M9 5H5v4M19 5h-4V5M5 19h4v-4M19 19v-4h-4" />
    </svg>
  )
}

function ExitFullscreenIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" d="M9 15H5v-4M19 9h-4V5M5 19h4v-4M19 15v4h-4" />
    </svg>
  )
}
