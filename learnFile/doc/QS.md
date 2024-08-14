
##### 1、球形表面不平滑？

SphereGeometry 设置水平和垂直分段的值。使得表面更平滑。
```js
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    roughness: 0.3, //粗糙度
  });

 const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(30, 50, 50),
    material
  );
```

#### 阴影效果
```js
1..castShadow设置产生阴影的模型对象
2..castShadow设置产生阴影的光源对象
3..receiveShadow设置接收阴影效果的模型
4..shadowMap.enabledWebGl渲染器允许阴影渲染
5..shadow.camera设置光源阴影渲染范围

// 设置三维场景计算阴影的范围
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 100;

// 设置阴影 
light.shadow.mapSize // 阴影贴图尺寸属性(提升边缘渲染效果)
light.shadow.radius // 弱化模糊阴影边缘
```
