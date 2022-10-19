import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export const sun = new THREE.Mesh(
  new THREE.SphereGeometry(80, 65, 65),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("../../assets/Texture/sun.jpg"),
      },
    },
  })
);

// const sunShape = new THREE.SphereGeometry(100, 60, 60);
// const sunTexture = new THREE.TextureLoader().load(
//   "../../assets/Texture/sun.jpg"
// );
// const sunMaterial = new THREE.MeshBasicMaterial({
//   map: sunTexture,
// });
// export const sun = new THREE.Mesh(sunShape, sunMaterial);
