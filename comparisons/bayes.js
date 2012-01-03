function intlgamma(x) {
        var S = 0;
        var i;
        for (i = 2; i < x; i++)
                S += Math.log(i);

        return S;
}

function h(a, b, c, d) {
        var r = 0;
        r += intlgamma(a + c) - intlgamma(a);
        r += intlgamma(b + d) - intlgamma(b);
        r += intlgamma(a + b) - intlgamma(c);
        r += intlgamma(c + d) - intlgamma(d);
        r -= intlgamma(a + b + c + d);
        
        return Math.exp(r);
}

function g0(a, b, c) {
        var r = 0;
        r += intlgamma(a + b) - intlgamma(a + b + c);
        r += intlgamma(a + c) - intlgamma(a);
        
        return Math.exp(r);
}

function g(a, b, c, d) {
        var i;
        var r = g0(a, b, c);
        for (i = 1; i < d; i++)
                r += h(a, b, c, i) / i;
        
        return r;
}


function Pagtb(s1, f1, s2, f2) {
        return g(s1+1, f1+1, s2+1, f2+1);
}
