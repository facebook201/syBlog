
precision mediump float;

// 屏幕宽高值
uniform vec2 u_resolution;
// 鼠标的坐标值
uniform vec2 u_mouse;
// y运行时间
uniform float u_time;

void main() {
  // 归一化坐标 映射到 RGBA 颜色值
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  // 移动原点到中心位置
  st -= 0.5;

  // 调整宽高比
  st.x *= u_resolution.x / u_resolution.y;

  // 获取st的长度
  float r = length(st);
  float c = smoothstep(0.3, 0.3, r);
  // r 大于 0.3时= 1 否则就是0
  float d = step(0.3, r);

  gl_FragColor = vec4(vec3(d,d,d), 1.0);
}
