import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/uranus/vertex.glsl";
import fragmentShader from "../shaders/uranus/fragment.glsl";
// Shape of uranus
const uranusShape = new THREE.SphereGeometry(37.9, 65, 65);
//uranus Texture
const uranusTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/uranus.jpg"
);
// uranus Material
const uranusMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: uranusTexture,
    },
  },
});
//Mesh all together
export const uranus = new THREE.Mesh(uranusShape, uranusMaterial);
