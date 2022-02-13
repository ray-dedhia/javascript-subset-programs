module.exports = function (seed, a, c, m) {
    /****************************************************
    * Generate a pseudo-random number using the linear 
    * congruential generator algorithm.
    *
    * seed (0 <= seed < m) is initial value provided to algorithm
    * a (0 < a < m) is the multiplier
    * c (0 <= c < m) is the increment
    * m (0 < m) is the modulus
    ****************************************************/

    seed = (a * seed * c) % m;
    return seed / m;
}
