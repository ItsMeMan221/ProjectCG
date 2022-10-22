import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import * as THREE from "three";
import { sun } from "../components/sun";
import { InteractionManager } from "three.interactive";
// Memberi cahaya pada object
const light = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0x222222);
light.position.set(-50, 5, 5);
camera.position.z = 900;
camera.position.x = 100;
sun.position.x = -900;
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
interactionManager.add(sun);
scene.add(sun);

// Untuk mengetahui posisi cahaya, dan memberikan grid
const lightHelper = new THREE.PointLightHelper(ambientLight);
scene.add(lightHelper);

// fungsi untuk menganimasikan object moon
function animate() {
  requestAnimationFrame(animate);
  sun.rotation.y += 0.002;
  interactionManager.update();
  renderer.render(scene, camera);
}

sun.addEventListener("click", (event) => {
  console.log("Hello World");
});
animate();
