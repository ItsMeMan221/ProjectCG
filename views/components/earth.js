import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/earth/vertex.glsl";
import fragmentShader from "../shaders/earth/fragment.glsl";
// Shape of earth
const earthShape = new THREE.SphereGeometry(37.9, 65, 65);
//earth Texture
const earthTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/globe.jpg"
);
// earth Material
const earthMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: earthTexture,
    },
  },
});
//Mesh all together
export const earth = new THREE.Mesh(earthShape, earthMaterial);
