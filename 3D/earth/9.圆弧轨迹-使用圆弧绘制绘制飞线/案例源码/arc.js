// 引入Three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
/**
* 创建线条模型
*/
var geometry = new THREE.BufferGeometry(); //声明一个几何体对象BufferGeometry
//参数：0, 40 圆弧圆心坐标    150：圆弧半径    Math.PI/6, Math.PI-Math.PI/6：圆弧起始角度
var arc = new THREE.ArcCurve(0, 40, 150, Math.PI / 6, Math.PI - Math.PI / 6, false);//逆时针绘制一个半圆弧
//getSpacedPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getSpacedPoints(50); //分段数50，返回51个顶点
// setFromPoints方法改变的是BufferGeometry.attributes.position属性
geometry.setFromPoints(points);
// console.log('查看几何体顶点坐标',geometry.attributes.position);
//材质对象
var material = new THREE.LineBasicMaterial({
    color: 0x009999,
});
//线条模型对象
var line = new THREE.Line(geometry, material);

line.y = 40;//圆心y坐标
line.R = 150;//圆弧半径
line.startAngle = Math.PI / 6;//圆弧开始角度
line.endAngle = Math.PI - Math.PI / 6;//圆弧结束角度
export default line