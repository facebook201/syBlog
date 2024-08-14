import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let scene, camera, renderer, controls, gui, material, plane, geometry, mesh, time = 0;
let w = window.innerWidth;
let h = window.innerHeight;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.position.set(0, 0, 3);

// 渲染器
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor("#e6fcf5", 1);
document.getElementById("webgl").appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);

// 着色器
const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
`;

geometry = new THREE.SphereGeometry(1, 30, 30);
material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  wireframe: true,
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let clock = new THREE.Clock();

function render() {
  time = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
})


// function animate() {
//   plane.rotation.y += 0.01;
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// }
// animate();
