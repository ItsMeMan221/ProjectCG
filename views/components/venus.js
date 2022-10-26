import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/venus/vertex.glsl";
import fragmentShader from "../shaders/venus/fragment.glsl";

// Shape of venus
const venusShape = new THREE.SphereGeometry(36, 60, 60);
//Venus Texture
const venusTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/venus.jpg"
);
// Venus Material
const venusMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: venusTexture,
    },
  },
});
//Mesh all together
export const venus = new THREE.Mesh(venusShape, venusMaterial);
