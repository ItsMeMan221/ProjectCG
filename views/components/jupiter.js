import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/jupiter/vertex.glsl";
import fragmentShader from "../shaders/jupiter/fragment.glsl";
// Shape of jupiter
const jupiterShape = new THREE.SphereGeometry(110, 89, 97);
//jupiter Texture
const jupiterTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/jupiter.jpg"
);
// jupiter Material
const jupiterMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: jupiterTexture,
    },
  },
});

//mesh shape and material
export const jupiter = new THREE.Mesh(jupiterShape, jupiterMaterial);
