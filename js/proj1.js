/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var base;

var arm;

var hand;

var target;

var flag = false;


function Base(x,y,z){

    this.object = new THREE.Object3D();

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    this.object.position.set(x, y, z);

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

        let geometry = new THREE.SphereBufferGeometry(5, 12, 12, 0, 2 * Math.PI, 0, 0.5 * Math.PI);

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

    this.addFirstArm = function(arm, x,y,z){

        let geometry = new THREE.CubeGeometry(3, 20, 3);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x,y,z);

        arm.object.add(mesh);
    }

    this.addSecondArm = function (arm, x, y, z) {

        let geometry = new THREE.CubeGeometry(3, 3, 20);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y, z);

        arm.object.add(mesh);
    }

    this.addSphere = function (arm, x, y, z) {

        let geometry = new THREE.SphereGeometry(2, 20, 60);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y, z);

        arm.object.add(mesh);
    }

    this.addHandV = function (arm, x, y, z){

        let geometry = new THREE.CubeGeometry(1,1,3);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y, z);

        arm.object.add(mesh);

    }

    this.addHandH = function (arm, x, y, z) {

        let geometry = new THREE.CubeGeometry(3, 1, 1);

        let mesh = new THREE.Mesh(geometry, arm.material);

        mesh.position.set(x, y, z);

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


function onKeyDown(e) {
    'use strict';


    switch (e.keyCode) {

        case 49://1

            camera.position.x = 0;
            camera.position.y = 60;
            camera.position.z = 0;
            onResize();
            camera.lookAt(scene.position);
            break;

        case 50://2
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 60;
            onResize();
            camera.lookAt(scene.position);
            break;

        case 51://3
            camera.position.x = 60;
            camera.position.y = 0;
            camera.position.z = 0;
            onResize();
            camera.lookAt(scene.position);
            break;

        case 52: //4
			/*caso a tecla 4 seja premida desligamos os wireframes ou ligamos
			dependendo*/
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {

                    node.material.wireframe = flag;

                }
            });
            flag = !flag;

            break;
        

        case 53://5
            camera.position.x = 60;
            camera.position.y = 60;
            camera.position.z = 60;
            onResize();
            camera.lookAt(scene.position);
            break;
    }
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
        window.innerWidth / window.innerHeight,
        1,
        1000);
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

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

    new Base(0, 0, 0);
    new Arm(0,10,0);
    new Target(0,0,0);


    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}
