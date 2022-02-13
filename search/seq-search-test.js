var sequential_search;
sequential_search = require("./seq-search.js");
var { check } = require("../check.js");

function seq_search_test() {
    var arr; 
    var item; 
    var index; 
    var val;

    arr = [2, 5, 3, 7, 8, 10, 15, 18, 24, 111, 12, 19, 87];
    item = 15;
    index = sequential_search(item, arr);
    check(item, arr[index], "Sequential search");
}

seq_search_test();
