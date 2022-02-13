var find_max_value;
find_max_value = require("./find-maxval.js");
var { check } = require("../check.js");

function find_maxval_test() {
    var arr; 
    arr = [2, 5, 3, 7, 8, 10, 15, 18, 24, 111, 12, 19, 87];
    var maxval;
    maxval = 111;
    var item; 
    var index; 
    var val;

    val = find_max_value(arr);
    check(val, maxval, "Find maxinum value");
}

find_maxval_test();
