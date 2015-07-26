/* 
 * Load this file first.
 */

var App = (function(t3, window, app){
    var width, height;
    var scene;
    var renderer;
    var now, delta;
    var lasttime = window.performance.now();
    var pauseToken;
    var velocity = app.velocity = new t3.Vector3();
    app.onObject = false;
    var renderLoop = function(){
        now = window.performance.now();
        delta = Math.min(1, (now - lasttime) / 1000);//capped at 1
        raycaster.ray.origin.copy(app.fpcam.getObject().position);
        raycaster.ray.origin.y -= 10;
        var intersections = raycaster.intersectObjects(app.world.items);
        app.onObject = intersections > 0;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta;// mass = 100
        
        app.fpcam.update2(delta);
        app.world.update(delta);
        renderer.render(scene, app.fpcam.camera);
        lasttime = now;
        pauseToken = requestAnimationFrame(renderLoop);
    };
    var resizeHandler = function(){
        app.fpcam.resize();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    var raycaster;
    
    var main = function(){
        width = app.width = window.innerWidth;
        height = app.height = window.innerHeight;
        scene = app.scene = new t3.Scene();
        renderer = app.renderer = new t3.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);
        raycaster = new t3.Raycaster(new t3.Vector3(), new t3.Vector3(0,-1,0),0,10);
        app.fpcam.init2();
        app.world.init();
        window.addEventListener('resize', resizeHandler, false);
        renderLoop();
    };
    window.addEventListener('load', main, false);
    
    return app;
})(THREE, window, {});
