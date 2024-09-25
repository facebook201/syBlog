
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.position.set(0, 0, 4);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
renderer.setClearColor(0xAFEEEE, 1);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const box = new THREE.BoxGeometry(1, 1);

/**
 * uv 表示顶点UV映射的横纵坐标
 */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float u_time;
  void main() {
    gl_FragColor = vec4(vUv.x, vUv.y, abs(sin(u_time)),  1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 0.0 }
  },
  // wireframe: true,
});

const cube = new THREE.Mesh(box, material);
scene.add(cube);

let time = 0;

function render() {
  time += 0.01;
  material.uniforms.u_time.value = time;
  cube.rotation.x = time;
  cube.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function screenShot() {
  renderer.render(scene, camera)
  composer.render()
  const base64 = renderer.domElement.toDataURL(['image/png', '0.8'])
  const link = document.createElement('a');
  link.href = base64;
  link.download = 'myImage.png';
  link.click();
}

render();