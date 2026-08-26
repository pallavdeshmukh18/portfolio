"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

export interface ProjectData {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  type: string;
  desc: string;
  tags: string[];
  liveUrl?: string | null;
  githubUrl: string;
  orbit: string;
  coordinates: string;
  velocity: string;
}

interface OrbitalMapSceneProps {
  projects: ProjectData[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
}

// Unified 3D Perspective Plane Tilt for Non-Intersecting Concentric Elliptical Lanes
const SHARED_ORBIT_ROTATION: [number, number, number] = [0.55, 0.25, -0.15];
const CORE_POSITION: [number, number, number] = [-0.4, 0.1, -0.5];

// 1. Hairline Elliptical Orbit Line Component (Strictly Separated Non-Intersecting Lanes)
function OrbitalRing({
  radiusX,
  radiusY,
  isActive,
  isDashed = false,
}: {
  radiusX: number;
  radiusY: number;
  isActive: boolean;
  isDashed?: boolean;
}) {
  const lineObject = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 220;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radiusX, Math.sin(theta) * radiusY, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: isActive ? 0xff5a36 : 0x71717a,
      transparent: true,
      opacity: isActive ? 0.85 : isDashed ? 0.10 : 0.20,
    });
    return new THREE.Line(geometry, material);
  }, [radiusX, radiusY, isActive, isDashed]);

  return (
    <group position={CORE_POSITION} rotation={SHARED_ORBIT_ROTATION}>
      <primitive object={lineObject} />
    </group>
  );
}

// 2. Sophisticated Restrained Central Star Core Component
function CentralStar() {
  const starRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!starRef.current || !glowRef.current) return;
    const time = performance.now() * 0.001;
    const pulse = Math.sin(time * 1.4) * 0.025 + 1.0;
    starRef.current.scale.set(pulse, pulse, pulse);
    glowRef.current.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
  });

  return (
    <group position={CORE_POSITION}>
      {/* Outer Corona Haze */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#ff5a36" transparent opacity={0.09} />
      </mesh>

      {/* Core Luminous Sphere */}
      <mesh ref={starRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#fff7ed"
          emissive="#ff5a36"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>

      {/* Restrained Point Light Source */}
      <pointLight color="#ff7a59" intensity={2.8} distance={7.5} />
    </group>
  );
}

// 3. Layered Orbital Particles & Stars Backdrop
function OrbitalParticles({ isReducedMotion }: { isReducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 260;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pseudoX = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      const pseudoY = Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1;
      const pseudoZ = Math.abs(Math.sin(i * 45.164) * 43758.5453) % 1;

      pos[i * 3] = (pseudoX - 0.5) * 28;
      pos[i * 3 + 1] = (pseudoY - 0.5) * 18;
      pos[i * 3 + 2] = (pseudoZ - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || isReducedMotion) return;
    const time = performance.now() * 0.001;
    pointsRef.current.rotation.z = time * 0.0002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} color="#f4f4f5" transparent opacity={0.28} sizeAttenuation />
    </points>
  );
}

// 7 Concentric Non-Intersecting Elliptical Orbital Lanes Mapped 1:1 to Pallav's 7 Real Projects
const orbitLanes = [
  { lane: 1, radiusX: 1.0, radiusY: 0.60, speed: 0.09, phase: 1.1, stationId: "01" }, // 01 / LATTICE (Inner)
  { lane: 2, radiusX: 1.6, radiusY: 0.95, speed: 0.07, phase: 2.8, stationId: "02" }, // 02 / SCOUT (Inner)
  { lane: 3, radiusX: 2.2, radiusY: 1.30, speed: 0.055, phase: 0.4, stationId: "03" }, // 03 / KRYPTON (Middle)
  { lane: 4, radiusX: 2.8, radiusY: 1.65, speed: 0.042, phase: 2.2, stationId: "04" }, // 04 / LOWKEYLOSS (Middle)
  { lane: 5, radiusX: 3.4, radiusY: 2.00, speed: 0.032, phase: 4.5, stationId: "05" }, // 05 / STRUCTUR.AI (Middle)
  { lane: 6, radiusX: 4.0, radiusY: 2.35, speed: 0.024, phase: 1.3, stationId: "06" }, // 06 / VOICETRACK (Outer)
  { lane: 7, radiusX: 4.6, radiusY: 2.70, speed: 0.016, phase: 3.1, stationId: "07" }, // 07 / DRAFT ANGLE (Outermost - Unclipped)
];

const shortNames: Record<string, string> = {
  "01": "LATTICE",
  "02": "SCOUT",
  "03": "KRYPTON",
  "04": "LOWKEYLOSS",
  "05": "STRUCTUR.AI",
  "06": "VOICETRACK",
  "07": "DRAFT ANGLE",
};

// 4. Spacecraft 3D Mesh Component for Station Nodes
function SpacecraftMarker({
  project,
  laneConfig,
  isActive,
  isReducedMotion,
  onSelect,
}: {
  project: ProjectData;
  laneConfig: (typeof orbitLanes)[number];
  isActive: boolean;
  isReducedMotion: boolean;
  onSelect: (id: string, worldPos: THREE.Vector3) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  const euler = useMemo(() => new THREE.Euler(...SHARED_ORBIT_ROTATION), []);

  useFrame(() => {
    if (!groupRef.current) return;
    const time = isReducedMotion ? 0 : performance.now() * 0.001;
    const angle = time * laneConfig.speed + laneConfig.phase;

    // Parametric ellipse coordinates on dedicated orbital lane
    const localX = Math.cos(angle) * laneConfig.radiusX;
    const localY = Math.sin(angle) * laneConfig.radiusY;
    const vec = new THREE.Vector3(localX, localY, 0).applyEuler(euler);

    // Anchor to central star position
    groupRef.current.position.set(vec.x + CORE_POSITION[0], vec.y + CORE_POSITION[1], vec.z + CORE_POSITION[2]);

    if (moonRef.current) {
      const moonAngle = time * 0.8;
      moonRef.current.position.set(Math.cos(moonAngle) * 0.35, Math.sin(moonAngle) * 0.35, 0);
    }

    if (pulseRingRef.current && isActive) {
      const pulseScale = (Math.sin(time * 2.5) * 0.5 + 0.5) * 0.35 + 1.0;
      pulseRingRef.current.scale.set(pulseScale, pulseScale, 1);
    }
  });

  const handleMarkerClick = () => {
    if (groupRef.current) {
      onSelect(project.id, groupRef.current.position.clone());
    }
  };

  const displayName = shortNames[project.id] ?? project.name;

  return (
    <group ref={groupRef}>
      {/* Satellite Body & Solar Wings */}
      <group ref={meshRef}>
        <mesh>
          <boxGeometry args={[isActive ? 0.14 : 0.11, isActive ? 0.14 : 0.11, isActive ? 0.14 : 0.11]} />
          <meshStandardMaterial
            color={isActive ? "#ff5a36" : "#d4d4d8"}
            emissive={isActive ? "#ff5a36" : "#52525b"}
            emissiveIntensity={isActive ? 1.8 : 0.3}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[-0.18, 0, 0]}>
          <boxGeometry args={[0.20, 0.04, 0.015]} />
          <meshStandardMaterial color={isActive ? "#ff7a59" : "#71717a"} />
        </mesh>

        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.20, 0.04, 0.015]} />
          <meshStandardMaterial color={isActive ? "#ff7a59" : "#71717a"} />
        </mesh>
      </group>

      {/* Pulsing Tracking Ring for Active Spacecraft */}
      {isActive && (
        <>
          <mesh ref={pulseRingRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.30, 0.34, 32]} />
            <meshBasicMaterial color="#ff5a36" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#ff5a36" intensity={2.2} distance={2.5} />
        </>
      )}

      {/* Sub-Orbit Satellite / Moon */}
      {(project.id === "01" || project.id === "05") && (
        <group ref={moonRef}>
          <mesh>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#a1a1aa" emissive="#a1a1aa" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}

      {/* HTML Telemetry Spacecraft Badge Overlay */}
      <Html center distanceFactor={10} className="pointer-events-auto select-none">
        <button
          type="button"
          onClick={handleMarkerClick}
          onMouseEnter={handleMarkerClick}
          className={`flex items-center gap-2 border px-2.5 py-1.5 backdrop-blur-md transition-all cursor-pointer whitespace-nowrap rounded-none ${
            isActive
              ? "border-[#ff5a36] bg-[#0c0c10]/95 text-[#f3ece4] shadow-[0_0_18px_rgba(255,90,54,0.35)]"
              : "border-white/20 bg-[#08080b]/85 text-zinc-400 hover:border-white/45 hover:text-white"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 transition-all ${
              isActive ? "bg-[#ff5a36] shadow-[0_0_6px_#ff5a36]" : "bg-zinc-500"
            }`}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em]">
            {project.id} / {displayName}
          </span>
          {isActive && (
            <span className="ml-1 text-[9px] font-mono text-[#ff5a36] tracking-[0.18em]">
              [LOCKED]
            </span>
          )}
        </button>
      </Html>
    </group>
  );
}

// 5. Camera Controller Component handling Pan, Inertial Lerp, Target Lock, and Zoom Scale
function CameraController({
  targetPan,
  targetZoom,
  isReducedMotion,
}: {
  targetPan: { x: number; y: number };
  targetZoom: number;
  isReducedMotion: boolean;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (isReducedMotion) return;
    const lerpSpeed = 0.08;
    const nextX = THREE.MathUtils.lerp(camera.position.x, targetPan.x, lerpSpeed);
    const nextY = THREE.MathUtils.lerp(camera.position.y, targetPan.y, lerpSpeed);
    const targetZ = 10 / targetZoom;
    const nextZ = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);
    camera.position.set(nextX, nextY, nextZ);
  });

  return null;
}

// 6. Main 3D Canvas Scene Wrapper
function OrbitalMapCanvas({
  projects,
  activeProjectId,
  targetPan,
  targetZoom,
  onSelectProject,
}: OrbitalMapSceneProps & {
  targetPan: { x: number; y: number };
  targetZoom: number;
}) {
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSelectProject = useCallback(
    (id: string) => {
      onSelectProject(id);
    },
    [onSelectProject]
  );

  return (
    <Canvas
      camera={{ position: [targetPan.x, targetPan.y, 10 / targetZoom], fov: 42 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 5]} intensity={1.2} color="#ffffff" />

        <CameraController targetPan={targetPan} targetZoom={targetZoom} isReducedMotion={isReducedMotion} />
        <OrbitalParticles isReducedMotion={isReducedMotion} />
        <CentralStar />

        {/* Render 7 Concentric Orbital Rings (Unclipped Outermost Orbit) */}
        {orbitLanes.map((laneConfig) => {
          const project = projects.find((p) => p.id === laneConfig.stationId);
          const isActive = project?.id === activeProjectId;
          const isDashed = laneConfig.lane >= 6;
          return (
            <OrbitalRing
              key={`ring-${laneConfig.lane}`}
              radiusX={laneConfig.radiusX}
              radiusY={laneConfig.radiusY}
              isActive={isActive}
              isDashed={isDashed}
            />
          );
        })}

        {/* Render 7 Primary Interactive Spacecraft Stations on Dedicated Lanes */}
        {projects.map((project) => {
          const laneConfig = orbitLanes.find((l) => l.stationId === project.id) ?? orbitLanes[0];
          const isActive = project.id === activeProjectId;
          return (
            <SpacecraftMarker
              key={project.id}
              project={project}
              laneConfig={laneConfig}
              isActive={isActive}
              isReducedMotion={isReducedMotion}
              onSelect={handleSelectProject}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
}

// 7. Section Container Component with Interactive Pan/Zoom Controls & Minimap
export default function OrbitalMapScene({
  projects,
  activeProjectId,
  onSelectProject,
}: OrbitalMapSceneProps) {
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];

  // Camera Pan & Zoom state
  const [targetPan, setTargetPan] = useState({ x: 0, y: 0 });
  const [targetZoom, setTargetZoom] = useState(1.0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  // 1. Mouse Drag Panning Gesture Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...targetPan };
    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = (e.clientX - dragStartRef.current.x) * 0.012 * (1 / targetZoom);
    const dy = (e.clientY - dragStartRef.current.y) * 0.012 * (1 / targetZoom);

    const nextX = Math.max(-8, Math.min(8, panStartRef.current.x - dx));
    const nextY = Math.max(-5, Math.min(5, panStartRef.current.y + dy));

    setTargetPan({ x: nextX, y: nextY });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // 2. Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!hasInteracted) setHasInteracted(true);
    const zoomDelta = e.deltaY * -0.0015;
    setTargetZoom((prev) => Math.max(0.65, Math.min(2.2, prev + zoomDelta)));
  };

  // 3. Navigation Controls
  const handleZoomIn = () => {
    if (!hasInteracted) setHasInteracted(true);
    setTargetZoom((prev) => Math.min(2.2, prev + 0.2));
  };

  const handleZoomOut = () => {
    if (!hasInteracted) setHasInteracted(true);
    setTargetZoom((prev) => Math.max(0.65, prev - 0.2));
  };

  const handleResetView = () => {
    if (!hasInteracted) setHasInteracted(true);
    setTargetPan({ x: 0, y: 0 });
    setTargetZoom(1.0);
  };

  // 4. Smooth Camera Focus on Station Select
  const handleStationSelect = (id: string, worldPos?: THREE.Vector3) => {
    onSelectProject(id);
    if (!hasInteracted) setHasInteracted(true);
    if (worldPos) {
      setTargetPan({ x: worldPos.x * 0.6, y: worldPos.y * 0.6 });
      setTargetZoom(1.25);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      className="relative h-full min-h-[580px] w-full overflow-hidden border border-white/10 bg-[#07070a] flex flex-col justify-between p-6 rounded-none select-none"
    >
      {/* TOP TELEMETRY OVERLAY */}
      <div className="relative z-10 flex items-start justify-between pointer-events-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36]">
              LIVE ORBIT MAP
            </p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            SECTOR 02 // STATIONS 01–07 // [LOCKED: {activeProject.name}]
          </p>
        </div>

        {/* NAVIGATION CONTROLS & ZOOM INDICATOR */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-1 border border-white/15 bg-black/70 px-2 py-1 text-[10px] font-mono text-zinc-300">
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom out"
              className="px-1.5 hover:text-[#ff5a36] transition-colors cursor-pointer"
            >
              −
            </button>
            <span className="px-1 tracking-[0.15em]">{targetZoom.toFixed(1)}×</span>
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom in"
              className="px-1.5 hover:text-[#ff5a36] transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-1 border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:border-white/40 hover:text-white transition-all cursor-pointer"
          >
            <span>⌖</span>
            <span className="hidden sm:inline">RESET VIEW</span>
          </button>
        </div>
      </div>

      {/* 3D INTERACTIVE CANVAS VIEWPORT */}
      <div className="absolute inset-0 z-0">
        <OrbitalMapCanvas
          projects={projects}
          activeProjectId={activeProjectId}
          targetPan={targetPan}
          targetZoom={targetZoom}
          onSelectProject={handleStationSelect}
        />
      </div>

      {/* SUBTLE INITIAL DRAG/ZOOM EXPLORATION HINT */}
      {!hasInteracted && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-700">
          <div className="flex items-center gap-2 border border-[#ff5a36]/40 bg-black/80 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-[#f3ece4] shadow-lg backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-ping" />
            <span>DRAG TO EXPLORE • SCROLL TO ZOOM</span>
          </div>
        </div>
      )}

      {/* BOTTOM AEROSPACE LEGEND, MINIMAP & TELEMETRY OVERLAY */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-white/10 pt-4 gap-4 pointer-events-none">
        {/* CORNER MINIMAP OVERLAY */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="relative h-12 w-16 border border-white/15 bg-black/80 p-1">
            {/* Sector Central Core Dot */}
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5a36]" />
            {/* Viewport Box Indicator */}
            <div
              className="absolute border border-[#ff5a36]/60 bg-[#ff5a36]/10 transition-all duration-300"
              style={{
                width: `${Math.max(16, 40 / targetZoom)}%`,
                height: `${Math.max(16, 40 / targetZoom)}%`,
                left: `${Math.max(5, Math.min(65, 50 - (targetPan.x / 10) * 35))}%`,
                top: `${Math.max(5, Math.min(65, 50 + (targetPan.y / 7) * 35))}%`,
              }}
            />
          </div>

          <div className="hidden md:flex flex-col text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            <span>SECTOR BOUNDS</span>
            <span className="text-zinc-400">EXPLORABLE MAP</span>
          </div>
        </div>

        {/* AEROSPACE ORBITAL LEGEND */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-[#ff5a36]" />
            <span className="text-[#ff5a36]">ACTIVE TRAJECTORY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-zinc-400" />
            <span>TRACKED SATELLITE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-zinc-600" />
            <span>PROJECTED PATH</span>
          </div>
        </div>

        {/* TARGET NODE READOUT */}
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
            TARGET NODE TELEMETRY
          </p>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#f3ece4]">
            {activeProject.name} [{activeProject.coordinates}] // {activeProject.velocity}
          </p>
        </div>
      </div>
    </div>
  );
}
