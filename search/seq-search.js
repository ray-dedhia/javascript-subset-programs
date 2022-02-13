module.exports = function(item, arr) {
    /****************************************************
    * Run sequential search on array. Return index if
    * item is found, else return -1.
    ****************************************************/
    var i;
    i = 0;
    while (i < arr.length) {
        if (arr[i] === item) {
            return i;
        }
        i = i + 1;
    }
    // item not found
    return -1;
}
