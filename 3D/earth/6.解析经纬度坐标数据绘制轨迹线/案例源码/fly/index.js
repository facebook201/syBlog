import * as THREE from '../../../../three.js-r123/build/three.module.js';
import  data  from './data.js'
import { flyArc } from './arc.js'

var flyArcGroup = new THREE.Group();
// 通过轨迹线连接洛阳和世界其它城市的飞线
//批量绘制轨迹线
data.endArr.forEach((cood) => {
  /*调用函数flyArc绘制球面上任意两点之间飞线圆弧轨迹*/
  var arcline = flyArc(data.start.E,data.start.N, cood.E,cood.N)
  flyArcGroup.add(arcline); //飞线插入flyArcGroup中
});

export {flyArcGroup};