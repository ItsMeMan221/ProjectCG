//Import all library
import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
//Import all utils
import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import { dirLight, ambLight, pntLight, hempLight } from "../utils/light";

//Import all components
import { sun } from "../components/sun";
import { mercury } from "../components/mercury";
import { venus } from "../components/venus";
import { earth } from "../components/earth";
import { mars } from "../components/mars";
import { jupiter } from "../components/jupiter";
import { saturn } from "../components/saturn";
import { uranus } from "../components/uranus";
import { neptune } from "../components/neptune";
import { stars } from "../components/starPlanets";

const rotationSpeed = 0.09;
let clock = new THREE.Clock();
let coorPlanet = new THREE.Vector3();
let coorCamera = new THREE.Vector3();

earth.rotation.x = (13 / 100) * Math.PI;
venus.rotation.x = (4.8 / 100) * Math.PI;
saturn.rotation.x = (14.8 / 100) * Math.PI;
uranus.rotation.x = (15.3 / 100) * Math.PI;
neptune.rotation.x = (15.75 / 100) * Math.PI;
// Init for interaction manager
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// Init for orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
//Set all position of utils and components
camera.position.z = 900;
camera.position.x = 200;
dirLight.position.x = -900;
pntLight.position.x = -900;

sun.position.x = -900;
mercury.position.x = -400;
venus.position.x = -200;
earth.position.x = 0;
mars.position.x = 200;
jupiter.position.x = 500;
saturn.position.x = 1000;
uranus.position.x = 1500;
neptune.position.x = 1900;
// Adding mesh to interaction manager
interactionManager.add(sun);
interactionManager.add(mercury);
interactionManager.add(venus);
interactionManager.add(earth);
// Adding all utils and components
scene.add(
  pntLight,
  ambLight,
  hempLight,
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
  stars
);

// Animate all components
function animate() {
  coorCamera = coorObj(camera);
  let delta = clock.getDelta();
  requestAnimationFrame(animate);
  mercury.rotation.y += (rotationSpeed * delta) / 0.5;
  venus.rotation.y += (rotationSpeed * delta) / 1;
  earth.rotation.y += rotationSpeed * delta * 3;
  saturn.children[0].rotation.y += rotationSpeed * delta * 6.5;
  neptune.rotation.y += rotationSpeed * delta * 4.5;

  // update controls and interaction manager
  controls.update();
  interactionManager.update();

  // render the scene and camera

  renderer.render(scene, camera);
}

// click event on sun mesh
sun.addEventListener("click", (event) => {
  let coorSun = coorObj(sun);
  gsap.to(camera.position, {
    x: coorSun.x - 900,
    duration: 3,
  });
  gsap.to(camera.position, {
    y: coorSun.y + 50,
    duration: 3,
  });
  gsap.to(camera.position, {
    z: coorSun.z - 250,
    duration: 3,
  });
});

mercury.addEventListener("click", (event) => {
  let coorMercury = coorObj(mercury);
  gsap.to(camera.position, {
    x: coorMercury.x - 300,
    duration: 3,
  });
  gsap.to(camera.position, {
    y: coorMercury.y + 50,
    duration: 3,
  });
  gsap.to(camera.position, {
    z: coorMercury.z - 100,
    duration: 3,
  });
});

venus.addEventListener("click", (event) => {
  let coorVenus = coorObj(venus);
  gsap.to(camera.position, {
    x: coorVenus.x - 150,
    duration: 3,
  });
  gsap.to(camera.position, {
    y: coorVenus.y + 50,
    duration: 3,
  });
  gsap.to(camera.position, {
    z: coorVenus.z - 80,
    duration: 3,
  });
});
earth.addEventListener("click", (event) => {
  let coorEarth = coorObj(earth);
  gsap.to(camera.position, {
    x: coorEarth.x - 180,
    duration: 3,
  });
  gsap.to(camera.position, {
    y: coorEarth.y + 50,
    duration: 3,
  });
  gsap.to(camera.position, {
    z: coorEarth.z - 80,
    duration: 3,
  });
});
animate();

function coorObj(obj) {
  let pl = new THREE.Vector3();

  pl = obj.position;

  return pl;
}
