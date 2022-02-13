module.exports = function(item, arr) {
    /****************************************************
    * Run binary search on array. Return index if found,
    * else return -1.
    ****************************************************/
	var low; 
    var high; 
    var mid; 
    var guessed;
    low = 0;
    high = arr.length - 1;

	while (low <= high) {
	    mid = Math.floor((low + high) / 2),
	    guessed = arr[mid];

	    if (guessed === item) {
            return mid;
	    }

	    if (item < guessed) {
	        high = mid - 1;
        } else {
	        low = mid + 1;
	    }
    }

	return -1;
}
