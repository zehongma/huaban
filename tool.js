function Pen(option) {
    this.statrX = null;
    this.statrY = null;
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.cav = option.dom;
    this.cts = option.dom.getContext("2d");
    this.init(option);
}
Pen.prototype = {
    constructor: Pen,
    init: function(option) {
        this.setEvent(option);
    },
    setEvent: function(option) {
        var that = this;
        // 画笔
        function brush(e) {
            var x = e.offsetX;
            var y = e.offsetY;
            that.creatLine(x, y);
        }

        //为画布绑定点击事件
        this.cav.onmousedown = function(e) {
            that.statrX = e.offsetX;
            that.statrY = e.offsetY;
            that.cts.beginPath();
            this.onmousemove = brush;
        };
        window.onmouseup = function() {
            that.cav.onmousemove = null;
        }
    },
    creatLine: function(x, y) {
        // this.cts.save();
        this.cts.strokeStyle = this.strokeStyle;
        this.cts.lineWidth = this.lineWidth;
        this.cts.moveTo(this.statrX, this.statrY);
        this.cts.lineTo(x, y);
        this.cts.closePath();
        // this.cts.restore();
        this.cts.stroke();
        this.statrX = x;
        this.statrY = y;
    }
}


// 橡皮的构造函数
function Rutter(option) {
    this.statrX = null;
    this.statrY = null;
    this.cav = option.dom;
    this.cts = option.dom.getContext("2d");
    this.lineWidth = 4;
    this.init(option);
}

Rutter.prototype = {
    constructor: Rutter,
    init: function(option) {
        this.clearRet(option);
    },
    clearRet: function(option) {
        var that = this;

        function clear(e) {
            that.statrX = e.offsetX;
            that.statrY = e.offsetY;
            that.recClear();
        }
        this.cav.onmousedown = function(e) {
            that.statrX = e.offsetX;
            that.statrY = e.offsetY;
            that.recClear();
            this.onmousemove = clear;
        }
        window.onmouseup = function() {
            that.cav.onmousemove = null;
        }
    },
    recClear: function() {
        this.cts.clearRect(this.statrX - this.lineWidth / 2, this.statrY - this.lineWidth / 2, this.lineWidth, this.lineWidth);
    }
}

/*function Rect(option) {
    this.strokeStyle = "#000";
    this.cav = option.dom;
    this.cts = option.dom.getContext("2d");
    this.fillStyle = null;
}
Rect.prototype = {
    constructor: Rect,
    draw: function(statrX, statrY, endX, endY) {
        if (this.fillStyle) {
            this.cts.fillStyle = this.fillStyle;
            this.cts.fillRect(statrX, statrY, endX, endY);
            return;
        } else {
            this.cts.strokeStyle = this.strokeStyle;
            this.cts.strokeRect(statrX, statrY, endX, endY);
        }
    }
}*/



function Rect(option) {
    this.statrX = null;
    this.statrY = null;
    this.strokeStyle = "#000";
    this.endX = null;
    this.endY = null;
    this.mvX = null;
    this.mvY = null;
    this.fillStyle = null;
    this.cav = option.dom;
    this.cts = option.dom.getContext("2d");
    this.init(option);
}
Rect.prototype = {
    constructor: Rect,
    init: function(option) {
        this.fillStyle = option.fillStyle;
        this.creatRect(option);
    },
    creatRect: function(option) {
        var that = this;

        function clearR(e) {
            that.clear();
            that.endX = e.offsetX;
            that.endY = e.offsetY;
            that.setRect();
            that.mvX = e.offsetX;
            that.mvY = e.offsetY;
        }
        this.cav.onmousedown = function(e) {
            that.statrX = e.offsetX;
            that.statrY = e.offsetY;
            that.endX = that.statrX;
            that.endY = that.statrY;
            this.onmousemove = clearR;
        }
        window.onmouseup = function() {
            that.cav.onmousemove = null;
        }
    },
    setRect: function() {
        if (this.fillStyle) {
            this.cts.fillStyle = this.fillStyle;
            this.cts.fillRect(this.statrX, this.statrY, this.endX - this.statrX, this.endY - this.statrY);
            return;
        }
        this.cts.strokeStyle = this.strokeStyle;
        this.cts.strokeRect(this.statrX, this.statrY, this.endX - this.statrX, this.endY - this.statrY);

    },
    clear: function() {

        var bian = 1;
        if (this.fillStyle) {
            bian = 0;
        }

        // 如果目标点是X正轴方向
        if (this.endX > this.statrX) {
            if (this.endY > this.statrY) {
                this.cts.clearRect(this.statrX - bian, this.statrY - bian, this.endX - this.statrX + bian * 2, this.endY - this.statrY + bian * 2);
            } else if (this.endY < this.statrY) {
                this.cts.clearRect(this.statrX - bian, this.endY - bian, this.endX - this.statrX + bian * 2, this.statrY - this.endY + bian * 2);
            }
        } else if (this.endX < this.statrX) {
            if (this.endY > this.statrY) {
                this.cts.clearRect(this.endX - bian, this.statrY - bian, this.statrX - this.endX + bian * 2, this.endY - this.statrY + bian * 2);
            } else if (this.endY < this.statrY) {
                this.cts.clearRect(this.mvX - bian, this.mvY - bian, this.statrX - this.mvX + bian * 2, this.statrY - this.mvY + bian * 2);
            }
        }
    }
}

// 创建文字构造函数
function Text(option) {
    this.strokeStyle = "#000";
    this.fillStyle = "#000";
    this.fontSize = "16px";
    this.style = "";
    this.ctx = option.dom.getContext("2d");
}
Text.prototype = {
    constructor: Text,
    drawText: function(text, x, y) {

        var maxW = 10;
        var maxSize = 100;
        var currenSize = parseInt(this.fontSize, 10) / maxSize * maxW;
        this.ctx.lineWidth = currenSize;

        this.ctx.fillStyle = this.fillStyle;
        this.ctx.strokeStyle = this.strokeStyle;
        if (this.style == "bold" || this.style == "italic") {
            this.ctx.font = this.style + " " + parseInt(this.fontSize, 10) + "px " + "黑体";
        } else {
            this.ctx.font = parseInt(this.fontSize, 10) + "px " + "黑体";
        }

        if (this.line != "") {
            var textW = this.ctx.measureText(text).width;
            var textH = parseInt(this.fontSize, 10);
            if (this.style == "line") {
                this.ctx.moveTo(x, y + textH + 2);
                this.ctx.lineTo(x + textW, y + textH + 2)
                this.ctx.stroke();
            } else if (this.style == "del") {
                this.ctx.moveTo(x, y + textH / 2);
                this.ctx.lineTo(x + textW, y + textH / 2);
                this.ctx.stroke();
            }
            this.ctx.beginPath();
        }
        this.ctx.textBaseline = "top";
        this.ctx.fillText(text, x, y);

    }
}