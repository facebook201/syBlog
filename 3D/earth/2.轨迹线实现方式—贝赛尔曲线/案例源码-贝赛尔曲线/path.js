// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
/**
 * 创建线条模型
 */
var geometry = new THREE.BufferGeometry();

var p1 = new THREE.Vector3(-80, 0, 0);
var p2 = new THREE.Vector3(-40, 100, 0);
var p3 = new THREE.Vector3(40, 100, 0);
var p4 = new THREE.Vector3(80, 0, 0);
// 三维三次贝赛尔曲线
var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
//getSpacedPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
var pointsArr = curve.getSpacedPoints(100);//曲线上返回一定数量点
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(pointsArr);
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x00ffff
});
//线条模型对象
var path = new THREE.Line(geometry, material);

// 通过辅助线和点，查看贝塞尔曲线CubicBezierCurve3的控制规律
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(p1, p2, p3, p4)
var material2 = new THREE.PointsMaterial({
  color: 0xff00ff,
  size: 10,
});
//点模型对象
var points = new THREE.Points(geometry2, material2);
path.add(points); //点模型对象添加到场景中
path.add(new THREE.Line(geometry2, material2));


export { path }