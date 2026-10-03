"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const LENGTH = 52;

function Rig({ duration }: { duration: number }) {
  const { camera } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    const p = Math.min(t.current / duration, 1);
    const eased = p * p * (3 - 2 * p);
    camera.position.set(Math.sin(t.current * 3) * 0.04, 0.05 + Math.sin(t.current * 6) * 0.03, -eased * (LENGTH - 6));
    camera.lookAt(0, 0, camera.position.z - 10);
  });
  return null;
}

function Tunnel() {
  const strips = useMemo(() => Array.from({ length: 14 }, (_, i) => -4 - i * 3.6), []);
  return (
    <group>
      {/* walls, floor, ceiling */}
      <mesh position={[-3, 0, -LENGTH / 2]}>
        <boxGeometry args={[0.2, 4.4, LENGTH]} />
        <meshStandardMaterial color="#1b2a4d" roughness={0.8} />
      </mesh>
      <mesh position={[3, 0, -LENGTH / 2]}>
        <boxGeometry args={[0.2, 4.4, LENGTH]} />
        <meshStandardMaterial color="#1b2a4d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, -LENGTH / 2]}>
        <boxGeometry args={[6.2, 0.2, LENGTH]} />
        <meshStandardMaterial color="#121c36" roughness={0.9} />
      </mesh>
      <mesh position={[0, -2.2, -LENGTH / 2]}>
        <boxGeometry args={[6.2, 0.2, LENGTH]} />
        <meshStandardMaterial color="#17264a" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* light strips */}
      {strips.map((z) => (
        <group key={z}>
          <mesh position={[-2.85, 1.9, z]}>
            <boxGeometry args={[0.06, 0.06, 1.8]} />
            <meshBasicMaterial color="#2F7BFF" />
          </mesh>
          <mesh position={[2.85, 1.9, z]}>
            <boxGeometry args={[0.06, 0.06, 1.8]} />
            <meshBasicMaterial color="#2F7BFF" />
          </mesh>
          <pointLight position={[0, 1.7, z]} intensity={14} distance={9} color="#6ea0ff" />
        </group>
      ))}
      {/* exit glare */}
      <mesh position={[0, 0, -LENGTH - 0.1]}>
        <planeGeometry args={[6, 4.4]} />
        <meshBasicMaterial color="#ffffff" fog={false} />
      </mesh>
      <mesh position={[0, 0, -LENGTH + 0.4]}>
        <planeGeometry args={[7.5, 5.6]} />
        <meshBasicMaterial color="#9fc0ff" transparent opacity={0.35} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function TunnelScene({ duration = 4.4 }: { duration?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 72, position: [0, 0, 0], near: 0.1, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <color attach="background" args={["#070B14"]} />
      <fog attach="fog" args={["#070B14", 8, 70]} />
      <ambientLight intensity={1.1} />
      <Rig duration={duration} />
      <Tunnel />
    </Canvas>
  );
}
