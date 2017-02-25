var bubbly = (function () {
    "use strict";
    var instance;
    function bubblyfy(str) {
        if (instance) {
            return instance;
        }
        instance = this;
        this.init(str);
    }
    
    bubblyfy.prototype = {
        init : function(str){
             console.log(str);
        }
    };
    
    
    bubblyfy.getInstance = function (str) {
        return instance || new bubblyfy(str);
    }
    return bubblyfy;
}());