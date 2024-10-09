


/**
 * webgl 基础函数
 * vs 和 fs 是着色器代码
 */
function webglInit1(gl, vs, fs) {
  if (!gl) {
    gl = canvas.getContext('webgl');
  }
  if (!gl) {
    alert('你的浏览器不支持webgl');
    return;
  }

  initShader(gl, vs, fs);
  return gl.program;
}

function webglInit(gl, vs, fs) {
  if (!gl) {
    gl = canvas.getContext('webgl');
  }
  if (!gl) {
    alert('你的浏览器不支持webgl');
    return;
  }

  initShader(gl, vs, fs);
  return gl;
}

function webglInit2(gl, vs, fs) {
  if (!gl) {
    gl = canvas.getContext('webgl');
  }
  if (!gl) {
    alert('你的浏览器不支持webgl');
    return;
  }

  initShader(gl, vs, fs);
  return gl;
}

// 初始化着色器
function initShader(gl, vs, fs) {
  // 创建程序对象
  const program = gl.createProgram();
  // 创建着色器
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);

  // 为对象分配着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 连接着色器
  gl.linkProgram(program);

  // 使用程序
  gl.useProgram(program);
  gl.program = program;
  return true;
}


function loadShader(gl, type, source) {
  // 创建着色器对象
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  // 将源码分配给着色器对象
  gl.shaderSource(shader, source);
  // 编译着色器对象
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  return compiled ? shader : null;
}
