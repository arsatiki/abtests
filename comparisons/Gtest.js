function expectations(s1, f1, s2, f2) {
        var succ = s1 + s2;
        var fail = f1 + f2;
        
        var alt1 = s1 + f1;
        var alt2 = s2 + f2;
        
        var total = succ + fail;
        
        return [succ * alt1 / total,
                fail * alt1 / total,
                succ * alt2 / total,
                fail * alt2 / total];
}

function term(obs, exp) { return 2 * obs * Math.log(obs / exp); }


function gtest(s1, f1, s2, f2) {
        var expected = expectations(s1, f1, s2, f2)
        var G = 0;
        var i;

        for (i = 0; i < 4; i++)
                G += term(arguments[i], expected[i]);

        return G;
}

function chi2dof1(a) {
    var x2 = [0.004, 0.02, 0.06, 0.15, 0.46, 1.07, 1.64, 2.71, 3.84, 6.64, 10.83];
    var p = [0.95, 0.90, 0.80, 0.70, 0.50, 0.30, 0.20, 0.10, 0.05, 0.01, 0.001];
    var i;
    
    for (i = 1; i < x2.length; i++)
            if (a < x2[i])
                    return p[i - 1];
    return p[p.length - 1];
}