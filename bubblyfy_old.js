var bubbly = (function () {    
    "use strict";    
    var instance;    
    function bubblyfy(path, div) {
        if (instance) {
            return instance;
        }
        instance = this;
        this.targetDiv = div;
        console.log(div);
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
            var pageMainCss = this.generateMainCssCode(data.CSS);
            var pageCode = this.generateViewCode(data);
            document.getElementById(this.targetDiv).innerHTML = pageCode.HTML;
            document.getElementsByTagName("head")[0].innerHTML += pageMainCss + pageCode.CSS;
            this.bindEvents();
            //console.log(HTML);
        },
        
        generateViewCode : function(data, count = 0){
            
            count += 1;
            var HTML = "";
            var CSS = count == 1 ? "<style>" : "";
            var keyCount = Object.keys(data).length;
            
            for(var i = 0; i< keyCount; i++){
                var key = Object.keys(data)[i];
                if(key != "CSS"){
                    if(count == 1){
                        CSS += "div."+key+"holder {"+ 
                                    "position: absolute;"+
                                    "text-align: center;"+
                                    "top: 0;"+
                                    "left: 0;"+ 
                                    "right: 0;"+ 
                                    "bottom: 0;"+ 
                                    "height: "+data[key].size+"px;"+ 
                                    "width: "+data[key].size+"px;"+ 
                                    "margin: auto;}"+ 
                                "div[class$='holder']:not(:first-child){"+
                                    "position:absolute;"+
                                    "height: 0px;"+ 
                                    "top: 50%;"+ 
                                    "left: 50%;}"+ 
                                ".node{"+ 
                                    "border-radius: 9999px;"+ 
                                    "position: absolute;}"+ 
                                "div."+key+"{"+ 
                                    "width: 100%;"+ 
                                    "height: 100%;}";
                    }else{
                        CSS += "."+key+"holder{"+ 
                                    "width: "+data[key].orbit+"px;"+ 
                                    "animation: "+data[key].rotation+" "+data[key].speed+"s infinite linear;"+ 
                                    "transform-origin: top left;}"+ 
                                "."+key+"{"+ 
                                    "right:-"+data[key].size+"px;"+ 
                                    "max-width: "+data[key].size+"px;"+ 
                                    "max-height: "+data[key].size+"px;"+ 
                                    "min-width: "+data[key].size+"px;"+ 
                                    "min-height: "+data[key].size+"px;"+ 
                                    "top: -"+(data[key].size)/2+"px;}";
                    }

                    if(data[key].border){
                        CSS += "div."+key+"{"+
                            "border:"+data[key].border+";}";
                    }
                    
                    /*var style = window.getComputedStyle(document.getElementById(''), null).getPropertyValue('font-size');*/
                    /*margin-top:" + (data[key].size)/3 + "px;*/
                    HTML += "<div class='"+key+"holder'>"+
                                "<div class='node "+key+"' style=''>"+
                                    "<div class='textholder' style='position: relative; top: 50%; transform: translateY(-50%);'>"+
                                        "<h1 class='"+key+"' style='margin: 0; padding: 0; font-size:"+(data[key].size)*0.2370+"px'>" + data[key].title + "</h1>"+
                                        "<p class='"+key+"' style='margin: 0; padding: 0; font-size:"+(data[key].size)*0.1185+"px'>" + data[key].text + "</p>"+
                                    "</div>";
                    if(data[key].children){
                        var objHTML = this.generateViewCode(data[key].children, count);
                        CSS += objHTML.CSS;
                        HTML += objHTML.HTML;
                    }
                    HTML += "</div></div>";                    
                }
            }
            
            CSS += count == 1 ? "@keyframes cw {"+ 
                                    "from {transform:rotate(0deg) }"+
                                    "to {transform:rotate(360deg) }}"+
                                "@keyframes ccw {"+ 
                                    "from {transform:rotate(0deg) }"+
                                    "to {transform:rotate(-360deg) }}"+
                                    "</style>" : "";
                
            return {"HTML": HTML, "CSS": CSS};
        },
        
        generateMainCssCode : function(data){
            var CSS = "<style>#"+this.targetDiv+"{";
            for (var i in data) {
                CSS += i + " : "+data[i]+";";
            }            
            CSS += "}</style>";
            return CSS;
        },        
        
        bindEvents : function(){
            this.nodes();
        },
        
        nodes : function(){
            var nodes = document.getElementsByClassName("node");
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].addEventListener("click", function(){
                    console.log(this.id);
                });
            }
        }
    };    
    
    bubblyfy.getInstance = function (path, div) {
        return instance || new bubblyfy(path, div);
    }    
    return bubblyfy;
}());