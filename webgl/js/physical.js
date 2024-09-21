import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';


let scene, renderer, gui, material, camera, plight, ballMesh, controls;

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.outputColorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
  renderer.toneMappingExposure = 1.25; // 渲染器色调映射曝光

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 100);
  controls = new OrbitControls(camera, renderer.domElement);
  // scene.add(new THREE.AxesHelper(1000));

  // 点光源
  plight = new THREE.DirectionalLight(0x4b2725, 80);
  plight.position.set(-100, 0, 60);
  // scene.add(plight);

  let aLight = new THREE.AmbientLight(0x3b2e37, 30);
  scene.add(aLight);

  new HDRCubeTextureLoader()
    .setPath('./file/pisaHDR/')
    .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
      function (texture ) {
        scene.background = texture;
        scene.environment = texture;
      }
    );
  paddedBall();
  initGui();
  animate();
}

function paddedBall() {
  const s = new THREE.SphereGeometry(10, 32, 32);
  material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05, // 粗糙度
    transmission: 1, // 透明度
    thickness: 0.1, // 厚度
    iridescence: 1, // 洛伦兹反射
    reflectivity: 1, // 反射率
    iridescenceIOR: 1.3, // 洛伦兹反射率
  });

  ballMesh = new THREE.Mesh(s, material);
  scene.add(ballMesh);
}

function initGui() {
  gui = new GUI({ title: 'materialColor' });
  const materialFolder = gui.addFolder('material');

  const obj = {
    color:0x00ffff,
  };

  materialFolder.addColor(obj, 'color').onChange(function(value) {
    ballMesh.material.color.set(value);
  })

  gui.add(material, 'iridescence', 0, 1).name('彩虹色');
  gui.add(material, 'reflectivity', 0, 1).name('彩虹色');
  gui.add(material, 'iridescenceIOR', 0, 3).name('反射率');


  gui.open();
}

let a = 0;
function animate() {
  ballMesh.rotation.y += 0.002;
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
