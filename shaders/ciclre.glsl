
/**
* 1、画圆 同心圆
*/
void mainImage1(out vec4 fragColor,in vec2 fragCoord){
  vec2 uv = (2.*fragCoord - iResolution.xy) / iResolution.y;
  float p = length(uv);
  float r2 = smoothstep(0.5, 0.505, p);
  float r1 = smoothstep(0.4, 0.405, p);
  // 大于0.5 白
  // 当0.4 ~ 0.5 之间两个数值的差是 1 所以 0.4~0.5 之间是白
  // 1.0 减去就取反
  float r = 1. - (r1 - r2);
  // float r = r1 - r2;
  // float r = smoothstep(0.5, 0.4, p);
  fragColor = vec4(r, r, r, 1.0);
}

/**
* 2、warning 危险信号警告
*/
void mainImage2(out vec4 fragColor,in vec2 fragCoord) {
  vec2 uv = (2.*fragCoord - iResolution.xy) / iResolution.y;
  vec3 color=vec3(1.,0.,0.);
  vec2 center=vec2(.5,.5);
  float dis = distance(uv, center);
  float p = 6.0;
  float r = fract(dis*p -iTime)/3.+step(.99,fract(dis * p - iTime));
  if(dis>.5){
    r = 0.0;
  }
  gl_FragColor = vec4(color, r);
}

/**
 * 3、环形渐变
 * 每一条线都是同一种颜色，向量的长度不影响角度
 * 向量点乘 V1*V2 = |V1|*|V2|*cos(θ)
 * dot(v1,v2) = length(v1)*length(v2)*cos(θ)
 * cos(θ) = dot(v1,v2) / (length(v1)*length(v2))
 *
 * 一个向量在另一个向量上的投影
 * v1在v2上的投影 = dot(v1,v2) / length(v1)
 * h = |V2|*cos(θ)
 */
#define PI 3.14159265359;

// 映射函数 ramp

float ramp(float i, float x, float y, float x1, float y1) {
  float t = (i - x) / (y - x);
  return x1 + (y1 - x1) * t;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.*fragCoord - iResolution.xy) / iResolution.y;

  float deg = 0.0;
  // P(x, y) R * cos(θ), R * sin(θ) 向量 P(n)
  vec2 upVec = vec2(cos(radians(deg)), sin(radians(deg)));
  vec2 v1 = normalize(uv);
  // theta 返回的是 0-180度 的弧度值
  float theta = acos(dot(v1, upVec)); // 0 - PI 的角度

  vec3 n = cross(vec3(upVec, 0), vec3(v1, 0));
  theta *= sign(n.z);
  theta = remap(theta, -PI, PI, 0., 1.);
  fragColor = vec4(theta);
}
/**
 * 向量叉乘 cross
 * 向量叉乘的结果是一个垂直于两个向量的向量
 * V3 同时垂直于 V1 V2
 * V1 * V2 = V3 = cross(v1,v2)
 */
