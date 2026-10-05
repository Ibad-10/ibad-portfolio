"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { keeperX, type Dive, type Outcome } from "@/lib/penalty";

export type ShotState = { id: number; aimX: number; aimY: number; power: number; dive: Dive; outcome: Outcome };

const GOAL_Z = -10.9;
const HALF_W = 3.66;
const BAR_H = 2.44;
const X_SCALE = 3.3;
const BALL_Z = -1.2;

export function aimToWorld(aimX: number, aimY: number): [number, number] {
  return [aimX * X_SCALE, 0.2 + aimY * 2.1];
}

function shotTarget(s: ShotState): [number, number, number] {
  let [x, y] = aimToWorld(s.aimX, s.aimY);
  let z = GOAL_Z - 1.2; // into the net
  if (s.outcome === "missed") {
    if (s.power > 0.95) {
      y = BAR_H + 1.6;
      z = GOAL_Z - 2;
    } else if (Math.abs(s.aimX) > 0.92) {
      x = Math.sign(s.aimX || 1) * (HALF_W + 0.5);
    } else {
      y = BAR_H + 0.3;
    }
  }
  if (s.outcome === "saved") z = GOAL_Z + 0.3;
  return [x, y, z];
}

function Ball({ shot }: { shot: ShotState | null }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const target = useMemo(() => (shot ? shotTarget(shot) : null), [shot]);
  useEffect(() => {
    t.current = 0;
    if (ref.current) ref.current.position.set(0, 0.11, BALL_Z);
  }, [shot?.id]);
  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    if (!shot || !target) {
      m.position.set(0, 0.11, BALL_Z);
      return;
    }
    t.current += dt;
    const dur = 0.35 + (1 - shot.power) * 0.45;
    const p = Math.min(t.current / dur, 1);
    m.position.x = target[0] * p;
    m.position.y = 0.11 + (target[1] - 0.11) * p + Math.sin(p * Math.PI) * 0.25;
    m.position.z = BALL_Z + (target[2] - BALL_Z) * p;
    m.rotation.x -= dt * 14;
  });
  return (
    <mesh ref={ref} position={[0, 0.11, BALL_Z]}>
      <sphereGeometry args={[0.11, 24, 24]} />
      <meshStandardMaterial color="#f4f6fb" roughness={0.45} />
    </mesh>
  );
}

function Keeper({ shot }: { shot: ShotState | null }) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useEffect(() => {
    t.current = 0;
  }, [shot?.id]);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    if (!shot) {
      g.position.set(0, 0.95, GOAL_Z + 0.15);
      g.rotation.z += (0 - g.rotation.z) * 0.2;
      return;
    }
    t.current += dt;
    const p = Math.min(t.current / 0.5, 1);
    const eased = 1 - (1 - p) * (1 - p);
    const tx = keeperX(shot.dive) * X_SCALE;
    g.position.x = tx * eased;
    g.position.y = 0.95 + (shot.dive === 0 ? 0.1 : 0.2) * Math.sin(p * Math.PI);
    g.rotation.z = -shot.dive * 1.0 * eased;
  });
  return (
    <group ref={ref} position={[0, 0.95, GOAL_Z + 0.15]}>
      <mesh>
        <capsuleGeometry args={[0.28, 0.9, 6, 16]} />
        <meshStandardMaterial color="#C8174F" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.19, 16, 16]} />
        <meshStandardMaterial color="#e5b894" roughness={0.7} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.5, 0.25, 0]} rotation={[0, 0, s * 0.9]}>
          <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
          <meshStandardMaterial color="#C8174F" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Goal() {
  const post = (x: number, h: number, y: number, rot: [number, number, number] = [0, 0, 0], len = h) => (
    <mesh position={[x, y, GOAL_Z]} rotation={rot}>
      <cylinderGeometry args={[0.06, 0.06, len, 12]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
  return (
    <group>
      {post(-HALF_W, BAR_H, BAR_H / 2)}
      {post(HALF_W, BAR_H, BAR_H / 2)}
      {post(0, BAR_H, BAR_H, [0, 0, Math.PI / 2], HALF_W * 2)}
      <mesh position={[0, BAR_H / 2, GOAL_Z - 1.4]}>
        <planeGeometry args={[HALF_W * 2, BAR_H, 18, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, BAR_H, GOAL_Z - 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[HALF_W * 2, 1.4, 18, 4]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * HALF_W, BAR_H / 2, GOAL_Z - 0.7]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.4, BAR_H, 4, 8]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Pitch() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial color="#14532d" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[0.12, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, GOAL_Z]}>
        <planeGeometry args={[40, 0.12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, GOAL_Z + 5.5]}>
        <planeGeometry args={[18.3, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function Reticle({ aim, visible }: { aim: { x: number; y: number }; visible: boolean }) {
  const [x, y] = aimToWorld(aim.x, aim.y);
  if (!visible) return null;
  return (
    <group position={[x, y, GOAL_Z + 0.75]}>
      <mesh>
        <torusGeometry args={[0.3, 0.05, 12, 36]} />
        <meshBasicMaterial color="#2F7BFF" />
      </mesh>
      <mesh>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#2F7BFF" />
      </mesh>
    </group>
  );
}

export default function PenaltyScene({
  aim,
  showReticle,
  shot,
}: {
  aim: { x: number; y: number };
  showReticle: boolean;
  shot: ShotState | null;
}) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 36, position: [0, 1.3, 1.8] }} onCreated={({ camera }) => camera.lookAt(0, 0.9, -9)} aria-hidden="true">
      <color attach="background" args={["#0b1426"]} />
      <fog attach="fog" args={["#0b1426", 14, 40]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 8, 4]} intensity={2.2} />
      <pointLight position={[-4, 3, -8]} intensity={20} color="#6ea0ff" />
      <Pitch />
      <Goal />
      <Keeper shot={shot} />
      <Ball shot={shot} />
      <Reticle aim={aim} visible={showReticle} />
    </Canvas>
  );
}
