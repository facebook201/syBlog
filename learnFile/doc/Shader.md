#### Shader

##### 1. 什么是 Shader

Shader（着色器）是一段运行在 GPU 上的程序，用于实现图像渲染。Shader 程序通常由两部分组成：顶点着色器（Vertex Shader）和片段着色器（Fragment Shader）。

顶点着色器负责处理顶点的位置和属性，例如顶点的坐标、颜色、法线等。片段着色器负责处理每个像素的颜色和属性，例如像素的颜色、光照效果等。

##### 2. Shader 的编写

Shader 的编写通常使用 GLSL（OpenGL Shading Language）语言。GLSL 是一种基于 C 语言的编程语言，用于编写 Shader 程序。

```glsl
// 顶点着色器
attribute vec4 position;
attribute vec4 color;
varying vec4 vColor;
void main() {
    gl_Position = position;
    vColor = color;
}

// 片段着色器
precision mediump float;
varying vec4 vColor;
void main() {
    gl_FragColor = vColor;
}
```

#### 三种修饰符 attribute uniform varying

- attribute 修饰符用于声明顶点着色器中的属性变量，这些变量通常用于传递顶点的位置、颜色、法线等属性。
  attribute 变量只能用于顶点着色器中，并且只能在顶点着色器中使用。
- uniform 修饰符用于声明全局变量，这些变量可以在顶点着色器和片段着色器中共享。uniform 变量通常用于传递材质属性、光照参数等。
- varying 修饰符用于声明顶点着色器和片段着色器之间的变量，这些变量可以在顶点着色器中计算，然后在片段着色器中使用。varying 变量通常用于传递顶点的颜色、法线等属性。

#### 颜色突变

```js
varying vec2 vUv;
void main() {
    /*
     * 这里的代码非常不好理解
     * key!!! shader的代码是单独每个顶点或片元单独执行的，这里的vUv是每个片元各自的值
     * 我们可以把它理解为将不同位置的数值带入代码然后分析呈现的效果
     * 所以下面的代码会呈现 渐变 的效果
     **/
    gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
}
```

内置 GLSL 的内置函数做出颜色突变的效果，借助 step（edge，x）函数。如果 x 大于 edge，返回 0.0，小于就返回 1.0

```js
void main() {
    float color = step(0.5, vUv.x);
    // 所以这里大于0.5的就是白色，小于就是黑色，所以是黑白各一半
    gl_FragColor = vec4(vec3(color), 1.0);
}

void main() {
    // length 获取向量的长度
    float dist = length(vUv);
    // 黑白一半
    vec3 color = vec3(step(0.5, dist));
    gl_FragColor = vec4(color, 1.0);
}

// 居中显示
void main() {
    // 原点居中
    float dist = length(vUv - vec2(0.5));
    float radius = 0.5;
    // 黑白一半
    vec3 color = vec3(step(0.5, dist));
    gl_FragColor = vec4(color, 1.0);
}

// 动态变化的圆
 varying vec2 vUv;
  uniform vec3 color;
  uniform float uTime;
  void main() {
    float dist = length(vUv - vec2(0.5));
    // 控制半径在0-1之间变化
    float radius = 0.5 * (sin(uTime) * 0.5 + 0.5);
    // 黑白一半
    vec3 color = vec3(step(radius, dist));
    gl_FragColor = vec4(color, 1.0);
  }

// shader 的抗锯齿效果
float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
    return step(threshold, value);
}

void main() {
  // float strength = aastep(0.25, distance(vUv, vec2(0.5)));
  float strength = aastep(0.01, abs(distance(vUv, vec2(0.5)) - 0.2));
  vec3 color = vec3(strength);
  gl_FragColor = vec4(color, 1.0);
}
```
