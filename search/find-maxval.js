module.exports = function(arr) {
    /****************************************************
    * Return maximum value in array
    ****************************************************/
    var current_max;
    current_max = arr[0];
    var i;
    i = 0;
    while (i < arr.length) {
        if (arr[i] > current_max) {
            current_max = arr[i];
        }
        i = i + 1;
    }
    return current_max;
}
