// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js';
import config from './config.js'
var R = config.R;//地球半径

var help = new THREE.Group();

// 经纬度转球面坐标
var sphereCoord1 = lon2xyz(R, 112.45, 34.62); //洛阳经纬度112.45,34.62
var sphereCoord2 = lon2xyz(R, 12.6, 41.9); //罗马经纬度12.6, 41.9
// startPoint、endPoint：轨迹线起始点球面坐标
var startPoint = new THREE.Vector3(sphereCoord1.x, sphereCoord1.y, sphereCoord1.z);
var endPoint = new THREE.Vector3(sphereCoord2.x, sphereCoord2.y, sphereCoord2.z);
/**
 * 假设轨迹线起点startPoint、轨迹线结束点endPoint分别为A、B
 * 球心O和A、B两点构成一个平面，计算平面AOB上A、B两点对应的球面切线
 * 然后在A和B的切线上分别获取两点pA, pB用来控制贝塞尔曲线
 */
var O = new THREE.Vector3(0, 0, 0);// 球心坐标
var startDir = startPoint.clone().sub(O).normalize();//飞线起点与球心构成方向向量
var endDir = endPoint.clone().sub(O).normalize();//飞线结束点与球心构成方向向量
// 箭头绘制
// var arrow1 = new THREE.ArrowHelper(startDir, O, R, 0xffff00);
// help.add(arrow1);
// 箭头2
// help.add(new THREE.ArrowHelper(endDir, O, R, 0xffff00));

// 小球标注球心、飞线轨迹线起始点A、B
help.add(sphereMesh(startPoint))
help.add(sphereMesh(endPoint))
help.add(sphereMesh(O))

// 创建一个小球用于可视化一些位置点
function sphereMesh(position) {
  var geometry = new THREE.SphereGeometry(5, 25, 25); //创建一个球体几何对象
  var material = new THREE.MeshLambertMaterial({
    color: 0xff0000
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.copy(position);
  return mesh
}

// 首先求出两个向量的法向量
const normal = startDir.clone().cross(endDir).normalize();
// 然后根据法向量求出两个切线
const tangentA = normal.clone().cross(startDir).normalize();
const tangentB = normal.clone().cross(endDir).normalize();
// 取反方向
tangentB.multiplyScalar(-1);

// 求出起始点与终点的夹角
const angle = Math.acos(startDir.clone().dot(endDir));
// 两切线的交点是C,计算AC长度
const AC = R * Math.tan(angle / 2);

// 切线上选择的贝赛尔曲线距离切点A或B的距离
const L = AC * 0.8;

// 从两个切线上选择一个点作为贝塞尔曲线的控制点
const P1 = startPoint.clone().add(tangentA.clone().multiplyScalar(L));
const P2 = endPoint.clone().add(tangentB.clone().multiplyScalar(L));

// 画曲线
const curve = new THREE.CubicBezierCurve3(startPoint, P1, P2, endPoint);
const pointsArr = curve.getPoints(100);//曲线上返回一定数量点

var geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);//设置几何体顶点数据
var material = new THREE.LineBasicMaterial({
  color: 0x00ffff,//线条颜色
});
var flyPath = new THREE.Line(geometry, material); //绘制轨迹线
export {help,flyPath};