
// 引入three.js
import * as THREE from '../../../../three.js-r123/build/three.module.js';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from '../math.js'
import { gridPoint } from './gridPoint.js'
import  config  from './config.js'

// 渲染一个国家的球面轮廓内网格点(一个国家多边形轮廓数量 >= 1)
// R:球面半径
// worldData:world.json中所有国家边界轮廓的经纬度数据
function landPoints(R,worldData) {
  var pointsArr = gridPoint(worldData);//陆地网格点阵数据经纬度坐标
  var spherePointsArr = [];//经纬度pointsArr数据转球面坐标spherePointsArr
  var colorsArr = [];//顶点颜色数据
  pointsArr.forEach((point) => {
    var pos = lon2xyz(R * 1.001, point[0], point[1]);
    spherePointsArr.push(pos.x, pos.y, pos.z);
    var gb = Math.cos(point[1] * Math.PI / 180); //0~90 维度越高 亮度越低  
    gb = Math.sqrt(gb);
    colorsArr.push(0,gb,gb)
  });
  var geometory = new THREE.BufferGeometry();
  geometory.attributes.position = new THREE.BufferAttribute(new Float32Array(spherePointsArr), 3);
  geometory.attributes.color = new THREE.BufferAttribute(new Float32Array(colorsArr), 3);    
  var material = new THREE.PointsMaterial({
    // color: 0x00aaaa,
    vertexColors: THREE.VertexColors, //使用顶点颜色数据渲染
    size:config.size,
  });
  var points = new THREE.Points(geometory, material);
  return points;
}

export { landPoints };