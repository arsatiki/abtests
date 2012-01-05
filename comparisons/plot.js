function bayescoloring(p) {
        return  (p < .5)? "hsl(0, 50%, 50%)"
               :(p < .75)? "hsl(24, 50%, 50%)"
               :(p < .9091)? "hsl(48, 50%, 50%)"
               :(p < .9677)? "hsl(72, 50%, 50%)"
               :(p < .9901)? "hsl(96, 50%, 50%)"
               :"hsl(120, 50% ,50%)";
}

function gtestcoloring(p) {
        return (p <= .05)? "rgba(0,0,0,0)" : "#000";
}

function range(n) {
        var r = [];
        var i;
        for (i = 0; i < n; i++)
                r[r.length] = i;

        return r;
}

function assignPlotter(canvas, f, colormap, succ, fail) {
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var worker = new Worker('plotworker.js');

        worker.onmessage = function(event) {
                var x = event.data.x;
                var y = event.data.y;

                ctx.fillStyle = colormap(event.data.p)
                ctx.fillRect(x, canvas.height - y - 1, 2, 2);
        
        };

        worker.onerror = function(error) {
                if (console)
                        console.log("Worker error: " + error.message);
                throw error;
        }

        worker.postMessage({c: succ, d: fail, funcname: f,
                        as: range(canvas.width), 
                        bs: range(canvas.height)});

}
