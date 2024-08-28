
#### 首先创建好 threejs 初始化场景。


#### 创建好一个 plane，设置 shaderMaterial，并设置好 uniforms。

```js
const h = window.innerHeight;
const w = window.innerWidth;

const uniforms = {
  resolution: {
    value: new THREE.Vector2(w, h)
  },
  iTime: {
    type: "f",
    value: 1.0
  },
  iResolution: {
    type: "v2",
    value: new THREE.Vector2()
  },
  iMouse: {
    type: "v2",
    value: new THREE.Vector2()
  }
};

const geometry = new THREE.PlaneBufferGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
});

var mesh = new THREE.Mesh(geometry, material );
scene.add( mesh );

window.addEventListener("touchmove", function (e) {
  uniforms.iMouse.value.x = e.clientX;
  uniforms.iMouse.value.y = e.clientY;
}

function render() {
  uniforms.iTime.value += 0.05;
  renderer.render(scene, camera);
}
```

#### 3、传入着色器代码

首先是顶点着色器，所有的 shaderToy 代码都是基于片元着色器代码进行书写的。它就是对片元着色器编程。

```js
const fragmentShader = `
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  void mainImage(out vec4 fragColor, in vec2 fragCoord);
  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;
```

#### 4、将着色器代码传入 shaderMaterial

```js
material.fragmentShader = fragmentShader;
```


#### 5 Shader Toy 内置全局变量

* gl_FragCoord：当前片元的坐标（x 和 y 分量）。
* gl_FragColor：当前片元的颜色（RGBA 格式）。
* gl_FragDepth：当前片元的深度值。
* iResolution：屏幕分辨率（宽高）像素值，与视口尺寸相关
* iTime：当前时间，着色器加载开始计时
* float iTimeDelta：自上一帧到当前帧的时间间隔（以秒为单位）。
* int iFrame：当前帧的帧数，比较常用。
* float iChannelTime[4]：各个纹理通道的时间（以秒为单位）。通道0对应sampler2D iChannel0，通道1对应sampler2D iChannel1，以此类推。
* vec3 iChannelResolution[4]：各个纹理通道的分辨率（宽度、高度和深度）。通道0对应sampler2D iChannel0，通道1对应sampler2D iChannel1，以此类推。
* samplerXX iChannel0、samplerXX iChannel1、samplerXX iChannel2、samplerXX iChannel3：纹理通道，其中XX表示纹理的类型（如sampler2D表示二维纹理）。
* iMouse：用于获取鼠标的位置和状态信息。它是一个包含四个分量的vec4类型变量，分别表示鼠标的坐标（x 和 y 分量）以及左右键的按下状态（z 和 w 分量）。

#### 6、片元着色器代码

```js
const fragmentShader = `
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  void mainImage(out vec4 fragColor, in vec2 fragCoord);
  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  
}