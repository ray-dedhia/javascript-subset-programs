function compare(a, b) { 
    if (typeof(a) !== typeof(b)) {
        console.log("diff type");
        return false;
    }
    if (typeof(a) == 'string') {
        return (a == b);
    }
    return (JSON.stringify(a) == JSON.stringify(b));
}

var check;
check = function (a, b, test_name) {
    /***********************************************
     * Compare two values. Print test_name: PASS
     * if they are equal, else print test_name: FAIL
     **********************************************/
    if (compare(a, b)) {
        console.log(test_name.concat(": PASS"));
    } else {
        console.log(test_name.concat(": FAIL"));
    }
}

module.exports = { check };
