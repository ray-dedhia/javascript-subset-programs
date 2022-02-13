var { is_prime_opt } = require("./is-prime.js");

module.exports = function (n) {
    /****************************************************
    * Return first twin prime_opt pair greater than the number n
    ****************************************************/
    // every prime_opt twin pair except (3, 5) can be expressed
    // in the form (6x-1, 6x+1) for some integer x
    if ((n < 3) || (n < 5)) {
        return (3, 5);
    }
    var i;
    i = 6*Math.ceil(Math.floor(n+2)/6);
    var max_prime_opt;
    max_prime_opt = 9007199254740880;
    while (i < max_prime_opt) {
        if (is_prime_opt(i-1) && is_prime_opt(i+1)) {
            return [i-1, i+1];
        }
        i = i + 6;
    }
    return null;
}
