import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/venus/vertex.glsl";
import fragmentShader from "../shaders/venus/fragment.glsl";

//Object Using shader material
export const venus = new THREE.Mesh(
  new THREE.SphereGeometry(35, 40, 40),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      Texture: {
        value: new THREE.TextureLoader().load("../../assets/Texture/venus.jpg"),
      },
    },
  })
);
