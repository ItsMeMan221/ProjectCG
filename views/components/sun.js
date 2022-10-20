import * as THREE from "three";
//Import Shaders
import vertexShader from "../shaders/sun/vertex.glsl";
import fragmentShader from "../shaders/sun/fragment.glsl";

//Object Using shader material
export const sun = new THREE.Mesh(
  new THREE.SphereGeometry(100, 65, 65),
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
