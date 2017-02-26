var bubbly = (function () {    
    "use strict";    
    var instance;    
    function bubblyfy(path) {
        if (instance) {
            return instance;
        }
        instance = this;
        this.d = document;
        this.get(path);
    }
    
    bubblyfy.prototype = {
        get : function(path){
            
            var xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (this.status == 200) {
                    instance.init(JSON.parse(this.responseText));
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
        
        init : function(data){
            var str = this.generate(data, Object.keys(data)[0]);
            document.getElementById("main_view").innerHTML = str;
            this.bindEvents();
            console.log(str);
        },
        
        /*generate : function(data, className){            
            var str = "";
            for(var obj in data){
                //var key = Object.keys(data)[Object.keys(data).indexOf(obj)];
                if(typeof data[obj] == 'object' && obj != "children"){
                    console.log(className);
                    str += "<div class='node "+ className +"'>";
                }
                if(data[obj] != null && typeof data[obj] == 'object'){                    
                    str += this.generate(data[obj], obj);
                }else{
                    if(typeof data[obj] != 'object'){
                        if(obj == "title"){
                            str +=  "<h1 class='"+ className +"'>" + data[obj] + "</h1>";
                        }else if(obj == "text"){
                            str +=  "<p class='"+ className +"'>" + data[obj] + "</p>";
                        }
                    }
                }
                if(typeof data[obj] == 'object' && obj != "children"){
                    str += "</div>";
                }
            }           
            return str;
        },*/
        
        generate : function(data, className){            
            var str = "";
            for(var obj in data){
                if(typeof data[obj] == 'object' && obj != "children"){
                    console.log(className);
                    str += "<div class='node "+ className +"'>";
                }
                if(obj == "title"){
                    str +=  "<h1 class='"+ className +"'>" + data[obj] + "</h1>";
                }else if(obj == "text"){
                    str +=  "<p class='"+ className +"'>" + data[obj] + "</p>";
                }else if(obj == "children"){
                    for(var objin in data[obj]){
                        str += this.generate(data[obj], objin);                        
                    }
                }
                if(typeof data[obj] == 'object' && obj != "children"){
                    str += "</div>";
                }
            }           
            return str;
        },
        
        bindEvents : function(){
            this.nodes();
        },
        
        nodes : function(){
            var nodes = document.getElementsByClassName("node");
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].addEventListener("click", function(e){
                    console.log(e);
                });
            }
            //console.log(nodes);
        }
    };    
    
    bubblyfy.getInstance = function (path) {
        return instance || new bubblyfy(path);
    }    
    return bubblyfy;
}());