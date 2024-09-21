// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
// 创建一个小球用于可视化某个位置点
function sphereMesh(r,position,color) {
  var geometry = new THREE.SphereGeometry(r, 25, 25); //创建一个球体几何对象
  var material = new THREE.MeshLambertMaterial({
    color: color
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.copy(position);
  return mesh
}
/*为了方便你观察和学习，下面通过球和箭头对一些几何数据进行标注*/
function helpView(r,startPoint,endPoint) {
  var group = new THREE.Group();//小球和箭头的父对象
  /*轨迹线起点、结束点标注*/
  group.add(sphereMesh(r,startPoint,0xff0000));//圆弧飞线起点
  group.add(sphereMesh(r,endPoint,0xff0000));//圆弧飞线结束点
  return group
}

export {helpView}