"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function ContactShadow({ posX, posY }: { posX: number; posY: number }) {
  const shadowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return shadowTexture ? (
    <mesh position={[posX, posY - 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.4, 2.4]} />
      <meshBasicMaterial map={shadowTexture} transparent opacity={0.6} depthWrite={false} />
    </mesh>
  ) : null;
}

function DustParticles({ isReducedMotion }: { isReducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 110;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pseudoX = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      const pseudoY = Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1;
      const pseudoZ = Math.abs(Math.sin(i * 45.164) * 43758.5453) % 1;

      pos[i * 3] = (pseudoX - 0.5) * 18;
      pos[i * 3 + 1] = (pseudoY - 0.5) * 12;
      pos[i * 3 + 2] = (pseudoZ - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || isReducedMotion) return;
    const t = performance.now() * 0.001;
    pointsRef.current.rotation.y = t * 0.008;
    pointsRef.current.rotation.x = Math.sin(t * 0.005) * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f4f4f5"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalArc({
  radiusX,
  radiusY,
  rotation,
  opacity,
}: {
  radiusX: number;
  radiusY: number;
  rotation: [number, number, number];
  opacity: number;
}) {
  const lineObject = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radiusX, Math.sin(theta) * radiusY, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xa1a1aa,
      transparent: true,
      opacity: opacity,
    });
    return new THREE.Line(geometry, material);
  }, [radiusX, radiusY, opacity]);

  return (
    <group rotation={rotation}>
      <primitive object={lineObject} />
    </group>
  );
}

function DistantSpaceEnvironment({ isReducedMotion }: { isReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || isReducedMotion) return;
    groupRef.current.rotation.z = performance.now() * 0.00025;
  });

  return (
    <group ref={groupRef} position={[0, 0, -12]}>
      {/* Celestial Key Light illuminating planetary crescent rims from top-right */}
      <directionalLight position={[10, 8, 4]} intensity={3.0} color="#fff7ed" />

      {/* Planet 1: Upper-Left Midground Dark Planet with Visible Silhouette & Rim Light */}
      <group position={[-3.8, 3.0, -2]}>
        <mesh>
          <sphereGeometry args={[1.25, 48, 48]} />
          <meshStandardMaterial color="#16161c" roughness={0.85} metalness={0.15} />
        </mesh>
      </group>

      {/* Planet 2: Small Distant Moon near Upper-Middle/Left */}
      <mesh position={[-1.4, 2.8, -8]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#202026" roughness={0.9} />
      </mesh>

      {/* Planet 3: Lower-Right Midground Dark Planet with Warm Atmospheric Rim Bloom */}
      <group position={[1.8, -3.2, 0]}>
        <mesh>
          <sphereGeometry args={[1.65, 48, 48]} />
          <meshStandardMaterial color="#121216" roughness={0.9} metalness={0.15} />
        </mesh>
        <pointLight position={[1.4, 1.4, 0.4]} intensity={4.5} color="#ff7a59" distance={5.0} />
      </group>

      {/* Planet 4: Center-Right Distant Planet */}
      <group position={[4.5, 1.2, -5]}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color="#1a1a22" roughness={0.88} />
        </mesh>
      </group>

      {/* Small Glowing Celestial Objects Scattered in Deep Space */}
      <mesh position={[2.8, 4.2, -14]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.9} />
      </mesh>
      <mesh position={[-6.2, -2.8, -10]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.9} />
      </mesh>
      <mesh position={[6.8, -1.8, -12]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.9} />
      </mesh>

      {/* 5 Overlapping Hairline Elliptical Orbital Paths Spanning Diagonally Across Scene */}
      <OrbitalArc radiusX={13.5} radiusY={7.2} rotation={[0.85, -0.4, 0.3]} opacity={0.28} />
      <OrbitalArc radiusX={17.5} radiusY={9.5} rotation={[0.65, 0.35, -0.5]} opacity={0.22} />
      <OrbitalArc radiusX={11.0} radiusY={5.8} rotation={[1.1, -0.2, 0.6]} opacity={0.25} />
      <OrbitalArc radiusX={21.0} radiusY={12.0} rotation={[0.45, -0.55, 0.15]} opacity={0.16} />
      <OrbitalArc radiusX={9.0} radiusY={4.8} rotation={[1.3, -0.3, 0.8]} opacity={0.2} />
    </group>
  );
}

function AstronautModel({ isReducedMotion }: { isReducedMotion: boolean }) {
  const modelRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headPivotRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/astronaut.glb");

  // Pointer position ref (-1 to +1)
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  
  // Natural movement hierarchy (Head > Torso ~35% > Body Base)
  const currentRef = useRef({
    posX: 0,
    posY: 0,
    rotX: 0,
    rotY: 0,
    torsoRotX: 0,
    torsoRotY: 0,
    headRotX: 0,
    headRotY: 0,
  });

  // Base transforms: restored scale (1.12), anchored slightly farther right (2.50) and lower (-2.05)
  const basePosY = -2.05;
  const basePosX = 2.50;
  const baseRotX = 0.04;
  const baseRotY = -0.16;

  useEffect(() => {
    // Enhance material definition for low-poly astronaut (dark reflective visor vs white suit)
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (
          mesh.name.toLowerCase().includes("visor") ||
          mesh.name.toLowerCase().includes("helmet") ||
          mesh.name.toLowerCase().includes("glass")
        ) {
          if (mesh.material && "roughness" in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).roughness = 0.08;
            (mesh.material as THREE.MeshStandardMaterial).metalness = 0.92;
          }
        }
      }
    });

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || isReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current = { x, y, active: true };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [gltf, isReducedMotion]);

  useFrame((_, delta) => {
    if (!modelRef.current || !headPivotRef.current || !torsoRef.current) return;

    const time = performance.now() * 0.001;

    // Organic floating zero-gravity motion (~6s loop, translateY: 0 -> -6px -> 0)
    const idleY = isReducedMotion
      ? 0
      : Math.sin(time * 1.05) * 0.035;
    const idleRotZ = isReducedMotion ? 0 : Math.sin(time * 0.35) * 0.005;

    // Movement hierarchy calculations: Head > Torso (~35% of head) > Body Base
    const targetPosX = pointerRef.current.active ? pointerRef.current.x * 0.22 : 0;
    const targetPosY = pointerRef.current.active ? -pointerRef.current.y * 0.14 : 0;

    // 1. Base body rot
    const targetRotY = pointerRef.current.active ? pointerRef.current.x * 0.03 : 0;
    const targetRotX = pointerRef.current.active ? pointerRef.current.y * 0.015 : 0;

    // 2. Torso rot (~35% of head movement)
    const torsoTargetRotY = pointerRef.current.active ? pointerRef.current.x * 0.06 : 0;
    const torsoTargetRotX = pointerRef.current.active ? pointerRef.current.y * 0.03 : 0;

    // 3. Head/helmet rot (strongest, leads viewer attention)
    const headTargetRotY = pointerRef.current.active ? pointerRef.current.x * 0.17 : 0;
    const headTargetRotX = pointerRef.current.active ? pointerRef.current.y * 0.085 : 0;

    // Physical spring lerp
    const lerpBody = Math.min(1, delta * 3.2);
    const lerpTorso = Math.min(1, delta * 4.0);
    const lerpHead = Math.min(1, delta * 5.0);

    const c = currentRef.current;
    c.posX = THREE.MathUtils.lerp(c.posX, targetPosX, lerpBody);
    c.posY = THREE.MathUtils.lerp(c.posY, targetPosY, lerpBody);
    c.rotY = THREE.MathUtils.lerp(c.rotY, targetRotY, lerpBody);
    c.rotX = THREE.MathUtils.lerp(c.rotX, targetRotX, lerpBody);

    c.torsoRotY = THREE.MathUtils.lerp(c.torsoRotY, torsoTargetRotY, lerpTorso);
    c.torsoRotX = THREE.MathUtils.lerp(c.torsoRotX, torsoTargetRotX, lerpTorso);

    c.headRotY = THREE.MathUtils.lerp(c.headRotY, headTargetRotY, lerpHead);
    c.headRotX = THREE.MathUtils.lerp(c.headRotX, headTargetRotX, lerpHead);

    // Apply transforms
    modelRef.current.position.x = basePosX + c.posX;
    modelRef.current.position.y = basePosY + c.posY + idleY;
    modelRef.current.rotation.x = baseRotX + c.rotX;
    modelRef.current.rotation.y = baseRotY + c.rotY;
    modelRef.current.rotation.z = idleRotZ;

    torsoRef.current.rotation.y = c.torsoRotY;
    torsoRef.current.rotation.x = c.torsoRotX;

    headPivotRef.current.rotation.y = c.headRotY;
    headPivotRef.current.rotation.x = c.headRotX;
  });

  return (
    <group
      ref={modelRef}
      scale={1.12}
      position={[basePosX, basePosY, 0]}
      rotation={[baseRotX, baseRotY, 0]}
    >
      <group ref={torsoRef}>
        <group ref={headPivotRef}>
          <primitive object={gltf.scene} />
        </group>
      </group>
      <ContactShadow posX={0} posY={0} />
    </group>
  );
}

function Scene({ isReducedMotion }: { isReducedMotion: boolean }) {
  return (
    <>
      <color attach="background" args={["#08080a"]} />
      <fog attach="fog" args={["#08080a", 7, 24]} />

      {/* Physically Present Studio Industrial Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4.5, 5.5, 4.5]} intensity={1.9} color="#f4f4f5" />
      <directionalLight position={[0, 2, 4]} intensity={0.55} color="#e4e4e7" />
      <directionalLight position={[-4.5, 3.5, -4]} intensity={1.4} color="#93c5fd" />

      {/* Star field with 750 stars, 110 dust points, 4 detailed planets, 5 overlapping orbital rings */}
      <Stars
        radius={60}
        depth={30}
        count={750}
        factor={1.1}
        fade
        speed={isReducedMotion ? 0 : 0.05}
      />
      <DustParticles isReducedMotion={isReducedMotion} />
      <DistantSpaceEnvironment isReducedMotion={isReducedMotion} />

      <AstronautModel isReducedMotion={isReducedMotion} />
    </>
  );
}

export default function HeroScene() {
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>
          <Scene isReducedMotion={isReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/astronaut.glb");
