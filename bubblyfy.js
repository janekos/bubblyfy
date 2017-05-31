'use strict';

class bubbly{
    
    constructor(path, div){        
        this.targetDiv = div;
        this.get(path);
    }
    
    get(path){
        
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onload = () => {
            if (xhr.status == 200) {
                this.init(JSON.parse(xhr.responseText));
            }else if(this.status == 404){
                console.log("File not found.");
            }else{
                console.log("Request returned error: " + xhr.status);
            }
        }            
        xhr.open("GET", path, true);            
        xhr.setRequestHeader('Content-Type', 'application/json');          
        xhr.send();        
    }
        
    init(data){
        let pageMainCss = this.generateMainCssCode(data.CSS);
        let pageCode = this.generateViewCode(data);
        document.getElementById(this.targetDiv).innerHTML = pageCode.HTML;
        document.getElementsByTagName("head")[0].innerHTML += pageMainCss + pageCode.CSS;
        this.bindEvents();
        //console.log(HTML);
    }
    
        
    generateViewCode(data, count = 0){

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
                                "top: 50%;"+
                                "left: 50%;"+
                                "transform: translate(-50%, -50%);"+
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
                                "height: 100%;";
                            if(data[key].border){
                                CSS += "border:"+data[key].border+";";
                            }
                            if(data[key].fontColor){
                                CSS += "color:"+data[key].fontColor+";";
                            }
                            if(data[key].background){
                                CSS += "background:"+data[key].background+";"+
                                       "background-size:" + data[key].size + "px " + data[key].size+"px;";
                            }
                            CSS += "}";
                }else{
                    CSS += "div."+key+"holder{"+ 
                                "width: "+data[key].orbit+"px;"+ 
                                "animation: "+data[key].rotation+" "+data[key].speed+"s infinite linear;"+ 
                                "transform-origin: top left;}"+ 
                            "div."+key+"{"+ 
                                "right:-"+data[key].size+"px;"+ 
                                "max-width: "+data[key].size+"px;"+ 
                                "max-height: "+data[key].size+"px;"+ 
                                "min-width: "+data[key].size+"px;"+ 
                                "min-height: "+data[key].size+"px;"+ 
                                "top: -"+(data[key].size)/2+"px;";
                            if(data[key].border){
                                CSS += "border:"+data[key].border+";";
                            }
                            if(data[key].fontColor){
                                CSS += "color:"+data[key].fontColor+";";
                            }
                            if(data[key].background){
                                CSS += "background:"+data[key].background+";"+
                                       "background-size:" + data[key].size + "px " + data[key].size+"px;";
                            }
                            CSS+="}";
                }

                if(data[key].border){
                    CSS += "div."+key+"{"+
                        "border:"+data[key].border+";}";
                }
                
                HTML += "<div class='"+key+"holder'>"+
                            "<div class='node "+key+"' style='cursor: pointer; display: flex; justify-content: center; align-items: center;'>"+
                                "<div class='textholder' style='position: relative;'>"+
                                    "<div class='"+key+"h1' style='margin: 0; padding: 0; font-size:"+(data[key].size)*0.2370+"px'><b>" + data[key].title + "</b></div>"+
                                    "<div class='"+key+"span' style='margin: 0; padding: 0; font-size:"+(data[key].size)*0.1185+"px'>" + data[key].text + "</div>"+
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
    }
        
    generateMainCssCode(data){
        var CSS = "<style>#"+this.targetDiv+"{";
        for (var i in data) {
            CSS += i + " : "+data[i]+";";
        }            
        CSS += "}</style>";
        return CSS;
    }       
        
    bindEvents(){
        this.nodes();
    }

    nodes(){
        var nodes = document.getElementsByClassName("node");
        for (var i = 0, len = nodes.length; i < len; i++) {
            nodes[i].addEventListener("click", function(){
                console.log(this.classList);
            });
        }
    }
}