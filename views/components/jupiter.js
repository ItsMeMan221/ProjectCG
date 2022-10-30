import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/jupiter/vertex.glsl";
import fragmentShader from "../shaders/jupiter/fragment.glsl";
// Shape of jupiter
const jupiterShape = new THREE.SphereGeometry(149, 89, 97);
//jupiter Texture
const jupiterTexture = new THREE.TextureLoader().load("../../assets/Texture/8k_jupiter.jpg");
// jupiter Material
const jupiterMaterial = new CustomShaderMaterial({
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
      value: jupiterTexture,
    },
  },
});
const planet = new THREE.Mesh(jupiterShape, jupiterMaterial);

const ringGeometry = new THREE.RingGeometry(197, 150, 180);

const posGeom = ringGeometry.attributes.position;

const v3Geom = new THREE.Vector3();

for (let i = 0; i < posGeom.count; i++) {
  v3Geom.fromBufferAttribute(posGeom, i);
  ringGeometry.attributes.uv.setXY(i, v3Geom.length() < 119 ? 0 : 1, 1);
}
const ringTex = new THREE.TextureLoader().load("../../assets/Texture/saturn_ring.png");

const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTex,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true,
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = 80;
//Group all together
export const jupiter = new THREE.Group();
jupiter.add(planet, ring);
