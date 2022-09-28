import "../style/style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Membuat scene
const scene = new THREE.Scene();

// Membuat camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//render scene dan camera ke canvas dengan id bg
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
// optimisasi renderer dengan rasio window
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// render object renderer

renderer.render(scene, camera);

// Membuat object moon dengan texture
const moonShape = new THREE.SphereGeometry(15, 32, 16);
const moonTexture = new THREE.TextureLoader().load(
  "../../assets/image/TextureMoon.jpg"
);
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
//Object moon
const moon = new THREE.Mesh(moonShape, moonMaterial);

// Memberi cahaya pada object
const light = new THREE.PointLight(0xffffff);
light.position.set(-40, 50, 10);
scene.add(light, moon);

// Untuk mengetahui posisi cahaya, dan memberikan grid
const lightHelper = new THREE.PointLightHelper(light);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);

//User dapat menggerakkan scene
const controls = new OrbitControls(camera, renderer.domElement);

// fungsi untuk menganimasikan object moon
function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.00002;
  moon.rotation.z += 0.00003;

  controls.update();

  renderer.render(scene, camera);
}

animate();
