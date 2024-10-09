
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2. * fragCoord - iResolution.xy) / min(iResolution.y, iResolution.y                          );

  vec3 color = vec3(uv.x, uv.y, 0.0);
  gl_FragColor = vec4(color, 1.0);
}