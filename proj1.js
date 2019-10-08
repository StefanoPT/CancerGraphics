/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var base;
var arm;
var target;
var carrinho;

var clock;
var toggle_wireframe = false;
var keys_pressed = {};
var movement_keys = ["w", "a", "s", "q",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

var current_camera = 0;


function onKeyDown(event) {
    if (event.key == "1") {
        current_camera = 1;
    }
    if (event.key == "2") {
        current_camera = 2;
    }
    if (event.key == "3") {
        current_camera = 3;
    }
    if (event.key == "4") {
        toggle_wireframe = true;
    }
    if (event.key == "5") {
        current_camera = 4;
    }

    if (movement_keys.includes(event.key)) {
        keys_pressed[event.key] = true;
    }
}

function onKeyUp(event) {
    if (movement_keys.includes(event.key)) {
        keys_pressed[event.key] = false;
    }
}


function rotate_arm() {
    if(keys_pressed["w"]) {
        arm.rotate_arm(1, 0, 0);
    }
    if(keys_pressed["q"]) {
        arm.rotate_arm(-1, 0, 0);
    }
    if(keys_pressed["s"]) {
        arm.rotate_arm(0, -1, 0);
    }
    if(keys_pressed["a"]) {
        arm.rotate_arm(0, 1, 0);
    }
}

function move_carrinho() {
    let movement_vector = new THREE.Vector3();
    if(keys_pressed["ArrowUp"]) {
        movement_vector.add(new THREE.Vector3(0, 0, -1));
    }
    if(keys_pressed["ArrowLeft"]) {
        movement_vector.add(new THREE.Vector3(-1, 0, 0));
    }
    if(keys_pressed["ArrowRight"]) {
        movement_vector.add(new THREE.Vector3(1, 0, 0));        
    }
    if(keys_pressed["ArrowDown"]) {
        movement_vector.add(new THREE.Vector3(0, 0, 1));
    }
    movement_vector.normalize();
    carrinho.move_carrinho(movement_vector.x,
        movement_vector.y,
        movement_vector.z);
}

function Carrinho(x, y, z) {

    this.object = new THREE.Group();

    this.object.add(base.object);
    this.object.add(arm.object);

    this.object.position.set(x, y, z);

    this.toggle_wireframe = function() {
        base.toggle_wireframe();
        arm.toggle_wireframe();
    }

    this.move_carrinho = function(x, y, z) {
        this.object.translateX(x);
        this.object.translateY(y);
        this.object.translateZ(z);
    }

    this.rotate_carrinho = function(x, y, z) {
        this.object.rotateX(x);
        this.object.rotateY(y);
        this.object.rotateZ(z);
    }

    this.object.add(new THREE.AxisHelper(10));
    scene.add(this.object);
}

function Base(x,y,z) {

    this.object = new THREE.Object3D();

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.object.position.set(x, y, z);

    this.toggle_wireframe = function () {
        this.material.wireframe = !this.material.wireframe;
    }

    this.addBaseBalls = function (base, x, y, z) {

        let geometry = new THREE.SphereGeometry(2, 20, 60);

        let mesh = new THREE.Mesh(geometry, base.material);

        mesh.position.set(x, y - 2, z);

        base.object.add(mesh);

    };

    this.addBaseTop = function (base, x, y, z) {

        let geometry = new THREE.CubeGeometry(60, 2, 20);

        let mesh = new THREE.Mesh(geometry, base.material);

        mesh.position.set(x, y, z);

        base.object.add(mesh);

    };

    this.addRolling = function (base, x, y, z) {

        let geometry = new THREE.SphereGeometry(5, 12, 12, 0, 2 * Math.PI, 0, 0.5 * Math.PI);

        let mesh = new THREE.Mesh(geometry, base.material);

        mesh.position.set(x, y, z);

        base.object.add(mesh);
    }

    this.addBaseBalls(this, 25, -1, -8);
    this.addBaseBalls(this, -25, -1, -8);
    this.addBaseBalls(this, 25, -1, 8);
    this.addBaseBalls(this, -25, -1, 8);
    this.addRolling(this, 0, 1, 0);
    this.addBaseTop(this, 0, 0 ,0);
    scene.add(this.object);
}

function Arm(x,y,z){

    this.object = new THREE.Object3D();
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    this.object.position.set(x, y, z);


    this.toggle_wireframe = function () {
        this.material.wireframe = !this.material.wireframe;
    }

    this.rotate_arm = function(x, y, z) {
        let vector = new THREE.Vector3(x, y, z);
        arm.object.rotateOnWorldAxis(vector, 0.05);
    }

    this.addFirstArm = function(arm, x,y,z){

        let geometry = new THREE.CubeGeometry(3, 20, 3);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x,y+10,z);

        arm.object.add(mesh);
    }

    this.addSecondArm = function (arm, x, y, z) {

        let geometry = new THREE.CubeGeometry(3, 3, 20);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y+10, z);

        arm.object.add(mesh);
    }

    this.addSphere = function (arm, x, y, z) {

        let geometry = new THREE.SphereGeometry(2, 20, 60);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y+10, z);

        arm.object.add(mesh);
    }

    this.addHandV = function (arm, x, y, z){

        let geometry = new THREE.CubeGeometry(1,1,3);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y+10, z);

        arm.object.add(mesh);

    }

    this.addHandH = function (arm, x, y, z) {

        let geometry = new THREE.CubeGeometry(3, 1, 1);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y+10, z);

        arm.object.add(mesh);

    }

    this.addSecondArm(this, 0, 10, 10);
    this.addFirstArm(this, 0,0,0);
    this.addSphere(this, 0, 10 ,0);
    this.addSphere(this, 0, 10, 20);
    this.addHandV(this, -1, 10, 23);
    this.addHandV(this, 1, 10, 23);
    this.addHandH(this, 0, 10, 23);
    scene.add(this.object);
}

function Target(x,y,z){

    this.object = new THREE.Object3D();

    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    this.object.position.set(x, y, z);

    this.addTorus = function (target, x, y, z) {

        let geometry = new THREE.TorusGeometry(1.5, 0.5, 20, 60);

        let mesh = new THREE.Mesh(geometry, target.material);

        mesh.position.set(x, y, z);

        target.object.add(mesh);

    }

    this.addTower = function (target, x, y, z) {

        let geometry = new THREE.CubeGeometry(5, 10, 5);

        let mesh = new THREE.Mesh(geometry, target.material);

        mesh.position.set(x, y, z);

        target.object.add(mesh);

    }

    this.addTower(this, 10,2,20);
    this.addTorus(this, 10, 8, 20);
    scene.add(this.object);

}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
}

function createCamera() {
    'use strict';
    camera = new THREE.OrthographicCamera(window.innerWidth / - 20, 
        window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000);

    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    clock = new THREE.Clock(true);

    base = new Base(0, 0, 0);
    arm = new Arm(0,0,0);
    target = new Target(0,0,0);
    carrinho = new Carrinho(0, 0, 0);

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function update() {

    deltaTime = clock.getDelta();

    switch(current_camera) {
        case 1:
            camera.position.x = 0;
            camera.position.y = 60;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 2:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 60;
            camera.lookAt(scene.position);
            break;
        case 3:
            camera.position.x = 60;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 4:
            camera.position.x = 20;
            camera.position.y = 20;
            camera.position.z = 20;
            camera.lookAt(scene.position);
        default: break;       
    }

    if(toggle_wireframe) {
        base.material.wireframe = !base.material.wireframe;
        arm.material.wireframe = !arm.material.wireframe;
        target.material.wireframe = !target.material.wireframe;
        toggle_wireframe = false;     
    }

    rotate_arm();
    move_carrinho();
}

function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}