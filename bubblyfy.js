var bubbly = (function () {    
    "use strict";    
    var instance;    
    function bubblyfy(path) {
        if (instance) {
            return instance;
        }
        instance = this;
        this.init(path);
    }
    
    bubblyfy.prototype = {
        init : function(path){
            
            var xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (this.status == 200) {
                    instance.build(JSON.parse(this.responseText));
                }else if(this.status == 404){
                    console.log("File not found.");
                }else{
                    console.log("Request returned error: " + this.status);
                }
            };            
            xhttp.open("GET", path, true);            
            xhttp.setRequestHeader('Content-Type', 'application/json');          
            xhttp.send();
        },
        
        build : function(data){
            var str = this.iterate(data);
            console.log(str);
        },
        
        iterate: function(data){            
            var str = "";            
            for(var obj in data){
                if(data[obj] != null && typeof data[obj] == 'object'){
                    str += this.iterate(data[obj]);
                }else{
                    if(typeof data[obj] != 'object'){                        
                        str += data[obj] + "/n";
                    }
                }
            }           
            return str;
        }
    };    
    
    bubblyfy.getInstance = function (path) {
        return instance || new bubblyfy(path);
    }    
    return bubblyfy;
}());