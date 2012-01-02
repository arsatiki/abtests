from __future__ import division
from random import betavariate, gammavariate
import math
import sys

def dirichletmvariate(*params):
    sample = [gammavariate(a, 1) for a in params]
    total = sum(sample)
    return [v/total for v in sample]

def betasample(s1, f1, s2, f2):
    p1 = betavariate(s1 + 1, f1 + 1)
    p2 = betavariate(s2 + 1, f2 + 1)
    return p1, p2

def dirsample(s1, f1, s2, f2):
    ps = dirichletmvariate(s1 + 1, f1 + 1, s2 + 1, f2 + 1)
    p1 = ps[0] / (ps[0] + ps[1])
    p2 = ps[2] / (ps[2] + ps[3])
    return p1, p2

def accept(p):
    return p[0] > p[1]

def simulate(sample, Ni, s1, f1, s2, f2):
    count = 0
    for k in range(Ni):
        if accept(sample(s1, f1, s2, f2)):
            count += 1
    return count / Ni

def print_odds(p):
    o = p / (1 - p)
    b = 10 * math.log(o, 10)

    if o > 1:
        s = "%.4f to 1" % o
    else:
        s = "1 to %.4f" % (1 / o)
    
    print s, "or %.4f dB" % b


def main():
    if len(sys.argv) != 6:
        sys.exit("Usage: %s n_iter succ1 fail1 succ2 fail2" % sys.argv[0])
    
    total, s1, f1, s2, f2 = map(int, sys.argv[1:])

    print "Beta:"
    print_odds(simulate(betasample, total, s1, f1, s2, f2))
    
    #print "Dirichlet:"
    #print_odds(simulate(dirsample, total, s1, f1, s2, f2))

if __name__ == "__main__":
    main()