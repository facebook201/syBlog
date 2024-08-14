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

// const fragment = `
//   varying vec2 vUv;
//   uniform vec3 color;
//   uniform float uTime;
//   void main() {
//     vec3 color1 = vec3(1.0, 1.0, 0.0);
//     vec3 color2 = vec3(0.0, 1.0, 1.0);
//     // float mixer = length(vUv - vec2(0.5));
//     float mixer = length(fract(vUv * 10.0) - vec2(0.5));
//     float radius = 0.5 * (sin(uTime) * 0.5 + 0.5);
//     mixer = step(radius, mixer);
//     vec3 color = mix(color1, color2, mixer);
//     gl_FragColor = vec4(color, 1.0);
//   }
// `;

const fragment = `
  varying vec2 vUv;
  uniform vec3 color;
  uniform float uTime;

  float aastep(float threshold, float value) {
      float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
      return smoothstep(threshold-afwidth, threshold+afwidth, value);
      return step(threshold, value);
  }

  void main() {
    // float strength = aastep(0.25, distance(vUv, vec2(0.5)));
    float strength = aastep(0.01, abs(distance(vUv, vec2(0.5)) - 0.2));
    vec3 color = vec3(strength);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// geometry = new THREE.SphereGeometry(1, 40, 40);
// geometry = new THREE.BoxGeometry(1, 1);
geometry = new THREE.PlaneGeometry(1, 1);

material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uTime: { value: 0 }
  },
  extensions: {
    derivatives: true,
  },
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// let clock = new THREE.Clock();
time = 0;
function render() {
  time += 0.05;
  material.uniforms.uTime.value = time;
  // time = clock.getElapsedTime();
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
