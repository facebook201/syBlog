

// r 方块边长的一半
float sdCube(vec2 uv, float r) {
  vec2 d = abs(uv) - r;
  float i = min(max(d.x, d.y), 0.0); // 内部
  float o = length(max(d, 0.0)); // 距离场外部
  return i + o;
}

float cubeSDF(vec2 uv) {
  float s = length(uv) -.2;
  float c = sdCube(uv - vec2(.3, 0) * sin(iTime), .2);
  return min(s, c);
}


// 圆形距离场
float circleSDF(vec2 p, float r) {
  float s = length(p) - r;
  return s;
}

// 圆形距离场
void mainImage2(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
  
  // 画一个半径为 0.2 的圆
  float cseg = circleSDF(uv, 0.2) * 10.;
  // 离散化增长段 向下取整
  float seg = floor(cseg);
  // 连续段每段取小数部分,即0-1区间内变动
  cseg -= seg;
  // 离散段绘制
  fragColor.xyz = mix(vec3(.7, .5, .3), vec3(.3, .3, .4), seg/6.);
  // 那么我减去半个segL，就得到了(-.5,.5)
  // cseg-.5
  // 取绝对值，就得到了(.5,0,.5)这样的分段值域
  // abs(cseg-.5)
  // 再用半段进行一次反转，就得到了(0,.5,0)*segL这样的分段值域
  // .5-abs(cseg-.5)
  // 最后我们就可以取低端的部分，进行阶跃描边处理了
  // step(.1,.5-abs(cseg-.5))
  fragColor = mix(vec4(0.), fragColor, smoothstep(0., 0.05, 0.5 - abs(cseg - 0.5)));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
  uv *= 2.;
  // 连续增长段
  float cseg = cubeSDF(uv) * 10.;
  // 离散化增长段
  float seg = floor(cseg);
  cseg -= seg;
  // 离散段绘制
  fragColor.xyz = mix(vec3(.7, .5, .3), vec3(.3, .3, .4), seg/6.);
  fragColor = mix(vec4(0.), fragColor, smoothstep(0., 0.05, 0.5 - abs(cseg - 0.5)));
}
