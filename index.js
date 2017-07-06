var tools = null;
var falg = false;
var isret = null;
var canvas = document.querySelector("#canvas-main");


// 提取为时间委托
document.querySelector(".tool").addEventListener("click", function(e) {
    if (e.target.nodeName == "P") {

        if (document.querySelector(".tool .active")) {
            document.querySelector(".tool .active").classList.remove("active")
        }

        e.target.classList.add("active");
        var gc = e.target.id;
        if (gc == "Pen") {
            tools = new Pen({
                dom: canvas
            })
        } else if (gc == "Rect") {
            tools = new Rect({
                dom: canvas
            })
        } else if (gc == "Rutter") {
            tools = new Rutter({
                dom: canvas
            })
        } else if (gc == "Text") {
            tools = new Text({
                dom: canvas
            })
        }
        document.querySelector(".targetColor").style.backgroundColor = "#fff";
        falg = true;
        isret = e.target.id;
        canvas.style.cursor = e.target.getAttribute("data-curos");
        if (document.querySelector(".text-style .active")) {
            document.querySelector(".text-style .active").classList.remove("active")
        }
    }
});



// 设置属性
var lis = document.querySelectorAll(".color a");
for (var i = 0; i < lis.length; i++) {
    lis[i].style.backgroundColor = lis[i].getAttribute("data-color");
}
document.querySelector(".color ul").addEventListener("click", function(e) {
    if (e.target.nodeName == "A") {
        if (falg) {
            tools.strokeStyle = e.target.getAttribute("data-color");
        }
        if (isret == "Rect" || isret == "Text") {
            tools.fillStyle = e.target.getAttribute("data-color");
        }
        document.querySelector(".targetColor").style.backgroundColor = e.target.getAttribute("data-color");
    }
})


document.querySelector(".line").addEventListener("click", function(e) {
    if (e.target.nodeName == "P") {
        if (falg) {
            tools.lineWidth = e.target.children[0].getAttribute("data-w");
        }
    } else if (e.target.nodeName == "SPAN") {
        if (falg) {
            tools.lineWidth = e.target.getAttribute("data-w");
        }
    }
})


// 文字的样式
document.querySelector("canvas").addEventListener("mousedown", function(e) {
    var x = e.offsetX + this.offsetLeft;
    var y = e.offsetY + this.offsetTop;
    var textX = e.offsetX,
        textY = e.offsetY;

    if (isret == "Text") {
        if (!document.querySelector("textarea")) {
            var textbox = document.createElement("textarea");
            textbox.style.top = y + "px";
            textbox.style.left = x + "px";
            textbox.style.fontSize = document.querySelector(".font-size").value + "px";
            textbox.autofocus = "true";
            document.querySelector("body").appendChild(textbox);
            document.querySelector("canvas").onmousemove = null;
            textbox.onblur = function() {
                // 获取文本域的属性
                tools.fontSize = window.getComputedStyle(textbox, null)["font-size"];

                tools.drawText(textbox.value, textX, textY);
                document.querySelector("body").removeChild(textbox);

            }
        }

    }
    /*else if (isret == "Rect") {
           if (!document.querySelector(".recbox")) {

               var recbox = document.createElement("div");
               recbox.classList.add("recbox");
               recbox.style.top = y + "px";
               recbox.style.left = x + "px";
               document.querySelector("body").appendChild(recbox);
               document.querySelector("canvas").onmousemove = function(e) {
                   var eW = e.offsetX - x;
                   var eH = e.offsetY - y;
                   recbox.style.width = eW + "px";
                   recbox.style.height = eH + "px";
               }
           }
       }*/
})

document.querySelector(".text-style").onclick = function(e) {
    if (e.target.nodeName == "P") {
        if (isret == "Text") {
            if (document.querySelector(".text-style .active")) {
                document.querySelector(".text-style .active").classList.remove("active")
            }
            e.target.classList.add("active");
            tools["style"] = e.target.getAttribute("data-style");
        }
    }
}

// 添加字体大小
function addsize() {
    var arr = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.value = arr[i];
        option.innerHTML = arr[i];
        document.querySelector(".font-size").appendChild(option);
    }
}
addsize();