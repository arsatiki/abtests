function filler(p) {
        return "hsl(0, 0," + Math.floor(100*p) + ")";
}

function grayplot(canvas, f, nx, ny) {
        var x;
        var y;
        var ctx = canvas.getContext("2d");
        
        var w = canvas.width / nx;
        var h = canvas.height / ny;
        var v = 0;
        
        for (x = 0; x < nx; x++) {
                for (y = 0; y < ny; y++) {
                        v = f(10*x, 10*y);
                        ctx.fillStyle = filler(v);
                        console.log(filler(v));
                        console.log(x*w + ", " + y*h);
                        ctx.fillRect(x*w, y*h, w, h);
                }
        }
}