module.exports = function (seed, num_of_digits) {
    /****************************************************
    * Generate a pseudo-random number using the middle 
    * square method.
    ****************************************************/
    var n; 
    var start; 
    var end;
    // square the seed and multiply by the seed if length is < 2n
    n = seed ** 2; (seed * seed).toString();
    while (n.toString().length < num_of_digits * 2) {
        n *= seed;
    }
    // take the middle n digits from the squared seed
    start = ~~(num_of_digits / 2);
    end = start + num_of_digits;
    // generate a new random number
    seed = parseInt(n.toString().substring(start, end));
    return seed;
}
