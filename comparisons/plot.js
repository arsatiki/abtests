function bayescoloring(p) {
        return  (p < .5)? "hsl(0, 50%, 50%)"
               :(p < .75)? "hsl(24, 50%, 50%)"
               :(p < .9091)? "hsl(48, 50%, 50%)"
               :(p < .9677)? "hsl(72, 50%, 50%)"
               :(p < .9901)? "hsl(96, 50%, 50%)"
               :"hsl(120, 50% ,50%)";
}

function intpoints(end, n) {
        var r = [];
        var rtrue = 0;
        while (rtrue < end) {
                r[r.length] = Math.floor(rtrue);
                rtrue += end / n;
        }
        return r;
}

function grayplot(canvas, s1, f1, n) {
        var colors = [
                "hsl(0, 50%, 50%)",
                "hsl(24, 50%, 50%)",
                "hsl(48, 50%, 50%)",
                "hsl(72, 50%, 50%)",
                "hsl(96, 50%, 50%)",
                "hsl(120, 50% ,50%)"
        ];

        var ctx = canvas.getContext("2d");
        
        var w = canvas.width / n;
        var h = canvas.height / n;

        var worker = new Worker('plotworker.js');

        worker.onmessage = function(event) {
                var x = event.data.x;
                var y = event.data.y;

                ctx.fillStyle = filler(event.data.p, colors);
                ctx.fillRect(x, canvas.height - y - h, w+1, h+1);
        
        };

        worker.onerror = function(error) {
                console.log("Worker error: " + error.message);
                throw error;
        }

        worker.postMessage({a: s1, b: f1, funcname: "bayes",
                        cs: intpoints(canvas.width, n), 
                        ds: intpoints(canvas.height, n)});

}

function process(cid, xid, yid, n) {
        var canvas = document.getElementById(cid);
        var xslider = document.getElementById(xid);
        var yslider = document.getElementById(yid);
        
        var s1 = parseInt(xslider.value);
        var f1 = parseInt(yslider.value);
        
        grayplot(canvas, s1, f1, n);
        
        canvas = document.getElementById('gtest');
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(25, 25, 50, 50);
}

function normalize(cid, xid, yid) {
        var canvas = document.getElementById(cid);
        var xslider = document.getElementById(xid);
        var yslider = document.getElementById(yid);
        
        xslider.max = canvas.width;
        yslider.max = canvas.height;
}