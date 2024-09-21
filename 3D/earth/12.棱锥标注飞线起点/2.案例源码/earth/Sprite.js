// 引入three.js
import * as THREE from 'three';
import config from '../config.js'
var R = config.R;//地球半径
// TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('./static/地球光圈.png');//加载纹理贴图
// 创建精灵材质对象SpriteMaterial
var spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
  transparent: true,//开启透明
  opacity: 0.5,//可以通过透明度整体调节光圈
});
// 创建表示地球光圈的精灵模型
var sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(R * 3.0, R * 3.0, 1);//适当缩放精灵
// sprite.scale.set(R*4.0, R*4.0, 1);//光圈相比较地球偏大

export default sprite 