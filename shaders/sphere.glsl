
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

  vec3 ray;
  ray.xy = uv;
  ray.z = 1.0;

  vec4 s = vec4(0.0, 0.0, 2.0, 1.0);
  vec3 o = vec3(0.0) - s.xyz;

  float a = dot(ray, ray);
  float b = 2.0 * dot(o, ray);
  float c = dot(o,o) - s.w * s.w;
  float delta = b * b - 4.0 * a * c;
  float k;

  fragColor = vec4(0.0);

  if (delta < 0.0) {
    return;
  }

  vec3 p = k * ray;
  fragColor = vec4(1.0);
}