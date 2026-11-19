"use client";

import { Component, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MathUtils, MOUSE, TOUCH, type PerspectiveCamera } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Model, MODEL_PATH, MODEL_RADIUS } from "./Avatar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SPIN_SPEEDS = [1, 2, 5, 10, 20, 50, 100, 150, 200, 500] as const;

function ViewerMessage({ error = false, onRetry }: { error?: boolean; onRetry?: () => void }) {
  return (
    <div className="viewer-message" role="status">
      <span className="viewer-message-icon" aria-hidden="true">✧</span>
      <p>{error ? "The avatar couldn’t load this time." : "Getting Sup ready…"}</p>
      <span>{error ? "You can still explore everything below." : "Just a little moment."}</span>
      {error && <button className="small-button" onClick={onRetry}>Try again</button>}
    </div>
  );
}

class ViewerBoundary extends Component<{ children: ReactNode; onRetry: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <ViewerMessage error onRetry={this.props.onRetry} /> : this.props.children;
  }
}

function AvatarScene({ interactive, paused, spinSpeed, green, resetVersion, onReady }: {
  interactive: boolean;
  paused: boolean;
  spinSpeed: number;
  green: boolean;
  resetVersion: number;
  onReady: () => void;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, size, invalidate } = useThree();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useLayoutEffect(() => {
    const perspective = camera as PerspectiveCamera;
    const vertical = MathUtils.degToRad(perspective.fov / 2);
    const horizontal = Math.atan(Math.tan(vertical) * (size.width / size.height));
    // Fit the bounding sphere so every horizontal angle stays in frame.
    const distance = MODEL_RADIUS / Math.sin(Math.min(vertical, horizontal)) * 1.12;
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    if (controls.current) {
      controls.current.enableDamping = false;
      controls.current.target.set(0, 0, 0);
      controls.current.saveState();
      // Reset clears any remaining drag momentum.
      controls.current.reset();
      controls.current.enableDamping = true;
    }
    invalidate();
  }, [camera, size.width, size.height, resetVersion, invalidate]);

  useEffect(onReady, [onReady]);

  return (
    <>
      <ambientLight intensity={1.2} />
      <hemisphereLight args={["#f2faff", "#a3c8de", 1.7]} />
      <directionalLight position={[3, 5, 5]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={1.5} color="#e1f4ff" />
      <Model green={green} />
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={interactive}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.55}
        dampingFactor={0.08}
        autoRotate={!paused && !reducedMotion}
        autoRotateSpeed={0.45 * spinSpeed}
        mouseButtons={{ LEFT: MOUSE.ROTATE }}
        touches={{ ONE: TOUCH.ROTATE }}
      />
    </>
  );
}

function ViewerContent({ onRetry }: { onRetry: () => void }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [touchInteraction, setTouchInteraction] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [green, setGreen] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const interactive = finePointer || touchInteraction;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    setSupported(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }, []);

  useEffect(() => {
    if (ready || failed) return;
    const timeout = window.setTimeout(() => setFailed(true), 15000);
    return () => window.clearTimeout(timeout);
  }, [ready, failed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleLost = (event: Event) => { event.preventDefault(); setFailed(true); };
    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [supported, ready]);

  if (failed || supported === false) return <ViewerMessage error onRetry={onRetry} />;

  return (
    <>
      <div
        className="avatar-canvas"
        data-interactive={interactive}
        aria-label="Sup’s 3D avatar. Use the buttons below to control the view."
        role="img"
      >
        {supported && (
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 7], fov: 35, near: 0.1, far: 100 }}
            dpr={[1, 1.5]}
            frameloop={paused || reducedMotion ? "demand" : "always"}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            fallback={<ViewerMessage error onRetry={onRetry} />}
          >
            <Suspense fallback={null}>
              <AvatarScene
                interactive={interactive}
                paused={paused}
                spinSpeed={SPIN_SPEEDS[speedIndex]}
                green={green}
                resetVersion={resetVersion}
                onReady={handleReady}
              />
            </Suspense>
          </Canvas>
        )}
      </div>
      {!ready && <ViewerMessage />}
      {ready && (
        <div className="viewer-toolbar">
          <p>{interactive ? "Drag left or right to look around" : reducedMotion ? "Your avatar, taking it easy" : "A little spin, just for you"}</p>
          <div className="viewer-buttons">
            {!finePointer && (
              <button className="small-button" aria-pressed={touchInteraction} onClick={() => setTouchInteraction(!touchInteraction)}>
                {touchInteraction ? "Done" : "Interact"}
              </button>
            )}
            {!reducedMotion && (
              <>
                <button
                  className="small-button"
                  title={`Cycle spin speed up to ${SPIN_SPEEDS[SPIN_SPEEDS.length - 1]}×, then back to 1×`}
                  onClick={() => setSpeedIndex((index) => (index + 1) % SPIN_SPEEDS.length)}
                >
                  Speed: {SPIN_SPEEDS[speedIndex]}×
                </button>
                <button className="small-button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Resume spin" : "Pause spin"}</button>
              </>
            )}
            <button className="small-button green-button" aria-pressed={green} title="Toggle a soft green tint" onClick={() => setGreen((value) => !value)}>
              Go green
            </button>
            <button className="small-button" onClick={() => {
              setResetVersion((v) => v + 1);
              setPaused(true);
              setTouchInteraction(false);
              setSpeedIndex(0);
              setGreen(false);
            }}>Reset view</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function AvatarViewer() {
  const [attempt, setAttempt] = useState(0);
  const retry = () => { useGLTF.clear(MODEL_PATH); setAttempt((value) => value + 1); };
  return <ViewerBoundary key={attempt} onRetry={retry}><ViewerContent onRetry={retry} /></ViewerBoundary>;
}
