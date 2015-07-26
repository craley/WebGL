/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App.event = {
    
    
    
    mouseup: function(ev){
        
    },
    mousedown: function(ev){
        
    },
    keydown: function(ev){
        
    },
    attach: function(elem){
        //perform attaching
        elem.addEventListener('mouseup', this.mouseup, false);
    }
};
App = (function(t3, window, app){
    
    var event = app.event = {};
    
    
    
    event.mouseup = function(ev){
        
    };
    function keydown(ev){
        switch(ev.keyCode){
            case 37://left
                break;
            case 38://up
                break;
            case 39://down
                break;
            case 40://right
        }
    };
    
    event.attach = function(){
        window.addEventListener('keydown', keydown, false);
    };
    
    return app;
})(THREE, window, App || {});

