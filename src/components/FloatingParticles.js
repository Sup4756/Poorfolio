"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { particleOptions } from "./particleOptions";

export default function FloatingParticles() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const smallScreen = useMediaQuery("(max-width: 760px)");
  if (reducedMotion || smallScreen) return null;
  return <ParticlesProvider init={loadSlim}><Particles id="tsparticles" options={particleOptions} /></ParticlesProvider>;
}
