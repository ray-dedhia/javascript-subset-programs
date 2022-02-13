function sieve_sundaram(MAX, primes) {  
    /****************************************************
    * Utility function for Sieve of Sundaram
    ****************************************************/
    var marked;
    marked = new Array(parseInt(MAX / 2) + 100).fill(false);
 
    var i;
    i = 1;
    while (i <= (Math.sqrt(MAX) - 1) / 2) {
        var j;
        j = (i * (i + 1)) << 1;
        while (j <= MAX / 2) {
            marked[j] = true;
            j = j + 2 * i + 1;
        }
        i = i + 1;
    }
 
    primes.push(2);
 
    i = 1;
    while (i <= MAX/2) {
        if (marked[i] == false) {
            primes.push(2 * i + 1);
        }
        i = i + 1;
    }

    return primes;
}
 
var goldbach_conjecture;
goldbach_conjecture = function(n, MAX=10000) {
    /****************************************************
    * Express a given even integer greater than 2 as the
    * sum of two primes (strong or binary Goldbach conjecture). 
    ****************************************************/
    var primes;
    primes = new Array();
     
    // get all prime numbers < MAX
    primes = sieve_sundaram(MAX, primes);

    // return null if number is invalid (i.e is not an integer, 
    // is odd, or is less than 3)
    if (!(Math.floor(n)==n) || n % 2 != 0 || n < 3) {
        console.log("Error: Invalid parameter. Number must be an even integer greater than three.");
        return [null, null];
    }
 
    // check up to n / 2
    var i;
    i = 0;
    while (primes[i] <= n) {
        // find difference by subtracting
        // current prime from n
        var diff;
        diff = n - primes[i];
 
        // check if difference is also prime
        if (primes.includes(diff)) {
            return [primes[i], diff];
        }
        i = i + 1;
    }

    // return null if solution not found
    console.log("Warning: Solution not found. Increase MAX (" + MAX + ") to find a solution.");
    return [null, null];
}

module.exports = { goldbach_conjecture };
