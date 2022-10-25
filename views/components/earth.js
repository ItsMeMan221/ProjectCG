import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/earth/vertex.glsl";
import fragmentShader from "../shaders/earth/fragment.glsl";

//Object Using shader material
export const earth = new THREE.Mesh(
  new THREE.SphereGeometry(75, 65, 65),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      Texture: {
        value: new THREE.TextureLoader().load("../../assets/Texture/globe.jpg"),
      },
    },
  })
);
