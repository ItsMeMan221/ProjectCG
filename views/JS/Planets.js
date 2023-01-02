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
import data from "../../planets.json" assert { type: "json" };
import Stats from "stats.js";
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
import { starsFront } from "../components/starPlanetsFront";
const rotationSpeed = 0.09;

const stats = new Stats();
let clock = new THREE.Clock();
let delta = clock.getDelta();
stats.showPanel(0);
// document.body.appendChild(stats.dom);

//Initialized
const planets = [
  {
    pl: mercury,
    position: 400,
    rotation: (rotationSpeed * delta) / 0.5,
    rotateS: 0.00085,
  },
  {
    pl: venus,
    position: 600,
    rotation: (rotationSpeed * delta) / 4,
    rotateS: 0.000225,
  },
  {
    pl: earth,
    position: 800,
    rotation: rotationSpeed * delta * 3,
    rotateS: 0.000188,
  },
  {
    pl: mars,
    position: 1000,
    rotation: rotationSpeed * delta * 3.1,
    rotateS: 0.00012,
  },

  {
    pl: jupiter,
    position: 1400,
    rotation: rotationSpeed * delta * 6.3,
    rotateS: 0.00005,
  },
  {
    pl: saturn,
    position: 2000,
    rotation: rotationSpeed * delta * 6,
    rotateS: 0.00004,
  },
  {
    pl: uranus,
    position: 2600,
    rotation: rotationSpeed * delta * 4.5,
    rotateS: 0.00002,
  },
  {
    pl: neptune,
    position: 3000,
    rotation: rotationSpeed * delta * 3.5,
    rotateS: 0.00001,
  },
];

const orbitRadius = [400, 600, 800, 1000, 1400, 2000, 2600, 3000];
const orbitsObject3D = [];
const planetsObject3D = [];

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
const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const createPlanets = () => {
  planets.forEach((planet, index) => {
    const orbitGroup = new THREE.Group();
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(orbitRadius[index], 0.05, 30, 200),
      orbitMaterial
    );
    planet.pl.position.x = planet.position;
    orbitGroup.add(orbit, planet.pl);

    orbit.rotateZ(Math.PI / 2);
    orbit.rotateY(Math.PI / 2);
    orbitsObject3D.push(orbitGroup);
    planetsObject3D.push(planet.pl);
    scene.add(orbitGroup);
  });
};
createPlanets();

// Init for orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.maxDistance = 3000;
controls.minDistance = 0;
controls.enableDamping = true;
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = 2.4;
controls.dampingFactor = 0.07;
//Set all position of utils and components
camera.position.z = 1411.0537416811678;
camera.position.y = 704.7150454413226;
camera.position.x = -373.55482345690655;

dirLight.position.x = 0;
pntLight.position.x = 0;

// Adding all utils and components
scene.add(pntLight, ambLight, hempLight, sun, stars, starsFront);

// Animate all components
function animate() {
  delta = clock.getDelta();
  requestAnimationFrame(animate);

  orbitsObject3D.forEach((group, index) => {
    group.rotation.y += planets[index].rotateS;
  });
  planetsObject3D.forEach((planet, index) => {
    planet.rotation.y += planets[index].rotation;
  });
  // update controls and interaction manager
  controls.update();
  interactionManager.update();

  // render the scene and camera

  renderer.render(scene, camera);
  tick();
}

animate();

//Loading Manager
loadingManager.onLoad = function () {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");
  loadingScreen.addEventListener("transitionend", onTransitionEnd);
};

function onTransitionEnd(event) {
  event.target.remove();
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Description Box
$(document).ready(function () {
  getAllData();
});

function getAllData() {
  let items = "";
  $.ajax({
    type: "POST",
    url: "../../planets.json",
    dataType: "json",
    success: function (response) {
      $.each(response, function (i, item) {
        items += `<div class = "planetName${i} text-white cursor-pointer list-item">
          <div class="flex-row justify-between w-auto border-2" id="pl-content${i}"> 
            <p class=" text-lg ml-2  ">${item.name}</p>
          </div>
        </div>`;
      });
      $("#planetsInfo").html(items);
      let subItem = "";
      for (let i = 0; i < data.length; i++) {
        $(".planetName" + i).click(function (e) {
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: "../../planets.json",
            dataType: "json",
            success: function (response) {
              $.each(response, function (j, subitem) {
                if (i == j) {
                  subItem = `<div class= "border-2 m-3 desc${i}"><p class="text-sm  ml-4 mb-3 mt-2 mr-4 ">${subitem.description}</p></div>`;
                  if ($(".desc" + i).length) {
                    $(".desc" + i).remove();
                  } else {
                    $("#pl-content" + i).append(subItem);
                  }
                }
              });
            },
          });
        });
      }
    },
  });
}
