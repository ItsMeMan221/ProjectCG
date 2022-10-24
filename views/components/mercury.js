import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/mercury/vertex.glsl";
import fragmentShader from "../shaders/mercury/fragment.glsl";

//Object Using shader material
export const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(32, 30, 30),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      Texture: {
        value: new THREE.TextureLoader().load(
          "../../assets/Texture/mercury.jpg"
        ),
      },
      color: { value: new THREE.Color(0xffffff) },
      lightDirection: {
        value: new THREE.Vector3(-1.0, -1.0, 1.0).normalize(),
      },
    },
  })
);

// const sunShape = new THREE.SphereGeometry(32, 60, 60);
// const sunTexture = new THREE.TextureLoader().load(
//   "../../assets/Texture/mercury.jpg"
// );
// const sunMaterial = new THREE.MeshStandardMaterial({
//   map: sunTexture,
// });
// export const mercury = new THREE.Mesh(sunShape, sunMaterial);
