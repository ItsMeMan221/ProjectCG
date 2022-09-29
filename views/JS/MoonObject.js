import "../style/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { renderer } from "../utils/renderer";
import { scene } from "../utils/scene";
import { camera } from "../utils/camera";

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
const ambientLight = new THREE.AmbientLight(0x222222);
light.position.set(-30, 5, 5);

scene.add(light, moon, ambientLight);

// Untuk mengetahui posisi cahaya, dan memberikan grid
const lightHelper = new THREE.PointLightHelper(ambientLight);
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

function addStar() {
  const geom = new THREE.SphereGeometry(0.25, 24, 24);
  const materials = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geom, materials);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStar);

animate();
