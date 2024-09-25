
void mainImage(out vec4 fragColor,in vec2 fragCoord){
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