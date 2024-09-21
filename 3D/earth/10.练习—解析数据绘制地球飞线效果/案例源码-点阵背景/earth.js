// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
import { landPoints } from './landPoints/index.js';//每个国家对应球面Mesh
import config from './config.js'
var R = config.R;//地球半径

// R：地球半径
function createSphereMesh(r) {
  var geometry = new THREE.SphereBufferGeometry(r, 40, 40); //创建一个球体几何对象
  //材质对象Material
  // MeshBasicMaterial MeshLambertMaterial  MeshPhongMaterial
  var material = new THREE.MeshLambertMaterial({
    color: 0x001111,
    transparent:true,
    opacity:0.5,//半透明球
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

// 创建一个地球总对象earthGroup
var earthGroup = new THREE.Group();//地球组对象
  earthGroup.add(createSphereMesh(R));//球体Mesh插入earthGroup中

  var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
  loader.setResponseType('json');
  // 异步加载包含世界各个国家边界坐标的GeoJSON文件：world.json
  loader.load('./world.json', function (data) {
    var points = landPoints(R,data);//渲染陆地上网格点阵数据
    earthGroup.add(points);
  })
var earth = earthGroup;

export { earth }