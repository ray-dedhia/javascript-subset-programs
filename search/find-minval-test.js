var find_min_value;
find_min_value = require("./find-minval.js");
var { check } = require("../check.js");

function find_minval_test() {
    var arr; 
    arr = [2, 5, 3, 7, 8, 10, 15, 18, 24, 111, 12, 19, 87];
    var minval;
    minval = 2;
    var item; 
    var index; 
    var val;

    val = find_min_value(arr);
    check(val, minval, "Find mininum value");
}

find_minval_test();
