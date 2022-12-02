import * as THREE from "three";
export const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.05,
  5 * Math.pow(4, 10)
);
