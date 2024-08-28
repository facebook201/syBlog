
float sdfCircle(in vec2 p, float r) {
  return length(p) - r;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  float d = sdfCircle(uv, 0.7);
  vec3 color = 1.0 + sign(d) * vec3(0.4, 0.5, 0.6);
  fragColor = vec4(color, 1.0);
}
