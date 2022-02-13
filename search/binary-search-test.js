var binary_search;
binary_search = require("./binary-search.js");
var { check } = require("../check.js");

function binary_search_test() {
    var arr; 
    var item; 
    var index; 
    var val;

    arr = [1, 3, 5, 7, 9];
    item = 3;
    index = binary_search(item, arr);
    check(arr[index], item, "Binary search");
}

binary_search_test();
