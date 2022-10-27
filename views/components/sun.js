import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
//Import Shaders
import vertexShader from "../shaders/sun/vertex.glsl";
import fragmentShader from "../shaders/sun/fragment.glsl";

// Shape of sun
const sunShape = new THREE.SphereGeometry(200, 65, 65);
//sun Texture
const sunTexture = new THREE.TextureLoader().load(
  "../../assets/Texture/sun.jpg"
);
// sun Material
const sunMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshBasicMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    Texture: {
      value: sunTexture,
    },
  },
});
//Mesh all together
export const sun = new THREE.Mesh(sunShape, sunMaterial);
const glowMaterial = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load("../../assets/Texture/glow.png"),
  useScreenCoordinates: false,
  alignment: THREE.SpriteMaterial.center,
  color: 0xff0000,
  transparent: true,
  blending: THREE.AdditiveBlending,
});
const glow = new THREE.Sprite(glowMaterial);
glow.scale.set(700, 700, 1.0);
sun.add(glow);
