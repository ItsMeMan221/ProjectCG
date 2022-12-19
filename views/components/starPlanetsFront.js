import * as THREE from "three";
import { Float32BufferAttribute } from "three";
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];

for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 8000;
  const y = (Math.random() - 0.5) * 8000;
  const z = (Math.random() - 0) * 3300;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new Float32BufferAttribute(starVertices, 3)
);
export const starsFront = new THREE.Points(starGeometry, starMaterial);
