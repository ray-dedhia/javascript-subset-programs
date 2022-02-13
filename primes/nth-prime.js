var { is_prime_given_past_primes } = require("./is-prime.js");

var get_nth_prime;
get_nth_prime = function(n) {
    /****************************************************
    * Return nth prime number
    ****************************************************/
    var num;
    num = 2;
    var past_primes;
    past_primes = [];
    var prime_count;
    prime_count = 0;
    while (prime_count < n) {
        var num_is_prime;
        num_is_prime = is_prime_given_past_primes(num, past_primes);
        // if prime, add to past_primes and increment prime_count
        if (num_is_prime) {
            past_primes.push(num);
            prime_count = prime_count + 1;
        }
        // else check next number
        num = num + 1;
    }
    // when prime_count is n, return last prime number
    return past_primes[past_primes.length-1];
}

module.exports = { get_nth_prime };
