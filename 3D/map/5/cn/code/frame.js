/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 光源设置
 */
 // 平行光1
 var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
 directionalLight.position.set(400, 200, 300);
 scene.add(directionalLight);
 // 平行光2
 var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
 directionalLight2.position.set(-400, -200, -300);
 scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambient);
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(11, 280, 299); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
var controls = new THREE.OrbitControls(camera, renderer.domElement);
