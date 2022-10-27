//Import all library
import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Import all utils
import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import { dirLight, ambLight, pntLight, hempLight } from "../utils/light";

//Import all components
import { sun } from "../components/sun";

import { earth } from "../components/earth";

import { stars } from "../components/starPlanets";
import { mercury } from "../components/mercury";
import { venus } from "../components/venus";

// Init for interaction manager
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
// Init for orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
//Set all position of utils and components
camera.position.z = 900;
camera.position.x = 200;
sun.position.x = -900;
mercury.position.x = -400;
venus.position.x = -200;
earth.position.x = 0;
dirLight.position.x = -900;
pntLight.position.x = -900;

// Adding mesh to interaction manager
interactionManager.add(sun);

// Adding all utils and components
scene.add(
  pntLight,
  dirLight,
  ambLight,
  hempLight,
  sun,
  mercury,
  venus,
  earth,
  stars
);

// Animate all components
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002;

  mercury.rotation.y += 0.003;
  venus.rotation.y += 0.003;

  // update controls and interaction manager
  controls.update();
  interactionManager.update();

  // render the scene and camera

  renderer.render(scene, camera);
}

// click event on sun mesh
sun.addEventListener("click", (event) => {
  console.log("Hello World");
});
animate();
