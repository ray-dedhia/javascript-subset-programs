var { check } = require("../check.js");
var next_twin_prime;
next_twin_prime = require("./twin-prime.js");

function next_twin_prime_test() {
    var test1_n;
    test1_n = 100;
    var test1_primes;
    test1_primes = [101, 103];
    check(next_twin_prime(test1_n), test1_primes, "Next twin prime (1/3)");

    var test2_n;
    test2_n = 1000;
    var test2_primes;
    test2_primes = [1019, 1021];
    check(next_twin_prime(test2_n), test2_primes, "Next twin prime (2/3)");

    var test3_n;
    test3_n = 10000;
    var test3_primes;
    test3_primes = [10007, 10009];
    check(next_twin_prime(test3_n), test3_primes, "Next twin prime (3/3)");
}

next_twin_prime_test();
