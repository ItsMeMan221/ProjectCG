import * as THREE from "three";

//intensity of light
const intensity = { amb: 0.2, dir: 0.8 };

// directional light
export const dirLight = new THREE.DirectionalLight(0xffffff, intensity.dir);

// ambient light
export const ambLight = new THREE.AmbientLight(0x222222, intensity.amb);

// point light
const pl = { power: 1, decay: 0 };
export const pntLight = new THREE.PointLight(
  0xffffff,
  intensity.pnt,
  1000,
  pl.decay
);

// Hampshire light
export const hempLight = new THREE.HemisphereLight(0x222222, 0x080820, 1);

// Uniforms
export const ambUni = {
  color: Object.values(ambLight.color),
  get intensity() {
    return ambLight.intensity;
  },
};
export const dirUni = {
  position: Object.values(dirLight.position),
  color: Object.values(dirLight.color),
  get intensity() {
    return dirLight.intensity;
  },
};
export const pntUni = {
  position: Object.values(pntLight.position),
  color: Object.values(pntLight.color),
  range: pntLight.distance,
  get intensity() {
    return pntLight.intensity;
  },
  get power() {
    return pl.power;
  },
  get decay() {
    return pl.decay;
  },
};
