function gridevaluate(f) {
        return function(event) {
                var n = event.data.n;
                var a = event.data.a;
                var b = event.data.b;
                var cs = event.data.cs;
                var ds = event.data.ds;
                var i, j;

                for (i = 0; i < cs.length; i++)
                        for (j = 0; j < ds.length; j++ )
                                self.postMessage({p: f(a, b, cs[i], ds[j]), 
                                                  x:cs[i], y:ds[j]});
                
        };
}
