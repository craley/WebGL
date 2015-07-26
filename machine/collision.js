/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App = (function(t3, window, app){
    
    var colide = app.colide = {};
    
    var distance = 32;
    var rays = [
        new t3.Vector3(0,0,1),
        new t3.Vector3(1,0,1),
        new t3.Vector3(1,0,0),
        new t3.Vector3(1,0,-1),
        new t3.Vector3(0,0,-1),
        new t3.Vector3(-1,0,-1),
        new t3.Vector3(-1,0,0),
        new t3.Vector3(-1,0,1)
    ];
    var caster = app.caster = new t3.Raycaster();
    
    colide.test = function(geo){
        var items = app.world.items;
        var x;
        var collisions;
        for(x = 0; x < rays.length; x++){
            caster.set(geo.position, rays[x]);//origin, direction
            //test for collision
            collisions = caster.intersectObjects(items);
            if(collisions){
                return true;
            }
        }
        return false;
    };
    
    return app;
})(THREE, window, App);

