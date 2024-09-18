import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';


let scene, renderer, gui, camera, plight, ballMesh, controls;

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
  // controls = new OrbitControls(camera, renderer.domElement);

  // scene.add(new THREE.AxesHelper(1000));

  // 点光源
  plight = new THREE.DirectionalLight(0x4b2725, 80);
  plight.position.set(-100, 0, 60);
  scene.add(plight);

  // const lightHelper = new THREE.DirectionalLightHelper(plight, 10);
  let plight1 = new THREE.DirectionalLight(0x3b2e37, 40);
  plight1.position.set(50, 0, 20);
  scene.add(plight1);

  let aLight = new THREE.AmbientLight(0x3b2e37, 30);
  scene.add(aLight);

  new HDRCubeTextureLoader()
    .setPath('./file/pisaHDR/')
    .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
      function (texture ) {
        scene.environment = texture;
      }
    );
  paddedBall();
  // rockBall();
  initGui();
  animate();
}

function paddedBall() {
  const texLoader = new THREE.TextureLoader();
  const texture = texLoader.load('./file/ball1/older-padded-leather_albedo.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);

  // map对应刚才下载的albedo
  // normal map 对应 normal
  // displace map对应height，并将值调为0.01
  // rough 对应roughness
  // metal 对应metallic

  const rMap = texLoader.load('./file/ball1/older-padded-leather_roughness.png');
  rMap.wrapS = rMap.wrapT = THREE.RepeatWrapping;
  rMap.repeat.set(4, 2);

  const nMap = texLoader.load('./file/ball1/older-padded-leather_normal-ogl.png');
  nMap.wrapS = nMap.wrapT = THREE.RepeatWrapping;
  nMap.repeat.set(4, 2);

  const metalMap = texLoader.load('./file/ball1/older-padded-leather_metallic.png');
  metalMap.wrapS = metalMap.wrapT = THREE.RepeatWrapping;
  metalMap.repeat.set(4, 2);

  const aoMap = texLoader.load('./file/ball1/older-padded-leather_ao.png');
  aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(4, 2);

  const heightMap = texLoader.load('./file/ball1/older-padded-leather_height.png');
  heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
  heightMap.repeat.set(4, 2);

  let ballGeo = new THREE.SphereGeometry(25, 64, 64);
  // let ballMat = new THREE.MeshPhysicalMaterial({
  let ballMat = new THREE.MeshStandardMaterial({
    map: texture,
    normalMap: nMap,
    roughnessMap: rMap,
    aoMap: aoMap,
    // displacementMap: heightMap,
    metalnessMap: metalMap,
    roughness: 1, // 粗糙度
    metalness: 0, // 金属度
    normalScale: new THREE.Vector2(2.0, 2.0),
  });


  ballMesh = new THREE.Mesh(ballGeo, ballMat);
  ballMesh.position.set(0, 0, 0);
  scene.add(ballMesh);
}

function rockBall() {
  const texLoader = new THREE.TextureLoader();
  const texture = texLoader.load('./file/balls/dry-rocky-ground_albedo.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);

  // map对应刚才下载的albedo
  // normal map 对应 normal
  // displace map对应height，并将值调为0.01
  // rough 对应roughness
  // metal 对应metallic

  const rMap = texLoader.load('./file/balls/dry-rocky-ground_roughness.png');
  rMap.wrapS = rMap.wrapT = THREE.RepeatWrapping;
  rMap.repeat.set(4, 2);

  const nMap = texLoader.load('./file/balls/dry-rocky-ground_normal-ogl.png');
  nMap.wrapS = nMap.wrapT = THREE.RepeatWrapping;
  nMap.repeat.set(4, 2);

  const metalMap = texLoader.load('./file/balls/dry-rocky-ground_metallic.png');
  metalMap.wrapS = metalMap.wrapT = THREE.RepeatWrapping;
  metalMap.repeat.set(4, 2);

  const aoMap = texLoader.load('./file/balls/dry-rocky-ground_ao.png');
  aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(4, 2);

  const heightMap = texLoader.load('./file/balls/dry-rocky-ground_height.png');
  heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
  heightMap.repeat.set(4, 2);

  let ballGeo = new THREE.SphereGeometry(20, 64, 64);
  // let ballMat = new THREE.MeshPhysicalMaterial({
  let ballMat = new THREE.MeshStandardMaterial({
    map: texture,
    normalMap: nMap,
    roughnessMap: rMap,
    aoMap: aoMap,
    displacementMap: heightMap,
    metalnessMap: metalMap,
    roughness: 1, // 粗糙度
    metalness: 0, // 金属度
    normalScale: new THREE.Vector2(2.0, 2.0),
  });


  ballMesh = new THREE.Mesh(ballGeo, ballMat);
  ballMesh.position.set(10, 0, 0);
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

  // materialFolder.add(ballMesh, 'metalness', 0, 1).onChange(function() {
  //   updateMaterial();
  // });
  // materialFolder.add(ballMesh, 'roughness', 0, 1).onChange(function() {
  //   updateMaterial()
  // });
  gui.open();
}

let a = 0;
function animate() {
   ballMesh.rotation.y += 0.002;
  // controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// function updateMaterial() {
//   ballMat.side = Number(ballMat.side);
//   ballMat.needsUpdate = true;
// }

init();

