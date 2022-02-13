var { check } = require("../check.js");
var { is_prime, is_prime_opt } = require("./is-prime.js");

function is_prime_test() {
    var test1;
    test1 = 351;
    var test1_prime;
    test1_prime = false;
    check(is_prime(test1), test1_prime, "is_prime (1/2)");
    check(is_prime_opt(test1), test1_prime, "is_prime_opt (1/2)");

    var test2;
    test2 = 1483;
    var test2_prime;
    test2_prime = true;
    check(is_prime(test2), test2_prime, "is_prime (2/2)");
    check(is_prime_opt(test2), test2_prime, "is_prime_opt (2/2)");
}

is_prime_test();
