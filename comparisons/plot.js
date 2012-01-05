function bayescoloring(p) {
        return  (p < .5)? "hsl(0, 50%, 50%)"
               :(p < .75)? "hsl(24, 50%, 50%)"
               :(p < .9091)? "hsl(48, 50%, 50%)"
               :(p < .9677)? "hsl(72, 50%, 50%)"
               :(p < .9901)? "hsl(96, 50%, 50%)"
               :"hsl(120, 50% ,50%)";
}

function gtestcoloring(p) {
        return (p < .05)? "rgba(0,0,0,0)" : "black";
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

function assignWorker(canvas, f, colormap, succ, fail, n) {
        var ctx = canvas.getContext("2d");
        
        var w = canvas.width / n;
        var h = canvas.height / n;

        var worker = new Worker('plotworker.js');

        worker.onmessage = function(event) {
                var x = event.data.x;
                var y = event.data.y;

                ctx.fillStyle = colormap(event.data.p)
                ctx.fillRect(x, canvas.height - y - h, w+1, h+1);
        
        };

        worker.onerror = function(error) {
                console.log("Worker error: " + error.message);
                throw error;
        }

        worker.postMessage({c: succ, d: fail, funcname: f,
                        as: intpoints(canvas.width, n), 
                        bs: intpoints(canvas.height, n)});

}

function process(n) {
        var xslider = document.getElementById('xcoord');
        var yslider = document.getElementById('ycoord');
        
        var succ = parseInt(xslider.value);
        var fail = parseInt(yslider.value);
        
        assignWorker(document.getElementById('bayes'), 
                "bayes", bayescoloring, succ, fail, n);
        
        assignWorker(document.getElementById('gtest'),
                "gtest", gtestcoloring, succ, fail, n);
}

function normalize(cid, xid, yid) {
        var canvas = document.getElementById(cid);
        var xslider = document.getElementById(xid);
        var yslider = document.getElementById(yid);
        
        xslider.max = canvas.width;
        yslider.max = canvas.height;
}