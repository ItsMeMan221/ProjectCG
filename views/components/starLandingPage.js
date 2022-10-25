import * as THREE from "three";
import { Float32BufferAttribute } from "three";
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 1000; i++) {
  const x = -(Math.random() - 0.5) * 2000;
  const y = -(Math.random() - 1) * 2200;
  const z = (Math.random() - 0.9) * 2200;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new Float32BufferAttribute(starVertices, 3)
);
export const stars = new THREE.Points(starGeometry, starMaterial);
