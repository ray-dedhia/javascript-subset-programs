function is_prime(num, past_primes = null) {
    /****************************************************
    * Return whether or not num is prime
    *
    * Parameter past_primes is list of all prime numbers
    * less than n (optional)
    ****************************************************/
    // if past_primes list is not null
    if (past_primes != null) {
        var j;
        j = 0;
        // check if num is divisible by past primes
        while (j < past_primes.length) {
            // if it is, return false
            if (num % past_primes[j] == 0) {
                return false;
            }
            j = j + 1;
        }
        // else return true
        return true;
    }

    // if past primes is null
    var check_div;
    check_div = 2;
    // check if num is divisible by all numbers check_div
    // in range 2 <= check_div < num
    while (check_div < num) {
        // if it is, return false
        if (num % check_div == 0) {
            return false;
        }
        check_div = check_div + 1;
    }
    // else return true
    return true;
}

function get_nth_prime(n) {
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
        num_is_prime = is_prime(num, past_primes);
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

function test() {
    var n;
    n = 1001;
    console.log(n + "th prime = " + get_nth_prime(n));
    var a;
    a = 351;
    console.log(a + " is prime = " + is_prime(a));
    var b;
    b = 1483;
    console.log(b + " is prime = " + is_prime(b));
}

test();
