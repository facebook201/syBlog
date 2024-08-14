import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';



const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 0);

const group = new THREE.Group();
group.add(mesh);
group.position.x = 50;

export default group;

function initGUI() {
  // GUI调试
  const gui = new GUI();
  // 光照强度
  gui.add(ambient, 'intensity', 0, 2).name('环境光');
  gui.add(light, 'intensity', 0, 2).name('平行光');

  // 物体的位置
  gui.add(cube.position, 'x', 0, 180);
  gui.add(cube.position, 'y', 0, 180);
  gui.add(cube.position, 'z', 0, 180);

  // 改变物体颜色
  gui.addColor(params, 'color').onChange(v => {
    cube.material.color.set(v);
  });

  gui.open();
}

// initGUI();