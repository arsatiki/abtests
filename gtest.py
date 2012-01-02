from __future__ import division
import math
import bisect

def expectations(s1, f1, s2, f2):
    succ = s1 + s2
    fail = f1 + f2
    
    alt1 = s1 + f1
    alt2 = s2 + f2
    
    total = succ + fail
    
    s1exp = succ * alt1 / total
    f1exp = fail * alt1 / total
    s2exp = succ * alt2 / total
    f2exp = fail * alt2 / total

    return s1exp, f1exp, s2exp, f2exp

def term(obs, exp):
    return 2 * obs * math.log(obs / exp)

def gtest(s1, f1, s2, f2):
    s1e, f1e, s2e, f2e = expectations(s1, f1, s2, f2)
    
    G = term(s1, s1e) + term(f1, f1e) + term(s2, s2e) + term(f2, f2e)
    return G

def chi2dof1(a):
    # TODO: Needs work
    x2 = [0.004, 0.02, 0.06, 0.15, 0.46, 1.07, 1.64, 2.71, 3.84, 6.64, 10.83]
    p = [0.95, 0.90, 0.80, 0.70, 0.50, 0.30, 0.20, 0.10, 0.05, 0.01, 0.001]
    
    i = bisect.bisect_left(x2, a)
    return p[i]