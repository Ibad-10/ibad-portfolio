"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Beam({ x, phase }: { x: number; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.25 + phase) * 0.18;
  });
  return (
    <mesh ref={ref} position={[x, 5, -8]}>
      <coneGeometry args={[2.4, 14, 24, 1, true]} />
      <meshBasicMaterial color="#6ea0ff" transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Pitch() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -6]}>
      <mesh>
        <planeGeometry args={[34, 22]} />
        <meshBasicMaterial color="#0a1b2e" />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(26, 15)]} />
        <lineBasicMaterial color="#2F7BFF" transparent opacity={0.45} />
      </lineSegments>
      <mesh>
        <ringGeometry args={[2.9, 3, 64]} />
        <meshBasicMaterial color="#2F7BFF" transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.05, 15]} />
        <meshBasicMaterial color="#2F7BFF" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function Parallax() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (0.2 + pointer.y * 0.25 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -6);
  });
  return null;
}

export default function HubBackdrop() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      camera={{ fov: 55, position: [0, 0.2, 4] }}
      aria-hidden="true"
    >
      <color attach="background" args={["#070B14"]} />
      <fog attach="fog" args={["#070B14", 8, 26]} />
      <Pitch />
      <Beam x={-6} phase={0} />
      <Beam x={0} phase={2} />
      <Beam x={6} phase={4} />
      <Parallax />
    </Canvas>
  );
}
