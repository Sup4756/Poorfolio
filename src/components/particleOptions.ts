import type { ISourceOptions } from "@tsparticles/engine";

// Original PNG dimensions keep tall balloons and wide letters from stretching.
const sprites = [
  [1, 374, 306], [2, 374, 306], [3, 323, 272], [4, 323, 272],
  [5, 272, 374], [6, 357, 306], [7, 357, 306], [8, 357, 306],
  [9, 357, 323], [10, 374, 238], [11, 374, 374], [12, 374, 374],
  [13, 357, 374], [14, 340, 323], [15, 340, 323], [16, 374, 272],
  [17, 357, 306], [18, 340, 374], [19, 340, 374], [20, 374, 340],
  [21, 357, 255], [22, 357, 357], [23, 289, 374], [24, 374, 340],
  [25, 340, 289],
];

export const particleOptions: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 1 },
  fpsLimit: 30,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  particles: {
    number: {
      value: 12,
      density: { enable: true, width: 1440, height: 1000 },
      limit: { mode: "wait", value: 20 },
    },
    shape: {
      type: "image",
      options: {
        image: sprites.map(([id, width, height]) => ({
          src: `/ICONs/${id}.png`,
          width,
          height,
          replaceColor: false,
        })),
      },
    },
    opacity: { value: { min: 0.18, max: 0.38 } },
    size: { value: { min: 13, max: 27 } },
    rotate: { value: { min: -12, max: 12 }, animation: { enable: false } },
    move: {
      enable: true,
      speed: { min: 0.15, max: 0.4 },
      drift: { min: -0.08, max: 0.08 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  background: { color: "transparent" },
};
