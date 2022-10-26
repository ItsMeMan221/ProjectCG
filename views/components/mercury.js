import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/mercury/vertex.glsl";
import fragmentShader from "../shaders/mercury/fragment.glsl";
// Shape of mercury
const mercuryShape = new THREE.SphereGeometry(30, 60, 60);
//mercury Texture
const mercuryTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/mercury.jpg"
);
// mercury Material
const mercuryMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: mercuryTexture,
    },
  },
});
//Mesh all together
export const mercury = new THREE.Mesh(mercuryShape, mercuryMaterial);
