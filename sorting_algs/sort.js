var merge;
merge = function (left, right) {
    /****************************************************
    * Helper function called by merge_sort.
    * Merges two arrays.
    ****************************************************/
    var result; 
    result = [];
    var left_index; 
    left_index = 0;
    var right_index;
    right_index = 0;

    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            result.push(left[left_index]);
            left_index = left_index + 1;
        } else {
            result.push(right[right_index]);
            right_index = right_index + 1;
        }
   }
   return result.concat(left.slice(left_index)).concat(right.slice(right_index));
}

var merge_sort;
merge_sort = function (arr) {
    /****************************************************
    * Sort an array using merge sort
    ****************************************************/
    if (arr.length === 1) { // return when array has a single item
        return arr;
    }

    var middle; 
    middle = Math.floor(arr.length / 2); // middle item
    var left; 
    left = arr.slice(0, middle); // left-side items
    var right;
    right = arr.slice(middle); // right-side items

    return merge(merge_sort(left), merge_sort(right));
}

var bubble_sort;
bubble_sort = function(arr) {
    /****************************************************
    * Sort an array using bubble sort
    ****************************************************/
    var i; 
    var j; 
    i = 0;
    while (i < arr.length) {
        j = 0;
        while (j < arr.length - i - 1) {
            // if current value greater than next value
            if (arr[j + 1] < arr[j]) {
                // swap current and next values
                var temp;
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
            j = j + 1;
        }
        i = i + 1;
    }
    return arr;
}

var insertion_sort;
insertion_sort = function(arr) {
    /****************************************************
    * Sort an array using insertion sort
    ****************************************************/
    // start from the second element
    var i; 
    var j;
    i = 1;
    while (i < arr.length) {
        // go through the elements behind it
        j = i - 1;
        while (j > -1) {
            // value comparison using ascending order.
            if (arr[j + 1] < arr[j]) {
                // swap
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];
            }
            j = j - 1;
        }
        i = i + 1;
    }
  return arr;
}

var selection_sort;
selection_sort = function(arr) {
    /****************************************************
    * Sort an array using selection sort
    ****************************************************/
    // start passes
    var min; 
    var i; 
    var j;
    i = 0;
    while (i < arr.length) {
        // index of the smallest element to be the i-th element.
        min = i;

        // check through the rest of the array for a lesser element
        j = i + 1;
        while (j < arr.length) {
            if (arr[j] < arr[min]) {
                min = j;
            }
            j = j + 1;
        }

        // compare the indexes
        if (min !== i) {
          // swap
          [arr[i], arr[min]] = [arr[min], arr[i]];
        }
        i = i + 1;
    }
    return arr;
}

var quick_sort;
quick_sort = function(arr) {
    if (arr.length <= 1) {
       return arr;
    } 

    var left_arr; 
    left_arr = [];
    var right_arr; 
    right_arr = [];
    var new_arr; 
    new_arr = [];
    var pivot; 
    pivot = arr.pop(); 
    var length; 
    length = arr.length;

    var i;
    i = 0;
    while (i < length) {
        // using pivot value start comparing
        if (arr[i] <= pivot) {
            left_arr.push(arr[i]);
        } else {
            right_arr.push(arr[i]);
        }
        i = i + 1;
    }

    return new_arr.concat(quick_sort(left_arr), pivot, quick_sort(right_arr)); 
}

module.exports = {
    merge,
    merge_sort,
    bubble_sort,
    insertion_sort,
    selection_sort,
    quick_sort
};
