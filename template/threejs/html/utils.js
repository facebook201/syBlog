import * as THREE from "../../../build/three.module.js";
/**
 * Initialize the statistics domelement
 * @param {Number} type 0: fps, 1: ms, 2: mb, 3+: custom
 * @returns stats javascript object
 */
export function initStats(type) {

    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();

    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    return stats;
}

/**
 * Initialize a simple default renderer and binds it to the "webgl-output" dom
* element.
 *
 * @param additionalProperties Additional properties to pass into the renderer
 */
export function initRenderer(additionalProperties) {

    var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
    var renderer = new THREE.WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("webgl").appendChild(renderer.domElement);

    return renderer;
}

/**
 * Initialize a simple default canvas renderer.
 * 
 */
function initCanvasRenderer() {

    var canvasRenderer = new THREE.CanvasRenderer();
    canvasRenderer.setClearColor(new THREE.Color(0x000000));
    canvasRenderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-output").appendChild(canvasRenderer.domElement);

    return canvasRenderer;
}

/**
 * Initialize a simple camera and point it at the center of a scene
 * 
 * @param {THREE.Vector3} [initialPosition]
 */
export function initCamera(initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}

export function initDefaultLighting(scene, initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-10, 30, 40);
    
    var spotLight = new THREE.DirectionalLight(0xffffff, 1);
    spotLight.position.copy(position);

    spotLight.shadow.mapSize.set(2048, 2048);

    spotLight.shadow.camera.top = 100;
    spotLight.shadow.camera.left = -100;
    spotLight.shadow.camera.right = 100;
    spotLight.shadow.camera.bottom = -100;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 120;

    spotLight.castShadow = true;
    spotLight.decay = 2;
    spotLight.penumbra = 0.05;
    spotLight.name = "spotLight"

    scene.add(spotLight);

    // scene.add(new THREE.CameraHelper(spotLight.shadow.camera))
    // scene.add(new THREE.DirectionalLightHelper(spotLight, 10))


    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);
}

function initDefaultDirectionalLighting(scene, initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(100, 200, 200);
    
    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.copy(position);
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.castShadow = true;

    dirLight.shadow.camera.left = -200;
    dirLight.shadow.camera.right = 200;
    dirLight.shadow.camera.top = 200;
    dirLight.shadow.camera.bottom = -200;

    scene.add(dirLight);

    var ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);
    
}

/**
 * Initialize trackball controls to control the scene
 * 
 * @param {THREE.Camera} camera 
 * @param {THREE.Renderer} renderer 
 */
function initTrackballControls(camera, renderer) {
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}

/**
 * Apply a simple standard material to the passed in geometry and return the mesh
 * 
 * @param {*} geometry 
 * @param {*} material if provided use this meshnormal material instead of creating a new material 
 *                     this material will only be used if it is a meshnormal material.
 */
var applyMeshStandardMaterial = function(geometry, material) {
    if (!material || material.type !== "MeshStandardMaterial")  {
        var material = new THREE.MeshStandardMaterial({color: 0xff0000})
        material.side = THREE.DoubleSide;
    } 

    return new THREE.Mesh(geometry, material)
}

/**
 * Apply meshnormal material to the geometry, optionally specifying whether
 * we want to see a wireframe as well.
 * 
 * @param {*} geometry 
 * @param {*} material if provided use this meshnormal material instead of creating a new material 
 *                     this material will only be used if it is a meshnormal material.
 */
export var applyMeshNormalMaterial = function(geometry, material) {
    if (!material || material.type !== "MeshNormalMaterial")  {
        material = new THREE.MeshNormalMaterial();
        material.side = THREE.DoubleSide;
    } 
    
    return new THREE.Mesh(geometry, material)
}

/**
 * Add a simple cube and sphere to the provided scene
 * 
 * @param {THREE.Scene} scene 
 */
function addDefaultCubeAndSphere(scene) {

    // create a cube
    var boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var cube = new THREE.Mesh(boxGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);

    return {
        cube: cube,
        sphere: sphere
    };
}

/**
 * Add a simple ground plance to the provided scene
 * 
 * @param {THREE.Scene} scene 
 */
export function addGroundPlane(scene) {
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(1200, 1200);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    return plane;
}

/**
 * Add a simple ground plance to the provided scene
 * 
 * @param {THREE.Scene} scene 
 */
export function addLargeGroundPlane(scene, useTexture) {

    var withTexture = (useTexture !== undefined) ? useTexture : false;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(10000, 10000);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xfffccc
    });
    if (withTexture) {
        var textureLoader = new THREE.TextureLoader();
        planeMaterial.map = textureLoader.load("./assets/textures/general/floor-wood.jpg");
        planeMaterial.map.wrapS = THREE.RepeatWrapping;
        planeMaterial.map.wrapT = THREE.RepeatWrapping;
        planeMaterial.map.repeat.set(80,80)
    }
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);
    return plane;
}

export function addHouseAndTree(scene) {

    createBoundingWall(scene);
    createGroundPlane(scene);
    createHouse(scene);
    createTree(scene);

    function createBoundingWall(scene) {
        var wallLeft = new THREE.BoxGeometry(70, 2, 2);
        var wallRight = new THREE.BoxGeometry(70, 2, 2);
        var wallTop = new THREE.BoxGeometry(2, 2, 50);
        var wallBottom = new THREE.BoxGeometry(2, 2, 50);

        var wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0522d
        });

        var wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
        var wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
        var wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
        var wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

        wallLeftMesh.position.set(15, 1, -25);
        wallRightMesh.position.set(15, 1, 25);
        wallTopMesh.position.set(-19, 1, 0);
        wallBottomMesh.position.set(49, 1, 0);

        scene.add(wallLeftMesh);
        scene.add(wallRightMesh);
        scene.add(wallBottomMesh);
        scene.add(wallTopMesh);

    }

    function createGroundPlane(scene) {
        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(70, 50);
        var planeMaterial = new THREE.MeshPhongMaterial({
            color: 0x9acd32
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        scene.add(plane)
    }

    function createHouse(scene) {
        var roof = new THREE.ConeGeometry(5, 4);
        var base = new THREE.CylinderGeometry(5, 5, 6);

        // create the mesh
        var roofMesh = new THREE.Mesh(roof, new THREE.MeshPhongMaterial({
            color: 0x8b7213
        }));
        var baseMesh = new THREE.Mesh(base, new THREE.MeshPhongMaterial({
            color: 0xffe4c4
        }));

        roofMesh.position.set(25, 8, 0);
        baseMesh.position.set(25, 3, 0);

        roofMesh.receiveShadow = true;
        baseMesh.receiveShadow = true;
        roofMesh.castShadow = true;
        baseMesh.castShadow = true;

        scene.add(roofMesh);
        scene.add(baseMesh);
    }

    /**
     * Add the tree to the scene
     * @param scene The scene to add the tree to
     */
    function createTree(scene) {
        var trunk = new THREE.BoxGeometry(1, 8, 1);
        var leaves = new THREE.SphereGeometry(4);

        // create the mesh
        var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshPhongMaterial({
            color: 0x8b4513
        }));
        var leavesMesh = new THREE.Mesh(leaves, new THREE.MeshPhongMaterial({
            color: 0x00ff00
        }));

        // position the trunk. Set y to half of height of trunk
        trunkMesh.position.set(-10, 4, 0);
        leavesMesh.position.set(-10, 12, 0);

        trunkMesh.castShadow = true;
        trunkMesh.receiveShadow = true;
        leavesMesh.castShadow = true;
        leavesMesh.receiveShadow = true;

        scene.add(trunkMesh);
        scene.add(leavesMesh);
    }
}

function createGhostTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    var ctx = canvas.getContext('2d');
    // the body
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();


    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};

/**
 * Add a folder to the gui containing the basic material properties.
 * 
 * @param gui the gui to add to
 * @param controls the current controls object
 * @param material the material to control
 * @param geometry the geometry we're working with
 * @param name optionally the name to assign to the folder
 */
function addBasicMaterialSettings(gui, controls, material, name) {

    var folderName = (name !== undefined) ? name : 'THREE.Material';

    controls.material = material;

    var folder = gui.addFolder(folderName);
    folder.add(controls.material, 'id');
    folder.add(controls.material, 'uuid');
    folder.add(controls.material, 'name');
    folder.add(controls.material, 'opacity', 0, 1, 0.01);
    folder.add(controls.material, 'transparent');
    folder.add(controls.material, 'overdraw', 0, 1, 0.01);
    folder.add(controls.material, 'visible');
    folder.add(controls.material, 'side', {FrontSide: 0, BackSide: 1, BothSides: 2}).onChange(function (side) {
        controls.material.side = parseInt(side)
    });

    folder.add(controls.material, 'colorWrite');
    folder.add(controls.material, 'flatShading').onChange(function(shading) {
        controls.material.flatShading = shading;
        controls.material.needsUpdate = true;
    });
    folder.add(controls.material, 'premultipliedAlpha');
    folder.add(controls.material, 'dithering');
    folder.add(controls.material, 'shadowSide', {FrontSide: 0, BackSide: 1, BothSides: 2});
    folder.add(controls.material, 'vertexColors', {NoColors: THREE.NoColors, FaceColors: THREE.FaceColors, VertexColors: THREE.VertexColors}).onChange(function (vertexColors) {
        material.vertexColors = parseInt(vertexColors);
    });
    folder.add(controls.material, 'fog');

    return folder;
}

function addSpecificMaterialSettings(gui, controls, material, name) {
    controls.material = material;
    
    var folderName = (name !== undefined) ? name : 'THREE.' + material.type;
    var folder = gui.addFolder(folderName);
    switch (material.type) {
        case "MeshNormalMaterial":
            folder.add(controls.material,'wireframe');
            return folder;

        case "MeshPhongMaterial":
            controls.specular = material.specular.getStyle();
            folder.addColor(controls, 'specular').onChange(function (e) {
                material.specular.setStyle(e)
            });
            folder.add(material, 'shininess', 0, 100, 0.01);
            return folder;            
            
        case "MeshStandardMaterial":
            controls.color = material.color.getStyle();
            folder.addColor(controls, 'color').onChange(function (e) {
                material.color.setStyle(e)
            });
            controls.emissive = material.emissive.getStyle();
            folder.addColor(controls, 'emissive').onChange(function (e) {
                material.emissive.setStyle(e)                
            });
            folder.add(material, 'metalness', 0, 1, 0.01);
            folder.add(material, 'roughness', 0, 1, 0.01);
            folder.add(material, 'wireframe');

            return folder;
    }
}

export function redrawGeometryAndUpdateUI(gui, scene, controls, geomFunction) {
    guiRemoveFolder(gui, controls.specificMaterialFolder);
    guiRemoveFolder(gui, controls.currentMaterialFolder);
    if (controls.mesh) scene.remove(controls.mesh)
    var changeMat = eval("(" + controls.appliedMaterial + ")")
    if (controls.mesh) {
        controls.mesh = changeMat(geomFunction(), controls.mesh.material);
    } else {
        controls.mesh = changeMat(geomFunction());
    }
    
    controls.mesh.castShadow = controls.castShadow;
    scene.add(controls.mesh)
    controls.currentMaterialFolder = addBasicMaterialSettings(gui, controls, controls.mesh.material);
    controls.specificMaterialFolder = addSpecificMaterialSettings(gui, controls, controls.mesh.material);
  }

/**
 * Remove a folder from the dat.gui
 * 
 * @param {*} gui 
 * @param {*} folder 
 */
function guiRemoveFolder(gui, folder) {
    if (folder && folder.name && gui.__folders[folder.name]) {
        gui.__folders[folder.name].close();
        gui.__folders[folder.name].domElement.parentNode.parentNode.removeChild(gui.__folders[folder.name].domElement.parentNode);
        delete gui.__folders[folder.name];
        gui.onResize();
    }
}

/**
 * 
 * 
 * @param gui the gui to add to
 * @param controls the current controls object
 * @param material material for the meshes
 */
function addMeshSelection(gui, controls, material, scene) {
  var sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
  var boxGeometry = new THREE.BoxGeometry(16, 16, 15);
  var planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

  var sphere = new THREE.Mesh(sphereGeometry, material);
  var cube = new THREE.Mesh(boxGeometry, material);
  var plane = new THREE.Mesh(planeGeometry, material);

  sphere.position.x = 0;
  sphere.position.y = 11;
  sphere.position.z = 2;

  cube.position.y = 8;

  controls.selectedMesh = "cube";
  loadGopher(material).then(function(gopher) {

    gopher.scale.x = 5;
    gopher.scale.y = 5;
    gopher.scale.z = 5;
    gopher.position.z = 0
    gopher.position.x = -10
    gopher.position.y = 0

    gui.add(controls, 'selectedMesh', ["cube", "sphere", "plane", "gopher"]).onChange(function (e) {

      scene.remove(controls.selected);
  
      switch (e) {
        case "cube":
          scene.add(cube);
          controls.selected = cube;
          break;
        case "sphere":
          scene.add(sphere);
          controls.selected = sphere;
          break;
        case "plane":
          scene.add(plane);
          controls.selected = plane;
          break;
        case "gopher":
          scene.add(gopher);
          controls.selected = gopher;
          break;
      }
    });
  });

  controls.selected = cube;
  scene.add(controls.selected);
}

/**
 * Load a gopher, and apply the material
 * @param material if set apply this material to the gopher
 * @returns promise which is fullfilled once the goher is loaded
 */
function loadGopher(material) {
    var loader = new THREE.OBJLoader();
    var mesh = null;
    var p = new Promise(function(resolve) {
        loader.load('../../assets/models/gopher/gopher.obj', function (loadedMesh) {
            // this is a group of meshes, so iterate until we reach a THREE.Mesh
            mesh = loadedMesh;
            if (material) {
                // material is defined, so overwrite the default material.
                computeNormalsGroup(mesh);
                setMaterialGroup(material, mesh);
            }
            resolve(mesh);
        });
    });

    return p;
}

function setMaterialGroup(material, group) {
    if (group instanceof THREE.Mesh) {
        group.material = material;        
    } else if (group instanceof THREE.Group) {
        group.children.forEach(function(child) {setMaterialGroup(material, child)});
    }
}

function computeNormalsGroup(group) {
    if (group instanceof THREE.Mesh) {
        var tempGeom = new THREE.Geometry();
        tempGeom.fromBufferGeometry(group.geometry)
        tempGeom.computeFaceNormals();
        tempGeom.mergeVertices();
        tempGeom.computeVertexNormals();

        tempGeom.normalsNeedUpdate = true;
        
        // group = new THREE.BufferGeometry();
        // group.fromGeometry(tempGeom);
        group.geometry = tempGeom;

    } else if (group instanceof THREE.Group) {
        group.children.forEach(function(child) {computeNormalsGroup(child)});
    }
}


export const lon2xyz = (R, longitude, latitude) => {
    let lon = longitude * Math.PI / 180; // 转弧度值
    const lat = latitude * Math.PI / 180; // 转弧度值
    lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度

    // 经纬度坐标转球面坐标计算公式
    const x = R * Math.cos(lat) * Math.cos(lon);
    const y = R * Math.sin(lat);
    const z = R * Math.cos(lat) * Math.sin(lon);
    // 返回球面坐标
    return new Vector3(x, y, z);
  }

  function _3Dto2D(startSphere, endSphere) {
    /*计算第一次旋转的四元数：表示从一个平面如何旋转到另一个平面*/
    const origin = new Vector3(0, 0, 0); //球心坐标
    const startDir = startSphere.clone().sub(origin); //飞线起点与球心构成方向向量
    const endDir = endSphere.clone().sub(origin); //飞线结束点与球心构成方向向量
    // dir1和dir2构成一个三角形，.cross()叉乘计算该三角形法线normal
    const normal = startDir.clone().cross(endDir).normalize();
    const xoyNormal = new Vector3(0, 0, 1); //XOY平面的法线
    //.setFromUnitVectors()计算从normal向量旋转达到xoyNormal向量所需要的四元数
    // quaternion表示把球面飞线旋转到XOY平面上需要的四元数
    const quaternion3D_XOY = new Quaternion().setFromUnitVectors(normal, xoyNormal);
    /*第一次旋转：飞线起点、结束点从3D空间第一次旋转到XOY平面*/
    const startSphereXOY = startSphere.clone().applyQuaternion(quaternion3D_XOY);
    const endSphereXOY = endSphere.clone().applyQuaternion(quaternion3D_XOY);
  
    /*计算第二次旋转的四元数*/
    // middleV3：startSphereXOY和endSphereXOY的中点
    const middleV3 = startSphereXOY.clone().add(endSphereXOY).multiplyScalar(0.5);
    const midDir = middleV3.clone().sub(origin).normalize(); // 旋转前向量midDir，中点middleV3和球心构成的方向向量
    const yDir = new Vector3(0, 1, 0); // 旋转后向量yDir，即y轴
    // .setFromUnitVectors()计算从midDir向量旋转达到yDir向量所需要的四元数
    // quaternion2表示让第一次旋转到XOY平面的起点和结束点关于y轴对称需要的四元数
    const quaternionXOY_Y = new Quaternion().setFromUnitVectors(midDir, yDir);
  
    /*第二次旋转：使旋转到XOY平面的点再次旋转，实现关于Y轴对称*/
    const startSpherXOY_Y = startSphereXOY.clone().applyQuaternion(quaternionXOY_Y);
    const endSphereXOY_Y = endSphereXOY.clone().applyQuaternion(quaternionXOY_Y);
  
    /**一个四元数表示一个旋转过程
     *.invert()方法表示四元数的逆，简单说就是把旋转过程倒过来
     * 两次旋转的四元数执行.invert()求逆，然后执行.multiply()相乘
     *新版本.invert()对应旧版本.invert()
     */
    const quaternionInverse = quaternion3D_XOY.clone().invert().multiply(quaternionXOY_Y.clone().invert())
    return {
      // 返回两次旋转四元数的逆四元数
      quaternion: quaternionInverse,
      // 范围两次旋转后在XOY平面上关于y轴对称的圆弧起点和结束点坐标
      startPoint: startSpherXOY_Y,
      endPoint: endSphereXOY_Y,
    }
  }
  /**通过函数arcXOY()可以在XOY平面上绘制一个关于y轴对称的圆弧曲线
   * startPoint, endPoint：表示圆弧曲线的起点和结束点坐标值，起点和结束点关于y轴对称
   * 同时在圆弧轨迹的基础上绘制一段飞线*/
  function arcXOY(radius,startPoint, endPoint,options) {
    // 计算两点的中点
    const middleV3 = new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    // 弦垂线的方向dir(弦的中点和圆心构成的向量)
    const dir = middleV3.clone().normalize()
    // 计算球面飞线的起点、结束点和球心构成夹角的弧度值
    const earthRadianAngle = radianAOB(startPoint, endPoint, new Vector3(0, 0, 0))
    /*设置飞线轨迹圆弧的中间点坐标
    弧度值 * radius * 0.2：表示飞线轨迹圆弧顶部距离地球球面的距离
    起点、结束点相聚越远，构成的弧线顶部距离球面越高*/
    const arcTopCoord = dir.multiplyScalar(radius + earthRadianAngle * radius * 0.2) // 黄色飞行线的高度
    //求三个点的外接圆圆心(飞线圆弧轨迹的圆心坐标)
    const flyArcCenter = threePointCenter(startPoint, endPoint, arcTopCoord)
    // 飞线圆弧轨迹半径flyArcR
    const flyArcR = Math.abs(flyArcCenter.y - arcTopCoord.y);
    /*坐标原点和飞线起点构成直线和y轴负半轴夹角弧度值
    参数分别是：飞线圆弧起点、y轴负半轴上一点、飞线圆弧圆心*/
    const flyRadianAngle = radianAOB(startPoint, new Vector3(0, -1, 0), flyArcCenter);
    const startAngle = -Math.PI / 2 + flyRadianAngle; //飞线圆弧开始角度
    const endAngle = Math.PI - startAngle; //飞线圆弧结束角度
    // 调用圆弧线模型的绘制函数
    const arcline = circleLine(flyArcCenter.x, flyArcCenter.y, flyArcR, startAngle, endAngle, options.color)
    // const arcline = new  Group();// 不绘制轨迹线，使用 Group替换circleLine()即可
    arcline.center = flyArcCenter; //飞线圆弧自定一个属性表示飞线圆弧的圆心
    arcline.topCoord = arcTopCoord; //飞线圆弧自定一个属性表示飞线圆弧中间也就是顶部坐标
  
    // const flyAngle = Math.PI/ 10; //飞线圆弧固定弧度
    const flyAngle = (endAngle - startAngle) / 7; //飞线圆弧的弧度和轨迹线弧度相关
    // 绘制一段飞线，圆心做坐标原点
    const flyLine = createFlyLine(flyArcR, startAngle, startAngle + flyAngle, options.flyLineColor);
    flyLine.position.y = flyArcCenter.y; //平移飞线圆弧和飞线轨迹圆弧重合
    //飞线段flyLine作为飞线轨迹arcLine子对象，继承飞线轨迹平移旋转等变换
    arcline.add(flyLine);
    //飞线段运动范围startAngle~flyEndAngle
    flyLine.flyEndAngle = endAngle - startAngle - flyAngle;
    flyLine.startAngle = startAngle;
    // arcline.flyEndAngle：飞线段当前角度位置，这里设置了一个随机值用于演示
    flyLine.AngleZ = arcline.flyEndAngle * Math.random();
    // flyLine.rotation.z = arcline.AngleZ;
    // arcline.flyLine指向飞线段,便于设置动画是访问飞线段
    arcline.userData['flyLine'] = flyLine;
  
    return arcline
  }