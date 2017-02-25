(function(){
    'use strict';
    
    var bubblyfy = function(){
        
        if(bubblyfy.instance){
            return bubblyfy.instance;
        }
        
        bubblyfy.instance = this;
        
        this.init();
    }
    
    bubblyfy.prototype = {
        init : function(){
             
        }
    };
    
    window.onload = function(){
        var app = new bubblyfy();
    };
    
}());