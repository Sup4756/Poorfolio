'use client';
import { useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function FloatingParticles() {
  const [isLoaded, setIsLoaded] = useState(false);
  // Engine init
  const particlesInit = async (engine) => {
    await loadSlim(engine);
    setIsLoaded(true); // Mark as 100% opacity
  };

  return (
    <Particles
      id="tsparticles"

      // particlesInit={particlesInit} 
      init={particlesInit}
      // init={initParticlesEngine()}
      // -z-10
      //transition-opacity duration-500
      className={`fixed inset-0 -z-10 pointer-events-none  ${

        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      
      options={{
        particles: {
          number: {
            value: 15,
            density: {
              enable: true,
              area: 800,
            },
          },
          shape: {
            type: "image",
            options: {
              image: [
                {
                  src: "/ICONs/1.png", 
                  width: 100,
                  height: 100,
                },
                {
                  src: "/ICONs/2.png",
                  width: 100,
                  height: 100,
                },
                {
                  src: "/ICONs/3.png", 
                  width: 100,
                  height: 100,
                },
                {
                  src: "/ICONs/4.png",
                  width: 100,
                  height: 100,
                }
              ],
            },
          },
          opacity: {
            value: { min: 0.4, max: 0.8 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: {
            value: { min: 20, max: 40 },
            animation: {
              enable: false,
            },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        background: {
          color: "#transparent",
          
        },
      }}
    />
  );
}