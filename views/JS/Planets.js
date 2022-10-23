import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import { sun } from "../components/sun";
import { mercury } from "../components/mercury";
import { venus } from "../components/venus";
// Memberi cahaya pada object

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
const controls = new OrbitControls(camera, renderer.domElement);
//Set all position
camera.position.z = 900;
camera.position.x = 200;
sun.position.x = -900;
mercury.position.x = -400;
venus.position.x = -200;

interactionManager.add(sun);
scene.add(sun, mercury, venus);

// fungsi untuk menganimasikan object moon
function animate() {
  requestAnimationFrame(animate);
  mercury.rotation.y += 0.003;
  venus.rotation.y += 0.003;

  controls.update();
  interactionManager.update();
  renderer.render(scene, camera);
}

sun.addEventListener("click", (event) => {
  console.log("Hello World");
});
animate();
