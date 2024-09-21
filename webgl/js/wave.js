import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';


let scene, renderer, mesh, gui, material, camera, plight, ballMesh, controls;

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.outputColorSpace = THREE.SRGBColorSpace;//设置为SRGB颜色空间
  renderer.toneMappingExposure = 1.25; // 渲染器色调映射曝光

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 100);
  controls = new OrbitControls(camera, renderer.domElement);
  scene.add(new THREE.AxesHelper(1000));

  // 点光源
  plight = new THREE.DirectionalLight(0x4b2725, 80);
  plight.position.set(-100, 0, 60);
  // scene.add(plight);

  let aLight = new THREE.AmbientLight(0x3b2e37, 30);
  // scene.add(aLight);

  new HDRCubeTextureLoader()
    .setPath('./file/pisaHDR/')
    .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
      function (texture ) {
        // scene.background = texture;
        // scene.environment = texture;
      }
    );
  // paddedBall();
  // initGui();
  plane();
  animate();
}

function plane() {
  const vertexShader = `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float y;
    varying vec3 vPosition;
    float w = 25.0;
    void main() {
      if(vPosition.y <= y && vPosition.y > y - w ){
        float per = pow((y - vPosition.y) / w, 2.0);
        float c = mix(0.3, gl_FragColor.r, per);
        float a = mix(0.9, gl_FragColor.g, per);
        float b = mix(0.0, gl_FragColor.b, per);
        gl_FragColor = vec4(vec3(c,a,b), 1.0);
      }
    }
  `;

  const uniforms = {
    y: { value: 1 },
  }

  const material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
  });


  // 在编译shader程序之前立即执行的可选回调。此函数使用shader源码作为参数。用于修改内置材质。
  // basicMaterial.onBeforeCompile = function (shader) {
  //   console.log(shader.vertexShader)
  //   shader.vertexShader = shader.vertexShader.replace(`
  //     varying vec3 vPosition;
  //     void main(){
  //       vPosition = vec3(modelMatrix * vec4(position, 1.0 ));
  //     }
  //     `
  //   );

  //   shader.fragmentShader = shader.fragmentShader.replace(`
  //       #include <dithering_fragment>
  //       #include <dithering_fragment>
  //       if(vPosition.y > 20.0 && vPosition.y < 21.0 ){
  //         gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  //       }
  //   `)
  // }


  mesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 50), material);

  // floor.rotation.x = -Math.PI / 2;
  mesh.position.set(0, 25, 0);
  scene.add(mesh);
}



function paddedBall() {
  const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
  const uniforms = {
    time: { value: 0 },
  };

  const vertexShader = `
    uniform float time;
    void main() {
      float y = sin(position.x / 50.0 + time) * 10.0 + sin(position.y / 50.0 + time) * 10.0;
      vec3 newPosition = vec3(position.x, position.y, y * 2.0);
      gl_PointSize = (y + 20.0) / 4.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    void main() {
      float r = distance(gl_PointCoord, vec2(0.5, 0.5));
      gl_FragColor = vec4(0.0, smoothstep(0.5, 0.51, r), 1.0, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
  });

  mesh = new THREE.Points(planeGeometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);
}

function initGui() {
  gui = new GUI({ title: 'materialColor' });
  const materialFolder = gui.addFolder('material');

  const obj = {
    color:0x00ffff,
  };

  materialFolder.addColor(obj, 'color').onChange(function(value) {
    ballMesh.material.color.set(value);
  })

  gui.add(material, 'iridescence', 0, 1).name('彩虹色');
  gui.add(material, 'reflectivity', 0, 1).name('彩虹色');
  gui.add(material, 'iridescenceIOR', 0, 3).name('反射率');


  gui.open();
}

let v = 1;
const clock = new THREE.Clock();
function animate() {
  // mesh.material.uniforms.time.value = v;
  const deltaTime = clock.getDelta();
  mesh.material.uniforms.y.value += 30 * deltaTime;
  if (mesh.material.uniforms.y.value > 25) {
    mesh.material.uniforms.y.value = -25;
  }
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
