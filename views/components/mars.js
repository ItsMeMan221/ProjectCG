import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/mars/vertex.glsl";
import fragmentShader from "../shaders/mars/fragment.glsl";
// Shape of mars
const marsShape = new THREE.SphereGeometry(35, 105, 30);
//mars Texture
const marsTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/mars.jpg"
);
// mars Material
const marsMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: marsTexture,
    },
  },
});
//Mesh all together
export const mars = new THREE.Mesh(marsShape, marsMaterial);
