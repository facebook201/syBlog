
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = 2. *(2. * fragCoord - iResolution.xy) / iResolution.y;

  uv = rotate2d(iTime) * uv;

  float r = atan(uv.y, uv.x);
  float d = 0.5 + sin(3. * r) * 0.5;
  d = pow(d, 0.4);
  float d2 = 0.5 + cos(r * 6.) * 0.15;
  d += d2;

  float v = smoothstep(d, d - 0.01, length(uv));
  float h = length(uv) / d;

  vec4 col = mix(vec4(1.0), vec4(0.5*h, .5*h + 0.5, 0., 1.), v);

  fragColor = col;
}
