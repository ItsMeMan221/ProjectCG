import * as THREE from "three";
import { Float32BufferAttribute } from "three";
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2700;
  const y = -(Math.random() - 0.5) * 2500;
  const z = -Math.random() * 1000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new Float32BufferAttribute(starVertices, 3)
);
export const stars = new THREE.Points(starGeometry, starMaterial);
