var is_prime;
is_prime = function(num) {
    /****************************************************
    * Return whether or not num is prime (brute force
    * up to Math.floor(Math.sqrt(num) + 1)
    ****************************************************/
    var check_div;
    check_div = 2;
    var max_check;
    max_check = Math.floor(Math.sqrt(num) + 1);
    // check if num is divisible by all numbers check_div
    // in range 2 <= check_div < max_check
    while (check_div < max_check) {
        // if it is, return false
        if (num % check_div == 0) {
            return false;
        }
        check_div = check_div + 1;
    }
    // else return true
    return true;
}

var is_prime_opt;
is_prime_opt = function(num) {
    /****************************************************
    * Return whether or not num is prime (more optimized)
    ****************************************************/
    // check if num is even
    if (num % 2 == 0) {
        return false;
    }
    // check if num is divisible by all odd numbers check_div
    // in range 3 <= check_div < max_check
    var max_check;
    max_check = Math.floor(Math.sqrt(num) + 1);
    var check_div;
    check_div = 3;
    while (check_div < max_check) {
        // if it is, return false
        if (num % check_div == 0) {
            return false;
        }
        check_div = check_div + 2;
    }
    // else return true
    return true;
}

var is_prime_given_past_primes;
is_prime_given_past_primes = function(num, past_primes) {
    /****************************************************
    * Return whether or not num is prime given all
    * past prime numbers.
    ****************************************************/
    var i;
    i = 0;
    while (i < past_primes.length) {
        if ((num % past_primes[i]) == 0) {
            return false;
        }
        i = i + 1;
    }
    return true;
}

module.exports = { is_prime, is_prime_opt, is_prime_given_past_primes };
