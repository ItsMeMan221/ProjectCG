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
    },
  })
);
