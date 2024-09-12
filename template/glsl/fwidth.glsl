




float DistLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * t);
}

float Line(vec2 p, vec2 a, vec2 b) {
    float d = DistLine(p, a, b);
    float m = smoothstep(0.02, 0.01, d);
    return m;
}

vec2 N22(vec2 p) {
    p += vec2(434.67, 534.23);
    vec3 a = fract(p.xyx * vec3(123.34, 234.34, 345.65));
    a += dot(a, a + 34.45);
    return fract(vec2(a.x * a.y, a.y * a.z));
}

vec2 GetPos(vec2 id, vec2 offs) {
    // 根据格子的 id和offs 产生一个随机数，
    // 乘上iTime使其根据时间发生变化
    vec2 n = N22(id + offs) * iTime;
    return sin(n) * 0.4 + offs;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2. * fragCoord - iResolution.xy) / iResolution.y;

  uv *= 5.0;

  vec2 st = fract(uv) - 0.5;
  vec3 col = vec3(0.0);

  // 画点
  float d = length(st);
  vec2 id = floor(uv);
  // float m = smoothstep(0.1, 0.09, d);

  float m = 0.0;

  int i = 0;
  vec2 p[9];

  for(float y = -1.0; y <= 1.0; y++) {
    for(float x = -1.0; x <= 1.0; x++) {
      vec2 offs = vec2(x, y);
      p[i++] = GetPos(id, offs);
    }
  }

    for(i = 0; i < 9; i++) {
        m += Line(st, p[i], p[4]);
    }

    col += m;


  fragColor = vec4(col, 1.0);

  // uv = 3.0 * uv;

  // vec3 color = vec3(0.0);
  // fwidth(v) = abs(ddx(v) + ddy(v))
  // ddx(p(x,y))=p(x+1,y)-p(x,y)
  // fwidth则反映了相邻像素在屏幕空间上的距离差值.
  // color = step(abs(uv.x), 2.0 * fwidth(uv.x)) * vec3(0.0,1.0,0.0);
  // color = step(abs(uv.y), 2.0 * fwidth(uv.y)) * vec3(1.0,0.0,0.0);
  // fragColor = vec4(color, 1.0);
}
