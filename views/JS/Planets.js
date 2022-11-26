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
import { loadingManager } from "../utils/LoadingManager";

import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
//Import all components
import { sun } from "../components/sun";
import {
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
} from "../components/ExoPlanets";
import { stars } from "../components/starPlanets";

let infoId = document.getElementById("info");
const rotationSpeed = 0.09;
let clock = new THREE.Clock();

//Angle of planets
venus.rotation.x = (4.8 / 100) * Math.PI;
earth.rotation.x = (13 / 100) * Math.PI;
mars.rotation.x = (14 / 100) * Math.PI;
jupiter.rotation.x = (1.75 / 100) * Math.PI;
saturn.rotation.x = (14.8 / 100) * Math.PI;
uranus.rotation.x = (54.33 / 100) * Math.PI;
neptune.rotation.x = (15.75 / 100) * Math.PI;
// Init for interaction manager
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
const tick = () => {
  stats.begin();

  // ...

  stats.end();
};

// Init for orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
//Set all position of utils and components
camera.position.z = 900;
camera.position.x = 200;
dirLight.position.x = -900;
pntLight.position.x = -900;

// Object Position
sun.position.x = -900;
mercury.position.x = -400;
venus.position.x = -200;
earth.position.x = 0;
mars.position.x = 200;
jupiter.position.x = 450;
saturn.position.x = 800;
uranus.position.x = 1100;
neptune.position.x = 1300;

// Adding mesh to interaction manager
interactionManager.add(sun);
interactionManager.add(mercury);
interactionManager.add(venus);
interactionManager.add(earth);
interactionManager.add(mars);
interactionManager.add(jupiter);
interactionManager.add(saturn);
interactionManager.add(uranus);
interactionManager.add(neptune);

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
  let delta = clock.getDelta();
  requestAnimationFrame(animate);

  //Rotation Speed
  mercury.rotation.y += (rotationSpeed * delta) / 0.5;
  venus.rotation.y += (rotationSpeed * delta) / 4;
  earth.rotation.y += rotationSpeed * delta * 3;
  mars.rotation.y += rotationSpeed * delta * 3.1;
  jupiter.rotation.y += rotationSpeed * delta * 6.3;
  saturn.children[0].rotation.y += rotationSpeed * delta * 6;
  uranus.rotation.y += rotationSpeed * delta * 4.5;
  neptune.rotation.y += rotationSpeed * delta * 3.5;

  // update controls and interaction manager
  controls.update();
  interactionManager.update();

  // render the scene and camera

  renderer.render(scene, camera);
  tick();
  console.log(coorObj(camera));
}

// click event on plantets mesh
sun.addEventListener("click", (event) => {
  plOnClick(sun, 900, 50, 250, true);
});
mercury.addEventListener("click", (event) => {
  plOnClick(mercury, 300, 50, 100, true);
});

venus.addEventListener("click", (event) => {
  plOnClick(venus, 150, 50, 80, true);
});
earth.addEventListener("click", (event) => {
  plOnClick(earth, 180, 50, 80, true);
});
mars.addEventListener("click", (event) => {
  plOnClick(mars, -200, 40, 30, true);
});
jupiter.addEventListener("click", (event) => {
  plOnClick(jupiter, -250, 40, 50, true);
});
saturn.addEventListener("click", (event) => {
  plOnClick(saturn, -280, 40, 50, true);
});
uranus.addEventListener("click", (event) => {
  plOnClick(uranus, -200, 40, 10, true);
});
neptune.addEventListener("click", (event) => {
  plOnClick(neptune, -200, 40, 10, true);
});
animate();

function coorObj(obj) {
  let pl = new THREE.Vector3();

  pl = obj.position;

  return pl;
}

//Loading Manager
loadingManager.onLoad = function () {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");
  loadingScreen.addEventListener("transitionend", onTransitionEnd);
};

function onTransitionEnd(event) {
  event.target.remove();
}
function onShow() {
  infoId.classList.remove("hidden");
}

function plOnClick(planets, x, y, z, isUseCoor) {
  let plCoor = coorObj(planets);
  if (isUseCoor == true) {
    gsap.to(camera.position, {
      x: plCoor.x - x,
      duration: 3,
      onComplete: onShow,
    });
    gsap.to(camera.position, {
      y: plCoor.y + y,
      duration: 3,
    });
    gsap.to(camera.position, {
      z: plCoor.z - z,
      duration: 3,
    });
  } else {
    gsap.to(camera.position, {
      x: -x,
      duration: 3,
      onComplete: onShow,
    });
    gsap.to(camera.position, {
      y: +y,
      duration: 3,
    });
    gsap.to(camera.position, {
      z: -z,
      duration: 3,
    });
  }
}
