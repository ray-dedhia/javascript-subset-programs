module.exports = function(arr) {
    /****************************************************
    * Return minimum value in array
    ****************************************************/
    var current_min; 
    current_min = arr[0];
    var i;
    i = 0;
    while (i < arr.length) {
        if (arr[i] < current_min) {
            current_min = arr[i];
        }
        i = i + 1;
    }
    return current_min;
}
