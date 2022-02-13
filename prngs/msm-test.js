var msmPRNG;
msmPRNG = require("./msm.js");

function msmTest() {
    var seed; 
    var msmRand;
    seed = new Date().getMilliseconds();
    msmRand = msmPRNG(seed, 4);
    console.log("Random number:", msmRand);
}

msmTest();
