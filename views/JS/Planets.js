import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import * as THREE from "three";
import { sun } from "../components/sun";
import { earth } from "../components/earth";
// Membuat object moon dengan texture

//Object sun

// Memberi cahaya pada object
const light = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0x222222);
light.position.set(-50, 5, 5);
camera.position.z = 900;
camera.position.x = 100;
earth.position.x = -500;
sun.position.x = -900;
scene.add(light, earth, sun, ambientLight);

// Untuk mengetahui posisi cahaya, dan memberikan grid
const lightHelper = new THREE.PointLightHelper(ambientLight);
scene.add(lightHelper);

// fungsi untuk menganimasikan object moon
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;
  sun.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();
