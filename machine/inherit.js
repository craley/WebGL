/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    var initializing = false;
    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    //The base Class implementation
    this.Class = function(){};
    //Create a new Class that inherits from this one
    Class.extend = function(prop){
        var _super = this.prototype;
        //instantiate a base class
        initializing = true;
        var prototype = new this();
        initializing = false;
        
        for(var name in prop){
            prototype[name] = typeof prop[name] == 'function' && typeof _super[name] == 'function' && fnTest.test(prop[name])
                ? (function(name, fn){
                    var tmp = this._super;
                    //add a new .super() method thats the same but on super-class
                    this._super = _super[name];
                    //only needs to be bound temporarily so nix it when done
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                })
                : prop[name];
        }
        //dummy class constructor
        function Class(){
            if(!initializing && this.init){
                this.init.apply(this, arguments);
            }
        }
        //populate constructed prototype object
        Class.prototype = prototype;
        //enforce the constructor to be what we expect
        Class.prototype.constructor = Class;
        //make this class extendable
        Class.extend = arguments.callee;
        return Class;
    };
})();

//Test:
var Person = Class.extend({
    init: function(isDancing){
        this.dancing = isDancing;
    },
    dance: function(){
        return this.dancing;
    }
});

var Ninja = Person.extend({
    init: function(){
        this._super(false);
    },
    dance: function(){
        return this._super();
    },
    swingSword: function(){
        return true;
    }
});
var p = new Person(true);
p.dance();// true

var n = new Ninja();
n.dance();// false
n.swingSword();// true

p instanceof Person && p instanceof Class;// true
n instanceof Ninja && n instanceof Person && n instanceof Class;// true
