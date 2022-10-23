import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/venus/vertex.glsl";
import fragmentShader from "../shaders/venus/fragment.glsl";

//Object Using shader material
export const sun = new THREE.Mesh(
    new THREE.SphereGeometry(100, 65, 65),
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
  