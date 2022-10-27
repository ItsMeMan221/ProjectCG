import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/neptune/vertex.glsl";
import fragmentShader from "../shaders/neptune/fragment.glsl";

// Shape of neptune
const neptuneShape = new THREE.SphereGeometry(50, 60, 60);
//neptune Texture
const neptuneTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/neptune.jpg"
);
// neptune Material
const neptuneMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: neptuneTexture,
    },
  },
});
//Mesh all together
export const neptune = new THREE.Mesh(neptuneShape, neptuneMaterial);
