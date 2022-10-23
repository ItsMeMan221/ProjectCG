import "../style/style.css";
import * as THREE from "three";
import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";
import { stars } from "../components/starLandingPage";
import gsap from "gsap";

//Detect Intersecting Object
const raycaster = new THREE.Raycaster();
camera.position.z = 50;
//Start building the polygon
const polygonGeom = new THREE.PlaneGeometry(400, 400, 50, 50);
const polygonMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: true,
});
const polygonMesh = new THREE.Mesh(polygonGeom, polygonMaterial);

//Light Up The Polygon From The Back and Front
const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 1, 1);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(polygonMesh, frontLight, backLight, stars);

//Generate the poly like shape
const { array } = polygonMesh.geometry.attributes.position;
const randomValue = [];
for (let i = 0; i < array.length; i++) {
  if (i % 3 == 0) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i] = x + Math.random() * -6 * 3;
    array[i + 2] = z + Math.random() * -6 * 3;
    array[i + 1] = y + Math.random() * -6 * 3;
  }
  randomValue.push(Math.random() * Math.PI * 2);
}
polygonMesh.geometry.attributes.position.randomValue = randomValue;
polygonMesh.geometry.attributes.position.originalPosition =
  polygonMesh.geometry.attributes.position.array;

//Color for every vertices
const colors = [];
for (let i = 0; i < polygonMesh.geometry.attributes.position.count; i++) {
  colors.push(0.04, 0.12, 0.23);
}

polygonMesh.geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);
//Init for normalizing mouse movement
const mouse = {
  x: undefined,
  y: undefined,
};
let frame = 0;

function animate() {
  requestAnimationFrame(animate);
  frame += 0.01;
  const { array, originalPosition, randomValue } =
    polygonMesh.geometry.attributes.position;
  //Loop for polygon to move forward and back using sinus and cosinus
  for (let i = 0; i < array.length; i += 3) {
    array[i] = originalPosition[i] + Math.cos(frame + randomValue[i]) * 0.003;
    array[i + 1] =
      originalPosition[i + 1] + Math.sin(frame + randomValue[i + 1]) * 0.003;
    polygonMesh.geometry.attributes.position.needsUpdate = true;
  }
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);

  // Set for intersecting object in polygonMesh
  const intersects = raycaster.intersectObject(polygonMesh);
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes;
    // Hovering color for every vertices
    //Vertices 1
    color.setX(intersects[0].face.a, 0.81);
    color.setY(intersects[0].face.a, 0.84);
    color.setZ(intersects[0].face.a, 0.88);
    // Vertices 2
    color.setX(intersects[0].face.b, 0.81);
    color.setY(intersects[0].face.b, 0.84);
    color.setZ(intersects[0].face.b, 0.88);
    //Vertices 3
    color.setX(intersects[0].face.c, 0.81);
    color.setY(intersects[0].face.c, 0.84);
    color.setZ(intersects[0].face.c, 0.88);

    intersects[0].object.geometry.attributes.color.needsUpdate = true;
    const initialColor = {
      r: 0.04,
      g: 0.12,
      b: 0.23,
    };
    const hoverColor = {
      r: 0.81,
      g: 0.84,
      b: 0.88,
    };
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        //Vertices 1
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);
        // Vertices 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);
        //Vertices 3
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);
      },
    });
  }
}
//Listen to every mouse movement and normalize it
addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});
const element = document.getElementById("viewBtn");
const op_all = document.getElementById("txtbut");
element.addEventListener("click", viewWork);
function viewWork() {
  gsap.to(op_all, {
    opacity: 0,
    duration: 0.5,
  });
  gsap.to(camera.position, {
    z: 3,
    delay: 0.5,
    duration: 4,
  });
  gsap.to(camera.rotation, {
    x: 1.5,
    delay: 0.5,
    duration: 4,
  });
  gsap.to(camera.position, {
    y: 400,
    delay: 0.5,
    duration: 4,
    onComplete: goToNextPage,
  });
}
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

const playSound = document.getElementById("playSound");
playSound.addEventListener("click", playsound);
const iconSound = document.getElementById("icon-sound");
function playsound() {
  audioLoader.load("../../assets/music/bgsound.mp3", function (buffer) {
    if (sound.isPlaying == true) {
      sound.stop();
      iconSound.classList.remove("bi", "bi-volume-mute-fill");
      iconSound.classList.add("bi", "bi-volume-up-fill");
    } else {
      sound.setBuffer(buffer);
      iconSound.classList.remove("bi", "bi-volume-up-fill");
      iconSound.classList.add("bi", "bi-volume-mute-fill");
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    }
  });
}

// create a global audio source
// load a sound and set it as the Audio object's buffer

function goToNextPage() {
  window.location = "./views/pages/planets.html";
}
animate();
