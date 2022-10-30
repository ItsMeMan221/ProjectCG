import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/saturn/vertex.glsl";
import fragmentShader from "../shaders/saturn/fragment.glsl";
// Shape of saturn
const saturnShape = new THREE.SphereGeometry(67, 65, 65);
//saturn Texture
const saturnTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/saturn.jpg"
);
// saturn Material
const saturnMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: false,
  color: 0xff00ff,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: saturnTexture,
    },
  },
});
const planet = new THREE.Mesh(saturnShape, saturnMaterial);

const ringGeometry = new THREE.RingGeometry(100, 150, 180);

const posGeom = ringGeometry.attributes.position;

const v3Geom = new THREE.Vector3();

for (let i = 0; i < posGeom.count; i++) {
  v3Geom.fromBufferAttribute(posGeom, i);
  ringGeometry.attributes.uv.setXY(i, v3Geom.length() < 119 ? 0 : 1, 1);
}
const ringTex = new THREE.TextureLoader().load(
  "../../assets/Texture/saturn_ring.png"
);

const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTex,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true,
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = 80;
//Group all together
export const saturn = new THREE.Group();
saturn.add(planet, ring);
