
#define PI 3.14159265359

// 随机数
float random(vec2 st) {
  // 43758.5453123 是一个经验值
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random1(float x) {
  return fract(sin(x * 1000.0) * 43758.5453123);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);

  float a = random1(i);
  float b = random1(i + 1.0);

  float u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u);
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
 // 归一化 [-1, 1] 中心点 0,0
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

  vec3 color = mix(vec3(1.0), vec3(0.0), step(0.0, uv.y));

  fragColor = vec4(color, 1.0);
}


// 扩大坐标系 奇数行右移动0.5
vec2 brickTitle(vec2 uv, float zoom) {
  uv *= zoom;
  uv.x += step(1.0, mod(uv.y, 2.0)) * 0.5;
  return fract(uv);
}

float box(vec2 st, vec2 size) {
  size = vec2(0.5) - size * 0.5;
  vec2 uv = smoothstep(size, size + vec2(0.01), st);
  uv *= smoothstep(size, size + vec2(1e-4), vec2(1.0) - st);
  return uv.x * uv.y;
}

// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//   // 归一化 [-1, 1] 中心点 0,0
//   vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
//   vec3 color = vec3(0.0);

//   uv = brickTitle(uv, 5.0);

//   color = vec3(box(uv, vec2(0.9)));

//   fragColor = vec4(color, 1.0);
// }
// void mainImage(out vec4 fragColor, in vec2 fragCoord){
//     vec2 st = fragCoord / iResolution.xy;
//     vec3 color = vec3(0.0);
//     vec2 pos = st - vec2(0.5);

//     float r = length(pos)*2.0;
//     float a = atan(pos.y, pos.x);

//     float f = cos(a*1.);
//     // f = abs(cos(a*3.));
//     // f = abs(cos(a*2.5))*.5+.3;
//     // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
//     // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

//     color = vec3(smoothstep(f,f+0.02,r));
//     fragColor = vec4(color, 1.0);
// }
