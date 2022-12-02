import * as THREE from "three";

//intensity of light
const intensity = { amb: 0.2, dir: 0.8, pnt: 2 };

// directional light
export const dirLight = new THREE.DirectionalLight(0xffffff, intensity.dir);

// ambient light
export const ambLight = new THREE.AmbientLight(0x222222, intensity.amb);

// point light
const pl = { power: 2, decay: 1.8 };
export const pntLight = new THREE.PointLight(
  0xffffff,
  intensity.pnt,
  4 * Math.pow(2, 10),
  pl.decay
);

// Hampshire light
export const hempLight = new THREE.HemisphereLight(0x222222, 0x080820, 1);
