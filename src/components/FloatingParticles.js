'use client';

import { useState } from "react";
import Particles from "@tsparticles/react"; // Đảm bảo bạn đã install: npm i @tsparticles/react @tsparticles/slim
import { loadSlim } from "@tsparticles/slim";

export default function FloatingParticles() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Hàm khởi tạo engine cho particles
  const particlesInit = async (engine) => {
    await loadSlim(engine);
    setIsLoaded(true); // Đánh dấu đã load xong để kích hoạt opacity-100
  };

  return (
    <Particles
      id="tsparticles"

      particlesInit={particlesInit} 
      
      className={`fixed inset-0 -z-10 pointer-events-none  ${
        //transition-opacity duration-500
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      
      options={{
        particles: {
          number: {
            value: 20,
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
                  src: "/ICONs/a26_Cinnamoroll_appicon_01.png", 
                  width: 100,
                  height: 100,
                },
                {
                  src: "/ICONs/a26_Cinnamoroll_appicon_21.png",
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
          color: "transparent",
        },
      }}
    />
  );
}