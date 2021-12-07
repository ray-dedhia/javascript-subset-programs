function sequential_search(item, arr) {
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
        i++;
    }
    // item not found
    return -1;
}

function find_min_value(arr) {
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
        i++;
    }
    return current_min;
}

function find_max_value(arr) {
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
        i++;
    }
    return current_max;
}

function binary_search(item, arr) {
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

function test() {
    var arr; 
    var item; 
    var index; 
    var val;

    console.log("Sequential search");
    arr = [2, 5, 3, 7, 8, 10, 15, 18, 24, 111, 12, 19, 87];
    item = 15;
    index = sequential_search(item, arr);
    console.log("Array = [" + arr + "]");
    console.log("Found item " + item + " at index " + index);

    console.log("\nFind min value");
    val = find_min_value(arr);
    console.log("Array = [" + arr + "]");
    console.log("Minimum value is " + val);

    console.log("\nFind max value");
    val = find_max_value(arr);
    console.log("Array = [" + arr + "]");
    console.log("Maximum value is " + val);

    console.log("\nBinary search");
    arr = [1, 3, 5, 7, 9];
    item = 3;
    index = binary_search(item, arr);
    console.log("Array = [" + arr + "]");
    console.log("Found item " + item + " at index " + index);
}

test();

/****************************************************
* Sources:
* - https://www.scriptonitejs.com/javascript-searching-algorithms/
****************************************************/
