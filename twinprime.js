function is_prime(num) {
    /****************************************************
    * Return whether or not num is prime 
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

function next_twin_prime(n) {
    /****************************************************
    * Return first twin prime pair greater than the number n
    ****************************************************/
    // every prime twin pair except (3, 5) can be expressed
    // in the form (6x-1, 6x+1) for some integer x
    if ((n < 3) || (n < 5)) {
        return (3, 5);
    }
    var i;
    i = 6*Math.ceil(Math.floor(n+2)/6);
    var max_prime;
    max_prime = 9007199254740880;
    while (i < max_prime) {
        if (is_prime(i-1) && is_prime(i+1)) {
            return [i-1, i+1];
        }
        i = i + 6;
    }
    return null;
}

function test() {
    var n;
    n = 100;
    console.log("Next twin primes > " + n + " = " + next_twin_prime(n));
    n = 1000;
    console.log("Next twin primes > " + n + " = " + next_twin_prime(n));
    n = 10000;
    console.log("Next twin primes > " + n + " = " + next_twin_prime(n));
}

test();

/****************************************************
* Sources:
* - http://javascripter.net/math/primes/primetwins.htm
****************************************************/
