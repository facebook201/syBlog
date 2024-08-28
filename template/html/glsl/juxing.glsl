
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);

  vec2 bl = step(vec2(0.05), st);
  float pct = bl.x * bl.y;

  vec2 tr = step(vec2(0.05), 1.0 - st);
  pct *= tr.x * tr.y;

  color = vec3(pct);

  gl_FragColor = vec4(vec3(color), 1.0);
}