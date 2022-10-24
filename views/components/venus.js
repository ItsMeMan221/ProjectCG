import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/venus/vertex.glsl";
import fragmentShader from "../shaders/venus/fragment.glsl";

import { ambUni, dirUni, pntUni } from "../utils/light";
//Object Using shader material
// export const venus = new THREE.Mesh(
//   new THREE.SphereGeometry(35, 40, 40),
//   new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//       Texture: {
//         value: new THREE.TextureLoader().load("../../assets/Texture/venus.jpg"),
//       },
//       ambLight: { value: ambUni },
//       dirLight: { value: dirUni },
//       pntLight: {
//         get value() {
//           return pntUni;
//         },
//       },
//     },
//   })
// );

// Shape of venus
const venusShape = new THREE.SphereGeometry(36, 60, 60);
//Venus Texture
const venusTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/venus.jpg"
);
// Venus Material
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
//Mesh all together
export const venus = new THREE.Mesh(venusShape, venusMaterial);
