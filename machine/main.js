/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App = (function(window, t3, app){
    /*
     * Parent and child are constructors(functions)
     */
    app.extend = function(parent, child){
        if(!parent || typeof parent !== 'function') return false;
        if(!child || typeof child !== 'function') return false;
        
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    };
    var width = app.width = window.innerWidth;
    var height = app.height = window.innerHeight;
    
    var scene;
    var renderer;
    var camera;
    var cube;
    var controls;
    var clock;
    var velocity = new t3.Vector3();
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    
    function render(){
        var delta = clock.getDelta();
        //updateObjects(delta);
        //controls.update(delta);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    function updateObjects(delta){
        //do important stuff
    }
    function init(){
        clock = new t3.Clock();
        scene = app.scene = new t3.Scene();
        renderer = app.renderer = new t3.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);
    }
    function initCamera(){
        camera = new t3.PerspectiveCamera(45, width / height, 0.1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 40;
        camera.lookAt(cube.position);
        //scene.add(camera);
    }
    function addCube(){
        var geometry = new t3.BoxGeometry(10, 10, 10);
        //var cubeMaterial = new t3.MeshLambertMaterial({ color: 0x1ec876 });
        var material = new t3.MeshBasicMaterial({ color: 0x1ec876 });//0x00ff00
        cube = new t3.Mesh(geometry, material);
        //cube.rotation.y = Math.PI * 45 / 180;
        scene.add(cube);
    }
    function addLight(){
        var pointLight = new t3.PointLight(0xffffff);
        pointLight.position.set(0,300,200);
        scene.add(pointLight);
    }
    var resizeHandler = function(){
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    function setupOrbitControls(){
        controls = new t3.OrbitControls(camera, renderer.domElement);
    }
    function setupFirstControls(){
        controls = new t3.FirstPersonControls(camera, renderer.domElement);
        //controls.movementSpeed = 1000;
        //controls.lookSpeed = 0.125;
        controls.lookVertical = true;
    }
    function setupPointerControls(){
        controls = new t3.PointerLockControls(camera);
        scene.add(controls.getObject());
    }
    function setupMesh(){
        var geo = new t3.IcosahedronGeometry(5,2);
        var material = new t3.MeshNormalMaterial();
        var mesh = new t3.Mesh(geo, material);
    }
    function customGeometry(){
        var house = new t3.Geometry();
        house.vertices.push(new t3.Vector3(10,0,5));
        house.faces.push(new t3.Face4(0,1,2,3));
    }
    
    function main(){
        //create scene,renderer and attach to DOM
        init();
        //populate scene with objects
        addCube();
        initCamera();
        setupPointerControls();
        addLight();
        //var axis = new t3.AxisHelper(15);
        //scene.add(axis);
        setupOrbitControls();
        //setupFirstControls();
        //setupPointerControls();
        
        //commence the render loop
        render();
        
//        if(app.world){
//            app.event.attach(document);
//            
//        }
    };
    window.addEventListener('load', main, false);
    window.addEventListener('resize', resizeHandler, false);
    return app;
    
})(window, THREE, App || {});
