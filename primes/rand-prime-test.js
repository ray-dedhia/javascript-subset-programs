var { get_random_prime } = require("./rand-prime.js");
var { is_prime } = require("./is-prime.js");

function rand_prime_test() {
    var range;
    range = [100, 1000];
    var rand_prime;
    rand_prime = get_random_prime(range);
    var test_res;
    if (rand_prime>range[0] && rand_prime<range[1] && is_prime(rand_prime)) {
        test_res = "PASS";
    } else {
        test_res = "FAIL";
    }

    console.log("Random prime: " + rand_prime);
    console.log("Generate random prime number: " + test_res);
}

rand_prime_test();
