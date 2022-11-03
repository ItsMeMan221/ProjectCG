import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { loadingManager } from "../utils/LoadingManager";
//Import Shaders
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

// all of planets
const textureLoader = new THREE.TextureLoader(loadingManager);

// Shape of mercury
const mercuryShape = new THREE.SphereGeometry(30, 60, 60);
//mercury Texture
const mercuryTexture = textureLoader.load("../../assets/Texture/mercury.jpg");
// mercury Material
const mercuryMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.3, 0.3, 0.3),
    },
    Texture: {
      value: mercuryTexture,
    },
  },
});

// Shape of venus
const venusShape = new THREE.SphereGeometry(36, 60, 60);
//Venus Texture
const venusTexture = textureLoader.load("../../assets/Texture/venus.jpg");
// Venus Material
const venusMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.8, 0.4, 0),
    },
    Texture: {
      value: venusTexture,
    },
  },
});

// Shape of earth
const earthShape = new THREE.SphereGeometry(37.9, 65, 65);
//earth Texture
const earthTexture = textureLoader.load("../../assets/Texture/globe.jpg");
// earth Material
const earthMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.2, 0.3, 0.8),
    },
    Texture: {
      value: earthTexture,
    },
  },
});

// Shape of mars
const marsShape = new THREE.SphereGeometry(32, 105, 30);
//mars Texture
const marsTexture = textureLoader.load("../../assets/Texture/mars.jpg");
// mars Material
const marsMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.82, 0.41, 0.12),
    },
    Texture: {
      value: marsTexture,
    },
  },
});

// Shape of jupiter
const jupiterShape = new THREE.SphereGeometry(80, 89, 97);
//jupiter Texture
const jupiterTexture = textureLoader.load("../../assets/Texture/jupiter.jpg");
// jupiter Material
const jupiterMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.84, 0.79, 0.615),
    },
    Texture: {
      value: jupiterTexture,
    },
  },
});

// Shape of saturn
const saturnShape = new THREE.SphereGeometry(70, 65, 65);
//saturn Texture
const saturnTexture = textureLoader.load("../../assets/Texture/saturn.jpg");
// saturn Material
const saturnMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: false,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.92, 0.84, 0.72),
    },
    Texture: {
      value: saturnTexture,
    },
  },
});
const planet = new THREE.Mesh(saturnShape, saturnMaterial);

const ringGeometry = new THREE.RingGeometry(80, 150, 180);

const posGeom = ringGeometry.attributes.position;

const v3Geom = new THREE.Vector3();

for (let i = 0; i < posGeom.count; i++) {
  v3Geom.fromBufferAttribute(posGeom, i);
  ringGeometry.attributes.uv.setXY(i, v3Geom.length() < 119 ? 0 : 1, 1);
}
const ringTex = textureLoader.load("../../assets/Texture/saturn_ring.png");

const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTex,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true,
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = 80;

// Shape of uranus
const uranusShape = new THREE.SphereGeometry(50, 65, 65);
//uranus Texture
const uranusTexture = textureLoader.load("../../assets/Texture/uranus.jpg");
// uranus Material
const uranusMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.74, 0.92, 0.9),
    },
    Texture: {
      value: uranusTexture,
    },
  },
});
// Shape of neptune
const neptuneShape = new THREE.SphereGeometry(49.5, 60, 60);
//neptune Texture
const neptuneTexture = textureLoader.load("../../assets/Texture/neptune.jpg");
// neptune Material
const neptuneMaterial = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader,
  fragmentShader,
  uniforms: {
    instColor: {
      value: new THREE.Vector3(0.52, 0.68, 0.863),
    },
    Texture: {
      value: neptuneTexture,
    },
  },
});
//Mesh all together
export const mercury = new THREE.Mesh(mercuryShape, mercuryMaterial);
export const venus = new THREE.Mesh(venusShape, venusMaterial);
export const earth = new THREE.Mesh(earthShape, earthMaterial);
export const mars = new THREE.Mesh(marsShape, marsMaterial);
export const jupiter = new THREE.Mesh(jupiterShape, jupiterMaterial);
export const saturn = new THREE.Group();
export const uranus = new THREE.Mesh(uranusShape, uranusMaterial);
export const neptune = new THREE.Mesh(neptuneShape, neptuneMaterial);
saturn.add(planet, ring);
