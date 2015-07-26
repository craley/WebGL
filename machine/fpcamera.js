/* 
 * Defines App.fpcam
 */

App = (function(t3, window, app){
    
    var fpcam = app.fpcam = {};
    
    var KEYS = {
        LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
        ENTER: 13, BACK: 8, ESC: 27,
        W: 87, A: 65, S: 83, D: 68,
        SPACE: 32
    };
    var RADS = 0.01745329252;
    //var camx, camy, camz;
    var phi = 180;//look angle left,right
    var theta = 0;//look angle up,down
    //var pos = new t3.Vector3();
    //var strafe = new t3.Vector3();
    var fov = 45;
    var near = 0.1;
    var far = 10000;
    var aspect;
    var lookSpeed = 105;
    var moveSpeed = 25;
    var movingForward = false;
    var movingBackward = false;
    var movingLeft = false;
    var movingRight = false;
    var lookingLeft = false;
    var lookingRight = false;
    var lookingUp = false;
    var lookingDown = false;
    var canJump = false;
    
    function fromSpherical(mag, phi, theta){
        var mproj = mag * Math.cos(theta * RADS);
        return new t3.Vector3(mproj * Math.sin(phi * RADS), mag * Math.sin(theta * RADS), mproj * Math.cos(phi * RADS));
    }
    fpcam.resize = function(){
        fpcam.camera.aspect = window.innerWidth / window.innerHeight;
        fpcam.camera.updateProjectionMatrix();
    };
    
    fpcam.init = function(){
        aspect = app.width / app.height;
        fpcam.camera = new t3.PerspectiveCamera(fov, aspect, near, far);
        fpcam.camera.position.z = 40;
        fpcam.camera.lookAt(new t3.Vector3(0,0,-1));
        app.scene.add(fpcam.camera);
        //var controls = new t3.PointerLockControls(fpcam.camera);
        window.addEventListener('keydown', keydownHandler, false);
        window.addEventListener('keyup', keyupHandler, false);
        window.addEventListener('mousemove', mousemoveHandler, false);
        
    };
    var blocker;
    var instructions;
    var body;
    var controls;
    fpcam.init2 = function(){
        aspect = app.width / app.height;
        fpcam.camera = new t3.PerspectiveCamera(fov, aspect, near, far);
        //var acceptsPointer = 'webkitPointerLockElement' in document;//no purpose
        //var acc22 = 'pointerLockElement' in document;//winner
        body = document.body;
        blocker = document.getElementById('blocker');
        instructions = document.getElementById('instructions');
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
        document.addEventListener('keydown', keydownHandler, false);
        document.addEventListener('keyup', keyupHandler, false);
        instructions.addEventListener('click', gameInit, false);
        controls = new t3.PointerLockControls(fpcam.camera);
        app.scene.add(controls.getObject());
        
    };
    var mlastx = null;
    var mlasty = null;
    var difx, dify;
    function mousemoveHandler(event){
        if(mlastx == null){
            mlastx = event.pageX;
            mlasty = event.pageY;
        }
        difx = event.pageX - mlastx;
        dify = event.pageY - mlasty;
        if(difx < 0) lookingLeft = true;
        else if(difx > 0) lookingRight = true;
        if(dify < 0) lookingDown = true;
        else if(dify > 0) lookingUp = true;
        mlastx = event.pageX;
        mlasty = event.pageY;
        return false;
    }
    function keydownHandler(event){
        switch(event.keyCode){
            case KEYS.A:
            case KEYS.LEFT: movingLeft = true;
                break;
            case KEYS.W:
            case KEYS.UP: movingForward = true;
                break;
            case KEYS.S:
            case KEYS.DOWN: movingBackward = true;
                break;
            case KEYS.D:
            case KEYS.RIGHT: movingRight = true;
                break;
            case KEYS.SPACE:
                if(canJump === true) app.velocity.y += 350;
                canJump = false;
                break;
        }
    }
    function keyupHandler(event){
        var prevent = true;
        switch(event.keyCode){
            case KEYS.A:
            case KEYS.LEFT: movingLeft = false;
                break;
            case KEYS.W:
            case KEYS.UP: movingForward = false;
                break;
            case KEYS.S:
            case KEYS.DOWN: movingBackward = false;
                break;
            case KEYS.D:
            case KEYS.RIGHT: movingRight = false;
                break;
            case KEYS.SPACE:
                break;
            default:
                prevent = false;
        }
        if(prevent) event.preventDefault();
    }
    var controlsEnabled = false;
    function pointerlockchange(event){
        if(document.webkitPointerLockElement === body || document.pointerLockElement === body || document.mozPointerLockElement === body){
            blocker.style.display = 'none';
            controls.enabled = true;
            controlsEnabled = true;
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
        }
    }
    function pointerlockerror(event){
        instructions.style.display = '';
    }
    function gameInit(event){
        instructions.style.display = 'none';
        body.requestPointerLock = body.requestPointerLock || body.mozRequestPointerLock || body.webkitRequestPointerLock();
        if(/Firefox/i.test(navigator.userAgent)){
            var fullscreenchange = function(event){
                if(document.fullscreenElement === body || document.mozFullScreenElement === body || document.webkitPointerLockElement === body){
                    controlsEnabled = true;
                    controls.enabled = true;
                    blocker.style.display = 'none';
                } else {
                    controls.enabled = false;
                    blocker.style.display = '-webkit-box';
                    blocker.style.display = '-moz-box';
                    blocker.style.display = 'box';
                    instructions.style.display = '';
                }
            };
        } else {
            body.requestPointerLock();
        }
    }
    fpcam.getObject = function(){
        return controls.getObject();
    };
    fpcam.update2 = function(delta){
        if(movingForward) app.velocity.z -= 400.0 * delta;
        if(movingBackward) app.velocity.z += 400.0 * delta;
        if(movingLeft) app.velocity.x -= 400.0 * delta;
        if(movingRight) app.velocity.x += 400.0 * delta;
        
        if(app.onObject){
            app.velocity.y = Math.max(0, app.velocity.y);
            canJump = true;
        }
        
        controls.getObject().translateX(app.velocity.x * delta);
        controls.getObject().translateY(app.velocity.y * delta);
        controls.getObject().translateZ(app.velocity.z * delta);
        if(controls.getObject().position.y < 10){
            app.velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }
    };
    
    /*
     * Called by Render Loop
     */
    fpcam.update = function(delta){
        
        if(movingForward){
            fpcam.camera.position.x += (moveSpeed * delta * Math.sin(RADS * phi));
            fpcam.camera.position.z += (moveSpeed * delta * Math.cos(RADS * phi));
            movingForward = false;
        }
        if(movingBackward){
            fpcam.camera.position.x += (-moveSpeed * delta * Math.sin(RADS * phi));
            fpcam.camera.position.z += (-moveSpeed * delta * Math.cos(RADS * phi));
            movingBackward = false;
        }
        if(movingLeft){
            fpcam.camera.position.x += (moveSpeed * delta * Math.sin(RADS * (phi + 90)));
            fpcam.camera.position.z += (moveSpeed * delta * Math.cos(RADS * (phi + 90)));
            movingLeft = false;
        }
        if(movingRight){
            fpcam.camera.position.x += (moveSpeed * delta * Math.sin(RADS * (phi - 90)));
            fpcam.camera.position.z += (moveSpeed * delta * Math.cos(RADS * (phi - 90)));
            movingRight = false;
        }
        if(lookingLeft){
            phi = phi + (delta * lookSpeed);
            lookingLeft = false;
        }
        if(lookingRight){
            phi = phi - (delta * lookSpeed);
            lookingRight = false;
        }
        var look = fromSpherical(1, phi, theta);
        fpcam.camera.lookAt(look);
    };
    
    return app;
})(THREE, window, App);
