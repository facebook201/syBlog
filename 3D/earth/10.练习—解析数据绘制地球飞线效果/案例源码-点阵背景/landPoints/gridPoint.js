
import { pointInPolygon } from './pointInPolygon.js'//判断点是否在多边形中
import  config  from './config.js'

// worldData:所有国家边界轮廓的经纬度数据
function gridPoint(worldData) {

  var 间距 = config.sp; //网格数据间隔经纬度度数
  var 经向分割数 = Math.ceil(360 / 间距)
  var 纬向分割数 = Math.ceil(180 / 间距)
  // console.log('纬向分割数',纬向分割数)
  var 网格数据 = [];//通过双层for循环生成点阵网格数据
  for (var i = 0; i < 经向分割数 - 1; i++) {
    for (var j = 0; j < 纬向分割数 - 1; j++) {
      网格数据.push([-180 + i * 间距, -90 + j * 间距]);
    }
  }

  var 陆地网格数据 = [];//处理所有网格数据，仅保留位于国家轮廓内部的数据，也就是保留和陆地重合的网格点阵数据
  // 访问所有国家边界坐标数据：worldData.features
  worldData.features.forEach(function (country) {
    // "Polygon"：国家country有一个封闭轮廓
    //"MultiPolygon"：国家country有多个封闭轮廓
    if (country.geometry.type === "Polygon") {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      country.geometry.coordinates = [country.geometry.coordinates];
    }
    // 一个国家包含多个多边形轮廓polygon(>=1)
    country.geometry.coordinates.forEach(function (polygon) {
      polygon = polygon[0];
      网格数据.forEach(function (point) {
        //  pointInPolygon(point,polygon)：判断点point是否位于多边形polygon内
        if (pointInPolygon(point, polygon)) {
          陆地网格数据.push(point);//保存陆地网格数据
        }
      })
    });
  });
  return 陆地网格数据;
}
export { gridPoint };