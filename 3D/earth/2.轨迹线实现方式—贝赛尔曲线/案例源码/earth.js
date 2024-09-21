// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
import config from './config.js'
// import flyPath from './flyPath.js'
import {help,flyPath} from './flyPath.js'
var R = config.R;//地球半径
var earth = new THREE.Group();//地球组对象
earth.add(createSphereMesh(R));//球体Mesh插入earth对象中
earth.add(help);//help插入earth对象中
earth.add(flyPath);//轨迹线flyPath插入earth对象中

// r：地球半径
function createSphereMesh(r) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('earth.jpg');//加载纹理贴图
  var geometry = new THREE.SphereBufferGeometry(r, 40, 40); //创建一个球体几何对象
  //材质对象Material
  var material = new THREE.MeshLambertMaterial({
    color: 0x006666,
    // map: texture,//设置地球颜色贴图map
    transparent: true,
    opacity: 0.5, //半透明用于辅助调试
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

export { earth }