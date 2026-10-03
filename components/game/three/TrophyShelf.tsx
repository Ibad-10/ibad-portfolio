"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = { gold: "#E6B84C", silver: "#C3CBD9", bronze: "#B87333" } as const;

function Cup({
  x,
  tier,
  active,
  onActive,
}: {
  x: number;
  tier: keyof typeof COLORS;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const profile = useMemo(
    () =>
      [
        [0.001, 0], [0.55, 0], [0.55, 0.12], [0.14, 0.28], [0.14, 0.95],
        [0.5, 1.15], [0.7, 1.8], [0.6, 1.9], [0.001, 1.4],
      ].map(([px, py]) => new THREE.Vector2(px, py)),
    [],
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (active ? 1.8 : 0.45);
    const target = active ? 1.14 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
  });
  return (
    <group ref={ref} position={[x, 0, 0]} onPointerOver={onActive} onClick={onActive}>
      <mesh>
        <latheGeometry args={[profile, 32]} />
        <meshStandardMaterial color={COLORS[tier]} metalness={0.95} roughness={0.22} emissive={COLORS[tier]} emissiveIntensity={active ? 0.35 : 0.08} />
      </mesh>
      {/* handles */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.78, 1.45, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.22, 0.05, 12, 24]} />
          <meshStandardMaterial color={COLORS[tier]} metalness={0.95} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function TrophyShelf({
  tiers,
  active,
  onActive,
}: {
  tiers: (keyof typeof COLORS)[];
  active: number;
  onActive: (i: number) => void;
}) {
  const spacing = 2.4;
  const start = -((tiers.length - 1) * spacing) / 2;
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 38, position: [0, 1.3, 8.6] }} aria-hidden="true">
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[-5, 2, 3]} intensity={25} color="#6ea0ff" />
      <group position={[0, -1.2, 0]}>
        {tiers.map((tier, i) => (
          <Cup key={i} x={start + i * spacing} tier={tier} active={active === i} onActive={() => onActive(i)} />
        ))}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[tiers.length * spacing + 1, 0.2, 2]} />
          <meshStandardMaterial color="#17264a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
    </Canvas>
  );
}
