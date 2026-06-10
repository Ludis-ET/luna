import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import type { Points } from 'three'

function ParticleCloud() {
  const ref = useRef<Points>(null)
  const positions = useMemo(() => {
    const count = 400
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C8A8E9" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GlowOrbs() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[-3, 1, -2]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial color="#7B2D9E" transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[4, -0.5, -3]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#FFB84D" transparent opacity={0.08} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.6}>
        <mesh position={[0, 2, -4]}>
          <torusGeometry args={[1.5, 0.02, 16, 64]} />
          <meshBasicMaterial color="#D10056" transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  )
}

type Props = { className?: string }

export default function AmbientScene({ className = '' }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <Stars radius={80} depth={40} count={1200} factor={3} saturation={0.4} fade speed={0.5} />
        <ParticleCloud />
        <GlowOrbs />
      </Canvas>
    </div>
  )
}
