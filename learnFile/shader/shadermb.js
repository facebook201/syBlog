import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.01, 100);
camera.position.set(0, 0, 1.4);

const vertexShader = /* GLSL */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 newPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* GLSL */ `
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }
`;

const geometry = new THREE.PlaneGeometry(1, 1, 30, 30);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader,
  fragmentShader,
  wireframe: true,
});


const renderer = new THREE.WebGLRenderer({
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
document.getElementById("webgl").appendChild(renderer.domElement);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const clock = new THREE.Clock();
function render() {
  const time = clock.getElapsedTime();
  material.uniforms.uTime.value = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
