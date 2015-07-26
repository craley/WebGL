/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App = (function(t3, window, app){
    
    var world = app.world = {};
    var items = world.items = [];
    
    function addCube(){
        var geometry = new t3.BoxGeometry(10, 10, 10);
        //var cubeMaterial = new t3.MeshLambertMaterial({ color: 0x1ec876 });
        var material = new t3.MeshBasicMaterial({ color: 0x1ec876 });//0x00ff00
        var cube = new t3.Mesh(geometry, material);
        //cube.rotation.y = Math.PI * 45 / 180;
        app.scene.add(cube);
        items.push(cube);
    }
    function addRandomBoxes(amount){
        var geometry = new t3.BoxGeometry(20,20,20);
        for(var i = 0, len = geometry.faces.length; i < len; i++){
            var face = geometry.faces[i];
            face.vertexColors[0] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }
        var material;
        for(var i = 0; i < amount; i++){
            material = new t3.MeshPhongMaterial({ specular: 0xffffff, shading: t3.FlatShading, vertexColors: t3.VertexColors });
            var mesh = new t3.Mesh(geometry, material);
            mesh.position.x = Math.floor(Math.random() * 20 - 10) * 20;
            mesh.position.y = Math.floor(Math.random() * 20) * 20 + 10;
            mesh.position.z = Math.floor(Math.random() * 20 - 10) * 20;
            app.scene.add(mesh);
            material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            items.push(mesh);
        }
    }
    function addLight(){
        //var pointLight = new t3.PointLight(0xffffff);
        //pointLight.position.set(0,300,200);
        //app.scene.add(pointLight);
        var light = new t3.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5,1,0.75);
        app.scene.add(light);
    }
    function addFog(){
        app.scene.fog = new t3.Fog(0xffffff, 0, 750);
    }
    function addFloor(){
        var geometry = new t3.PlaneGeometry(2000,2000,100,100);
        geometry.applyMatrix(new t3.Matrix4().makeRotationX(-Math.PI / 2));
        for(var i = 0, len = geometry.vertices.length; i < len; i++){
            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;
        }
        for(var i = 0, len = geometry.faces.length; i < len; i++){
            var face = geometry.faces[i];
            face.vertexColors[0] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new t3.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }
        var material = new t3.MeshBasicMaterial({ vertexColors: t3.VertexColors });
        var mesh = new t3.Mesh(geometry, material);
        app.scene.add(mesh);
    }
    
    world.update = function(delta){
        
    };
    
    world.init = function(){
        //addCube();
        addRandomBoxes(500);
        addLight();
        addFog();
        addFloor();
    };
    
    return app;
})(THREE, window, App);


