
var meshArr = [];// 声明一个变量，存储所有省份的Mesh，用于射线拾取
var chooseMesh = null; //表示飞线发射中心对应的省份吗esh

function lineFun(childAreaArr, mapGroup) {
  var group = new THREE.Group()
  var material = new THREE.LineBasicMaterial({
    color: 0x00cccc, //边界Line颜色
  })
  childAreaArr.forEach((childArea, i) => {
    childArea.geo.forEach((vertices) => {
      var newVertices = []
      vertices.forEach((v2, i) => {
        newVertices.push(new THREE.Vector3(v2.x, v2.y, 0))
      });
      var geometry = new THREE.Geometry()
      geometry.vertices = newVertices; // 设置几何体顶点位置坐标
      var line = new THREE.LineLoop(geometry, material);
      group.add(line); //子行政单元childArea边界轮廓Line插入组对象mapGroup

    });
  });
  return group
}


function extrudeMeshFun(childAreaArr, mapGroup, h) {
  childAreaArr.forEach((childArea, i) => {
    var shapeArr = []
    childArea.geo.forEach((vertices) => {
      var shape = new THREE.Shape(vertices);
      shapeArr.push(shape)
    });
    var geometry = new THREE.ExtrudeGeometry(shapeArr,
      //拉伸参数
      {
        amount: h, //拉伸长度
        curveSegments: 35, //拉伸轮廓细分数
        bevelEnabled: false //无倒角
      }
    );
    var material = new THREE.MeshPhongMaterial({
      color: 0x004444,
      // transparent: true,
      // opacity: 0.8,
    }); //材质对象
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象
    mapGroup.add(mesh);
    // 河南是默认发射点，颜色比其他省份颜色更亮一些进行标识
    if (childArea.name == '河南') {
      mesh.material = new THREE.MeshPhongMaterial({
        color: 0x006666,
      });
      chooseMesh = mesh;
    }
    meshArr.push(mesh);
    mesh.name = childArea.name;//设置网格模型对应的省份名字
  });
}
//提取行政区域所有子区域边界数据
function childAreaArrFun(data) {
  var childAreaArr = [];
  data.features.forEach(function(childArea) {
    var area = {
      geo: [],
      name: childArea.properties.name,
    };
    childAreaArr.push(area);
    // "Polygon"：子行政单元childArea有一个封闭轮廓
    if (childArea.geometry.type === "Polygon") {
      area.geo[0] = [];
      childArea.geometry.coordinates[0].forEach(elem => {
        area.geo[0].push(new THREE.Vector2(elem[0], elem[1]))
      });
      //"MultiPolygon"：子行政单元childArea有多个封闭轮廓
    } else if (childArea.geometry.type === "MultiPolygon") {
      // 解析所有封闭轮廓边界坐标childArea.geometry.coordinates
      childArea.geometry.coordinates.forEach((range, index) => {
        area.geo[index] = [];
        range[0].forEach(elem => {
          area.geo[index].push(new THREE.Vector3(elem[0], elem[1], 0))
        });
      });
    }
  });
  return childAreaArr
}

function GeoJSON(data) {
  // 组对象mapGroup是所有子行政单元childArea边界Line的父对象
  var mapGroup = new THREE.Group();
  var childAreaArr = childAreaArrFun(data);
  var linegroup = lineFun(childAreaArr);
  mapGroup.add(linegroup)
  var maxL = centerCamera(mapGroup, camera);
  var h = maxL * 0.01; //轮廓拉伸高度
  extrudeMeshFun(childAreaArr, mapGroup, h)
  var linegroup2 = linegroup.clone();
  linegroup2.position.z = h + h * 0.01;
  linegroup.position.z = -h * 0.01;
  mapGroup.add(linegroup2)
  return mapGroup;
}
/*centerCamera：模型居中,同时调整正投影相机渲染范围*/
function centerCamera(mapGroup, camera) {
  // 地图mapGroup的包围盒计算
  var box3 = new THREE.Box3(); //创建一个包围盒
  box3.expandByObject(mapGroup); // .expandByObject()方法：计算层级模型group包围盒
  var center = new THREE.Vector3(); //scaleV3表示包围盒的几何体中心
  box3.getCenter(center); // .getCenter()计算一个层级模型对应包围盒的几何体中心
  // console.log('查看几何中心', center);
  // 重新设置模型的位置
  mapGroup.position.x = mapGroup.position.x - center.x;
  mapGroup.position.y = mapGroup.position.y - center.y;
  mapGroup.position.z = mapGroup.position.z - center.z;


  /*可以根据中国地图mapGroup的包围盒尺寸设置相机参数s */
  var scaleV3 = new THREE.Vector3(); //scaleV3表示包围盒长宽高尺寸
  box3.getSize(scaleV3) // .getSize()计算包围盒长宽高尺寸
  console.log('查看包围盒尺寸', scaleV3)
  // frame.js文件中var s = 150; 150更改为scaleV3.x/2
  var maxL = maxLFun(scaleV3);
  //重新设置s值 乘以0.5适当缩小显示范围，地图占canvas画布比例更大，自然渲染范围更大
  s = maxL / 2 * 0.5;
  camera.left = -s * k;
  camera.right = s * k;
  camera.top = s;
  camera.bottom = -s;
  //更新相机视图矩阵
  camera.updateProjectionMatrix();
  return maxL
}
// 计算包围盒的最大边长
function maxLFun(v3) {
  var max;
  if (v3.x > v3.y) {
    max = v3.x
  } else {
    max = v3.y
  }
  if (max > v3.z) {} else {
    max = v3.z
  }
  return max;
}
