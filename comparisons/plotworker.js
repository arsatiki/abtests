importScripts('bayes.js');
importScripts('Gtest.js');

var ___FUNCTIONS___ = {"bayes": Pagtb, "gtest": PGgtX};

onmessage = function (event) {
        var n = event.data.n;
        var c = event.data.c;
        var d = event.data.d;
        var as = event.data.as;
        var bs = event.data.bs;
        var f = ___FUNCTIONS___[event.data.funcname]
        var i, j;

        for (i = 0; i < as.length; i++)
                for (j = 0; j < bs.length; j++ )
                        self.postMessage({p: f(as[i], bs[j], c, d), 
                                          x:as[i], y:bs[j]});
}
