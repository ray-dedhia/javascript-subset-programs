var { check } = require("../check.js");
var { get_nth_prime } = require("./nth-prime.js");

function get_nth_prime_test() {
    var n;
    n = 1001;
    var nth_prime = 7927;
    check(get_nth_prime(n), nth_prime, "Get nth prime");
}

get_nth_prime_test();
