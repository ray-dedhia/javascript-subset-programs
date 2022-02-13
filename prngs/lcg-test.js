var lcgPRNG;
lcgPRNG = require("./lcg.js");

function lcgTest() {
    var seed; 
    var lcgRand;
    seed = new Date().getMilliseconds();
    lcgRand = lcgPRNG(seed, 1664525, 1013904223, 2**32);
    console.log("Random number:", lcgRand);
}

lcgTest();
