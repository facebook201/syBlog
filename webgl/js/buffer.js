import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

const spector = new SPECTOR.Spector();
spector.displayUI();


let scene, renderer, gui, camera, plight, ballMesh, controls;

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;//设置为SRGB颜色空间

  renderer.outputColorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
  renderer.toneMappingExposure = 1.25; // 渲染器色调映射曝光

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 100);
  controls = new OrbitControls(camera, renderer.domElement);
  scene.add(new THREE.AxesHelper(1000));

  createCube();
  // new HDRCubeTextureLoader()
  //   .setPath('./file/pisaHDR/')
  //   .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
  //     function (texture ) {
  //       // scene.environment = texture;
  //     }
  //   );
  // initGui();
  animate();
}

function createCube() {
  const cubes = 10000;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  for (let i = 9; i < cubes; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
    scene.add(cube);
  }
}


function initGui() {
  gui = new GUI({ title: 'materialColor' });
  gui.open();
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}



init();
console.log(scene)
