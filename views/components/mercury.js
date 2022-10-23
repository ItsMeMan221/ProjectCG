import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/mercury/vertex.glsl";
import fragmentShader from "../shaders/mercury/fragment.glsl";

//Object Using shader material
export const sun = new THREE.Mesh(
    new THREE.SphereGeometry(100, 65, 65),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        Texture: {
          value: new THREE.TextureLoader().load("../../assets/Texture/mercury.jpg"),
        },
      },
    })
  );
  