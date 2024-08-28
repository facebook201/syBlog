
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let w = window.innerWidth;
let h = window.innerHeight;

let camera, scene, renderer;

const uniforms = {
  resolution: {
    value: new THREE.Vector2(w, h)
  },
  iTime: {
    type: "f",
    value: 1.0
  },
  iResolution: {
    value: new THREE.Vector2(w, h)
  },
  iMouse: {
    type: "v2",
    value: new THREE.Vector2()
  }
};

// shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  void main() {
    float t = iTime;
    vec2 r = iResolution.xy;
    vec3 c;
    float l, z = t;
    for(int i = 0; i < 3; i++) {
      vec2 uv, p = gl_FragCoord.xy / r;
      uv = p;
      p -= 0.5;
      p.x *= r.x / r.y;
      z += 0.07;
      l = length(p);
      uv += p / l *(sin(z) + 1.0) *abs(sin(l*9.0 - z*2.0));
      c[i] = 0.01 / length(abs(mod(uv,1.) - 0.5));
    }
    gl_FragColor = vec4(c/l, t);
  }
`;


function init() {
  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = 1;
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    // antialias: true,
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('webgl').appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  setPlane();
}


function setPlane() {
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}

let tTime = 0;

function render() {
  tTime += 0.01;
  uniforms.iTime.value = tTime;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener("touchmove", function (e) {
  uniforms.iMouse.value.x = e.clientX;
  uniforms.iMouse.value.y = e.clientY;
});

init();
render();
