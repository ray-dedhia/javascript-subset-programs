function get_random_num(min, max) {
    /****************************************************
    * Return random number in range [min, max] (inclusive)
    ****************************************************/
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function get_primes(min, max) {
    /****************************************************
    * Return all prime number in range [min, max] (inclusive)
    ****************************************************/
    var result;
    result = Array(max + 1).fill(0).map((_, i) => i);
    var i;
    i = 2;
    while (i <= Math.sqrt(max + 1)) {
        var j;
        j = i ** 2;
        while (j < max + 1) {
            delete result[j];
            j += i;
        }
        i = i + 1;
    }
    return Object.values(result.slice(min));
}

var get_random_prime;
get_random_prime = function([min, max]) {
    /****************************************************
    * Return random prime number in range [min, max] (inclusive)
    ****************************************************/
    var primes;
    primes = get_primes(min, max);
    return primes[get_random_num(0, primes.length - 1)];
}

module.exports = { get_random_prime };
