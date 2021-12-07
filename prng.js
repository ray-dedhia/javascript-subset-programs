function msmPRNG(seed, num_of_digits) {
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

function lcgPRNG(seed, a, c, m) {
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

function testPRNGs() {
    var seed; 
    var msmRand;
    var lcgRand;
    seed = new Date().getMilliseconds();
    msmRand = msmPRNG(seed, 4);
    console.log(msmRand);
    lcgRand = lcgPRNG(seed, 1664525, 1013904223, 2**32);
    console.log(lcgRand);
}

testPRNGs()


/****************************************************
* Sources:
* - https://www.codespeedy.com/building-pseudo-random-number-generator-from-scratch-in-javascript/
****************************************************/
