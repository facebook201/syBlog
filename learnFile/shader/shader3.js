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
const noise = `
//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

const vertexShader = /* GLSL */ `
uniform float uTime;
varying vec3 vNormal;
uniform float uFrequency;

// 3D Randomness
// https://www.shadertoy.com/view/WljBDh
float random(vec3 pos){
  return fract(sin(dot(pos, vec3(64.25375463, 23.27536534, 86.29678483))) * 59482.7542);
}

${noise}

void main() {
  vec3 newPos = position;

  float noise = cnoise(position * uFrequency + uTime);
  newPos += normal * noise * 1.0;
  vNoise = noise;

  // 1. 球体放大缩小
  // newPos = position * 1.5;
  // newPos = position * sin(uTime);

  // 2. 顶点 y 坐标累加 sin 值
  // newPos.y += sin(position.y);
  // newPos.y += sin(position.y * 4.0);
  // newPos.y += sin(position.y * (sin(uTime) + 1.0) * 5.0);
  // newPos.y += sin(position.y * 1.0 + uTime * 2.0);

  // newPos.y += sin(position.y * 1.0 + uTime * 2.0);
  // newPos.x += 0.8 * sin(position.z * 0.5 + uTime * 1.0);

  // 3. noise 数值作为偏移量
  // newPos += cnoise(position);
  // newPos += normal * cnoise(position);
  // newPos += normal * cnoise(position * 0.3);
  // newPos += normal * cnoise(position * 5.0);
  // newPos += normal * cnoise(position * (sin(uTime) + 1.0) * 4.0);

  // 4. random
  //  newPos += normal * random(position);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);

  // vNormal = normal;
}
`;

const fragmentShader = /* GLSL */ `
varying vec3 vNormal;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    vec3 color = vNormal;
    gl_FragColor = vec4(color, 1.0);
}
`;

geometry = new THREE.SphereGeometry(1, 256, 256);
// geometry = new THREE.BoxGeometry(1, 1);
// geometry = new THREE.PlaneGeometry(1, 1);

material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 }
  },
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let clock = new THREE.Clock();
// time = 0;
function render() {
  // time += 0.02;
  time = clock.getElapsedTime();
  material.uniforms.uTime.value = time;
  renderer.render(scene, camera);
  controls.update();
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
