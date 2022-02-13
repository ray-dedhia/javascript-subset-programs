var { goldbach_conjecture } = require("./goldbach-conj.js");
var { check } = require("../check.js");
 
function test() {
    var gc;
    var num;

    num = 4;
    gc = goldbach_conjecture(num);
    console.log(num + " = sum(" + gc + ")");
    check(4, gc[0] + gc[1], "Goldbach conjecture (1/3)");

    num = 38;
    gc = goldbach_conjecture(num);
    console.log(num + " = sum(" + gc + ")");
    check(num, gc[0] + gc[1], "Goldbach conjecture (2/3)");

    num = 100;
    gc = goldbach_conjecture(num);
    console.log(num + " = sum(" + gc + ")");
    check(num, gc[0] + gc[1], "Goldbach conjecture (3/3)");
}

test();
