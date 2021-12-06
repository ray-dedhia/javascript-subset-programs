function bubble_sort(arr) {
    /****************************************************
    * Sort an array using bubble sort
    ****************************************************/
    // outer pass
    var i, j; 
    for (i = 0; i < arr.length; i++){
        // inner pass
        for (j = 0; j < arr.length - i - 1; j++){
            // value comparison using ascending order
            if (arr[j + 1] < arr[j]){
                // swapping
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
}

function insertion_sort(arr) {
    /****************************************************
    * Sort an array using insertion sort
    ****************************************************/
    // start from the second element
    var i, j;
    for (i = 1; i < arr.length;i++) {
        // go through the elements behind it
        for (j = i - 1; j > -1; j--) {
            // value comparison using ascending order.
            if (arr[j + 1] < arr[j]) {
                // swap
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];
            }
        }
    }
  return arr;
}

function selection_sort(arr) {
    /****************************************************
    * Sort an array using selection sort
    ****************************************************/
    // start passes
    var min, i, j;
    for (i = 0; i < arr.length; i++) {
        // index of the smallest element to be the i-th element.
        min = i;

        // check through the rest of the array for a lesser element
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // compare the indexes
        if (min !== i) {
          // swap
          [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}

function merge(left, right) {
    /****************************************************
    * Helper function called by merge_sort.
    * Merges two arrays.
    ****************************************************/
    var result, left_index, right_index;
    result = [];
    left_index = 0;
    right_index = 0;

    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            result.push(left[left_index]);
            left_index++;
        } else {
            result.push(right[right_index]);
            right_index++;
        }
   }
   return result.concat(left.slice(left_index)).concat(right.slice(right_index));
}

function merge_sort(arr) {
    /****************************************************
    * Sort an array using merge sort
    ****************************************************/
    if (arr.length === 1) { // return when array has a single item
        return arr;
    }

    var middle, left, right;
    middle = Math.floor(arr.length / 2); // middle item
    left = arr.slice(0, middle); // left-side items
    right = arr.slice(middle); // right-side items

    return merge(merge_sort(left), merge_sort(right));
}

function quick_sort(arr) {
    if (arr.length <= 1) {
       return arr;
    } 

    var left_arr, right_arr, new_arr, pivot, length, i;
    left_arr = [];
    right_arr = [];
    new_arr = [];
    pivot = arr.pop(); 
    length = arr.length;

    for (i = 0; i < length; i++) {
        // using pivot value start comparing
        if (arr[i] <= pivot) {
            left_arr.push(arr[i]);
        } else {
            right_arr.push(arr[i]);
        }
    }

    return new_arr.concat(quick_sort(left_arr), pivot, quick_sort(right_arr)); 
}

function test() {
    var unsorted, sorted;

    console.log("Bubble sort");
    unsorted = [4, 10, 16, 36, 7, 0];
    console.log("Unsorted = [" + unsorted + "]");
    sorted = bubble_sort(unsorted);
    console.log("Sorted = [" + sorted + "]");

    console.log("\nInsertion sort");
    unsorted = [23, 17, 1, 10, 5, 2];
    console.log("Unsorted = [" + unsorted + "]");
    sorted = insertion_sort(unsorted);
    console.log("Sorted = [" + sorted + "]");

    console.log("\nSelection sort");
    unsorted = [29, 72, 98, 13, 87, 66, 52, 51, 36];
    console.log("Unsorted = [" + unsorted + "]");
    sorted = selection_sort(unsorted);
    console.log("Sorted = [" + sorted + "]");

    console.log("\nMerge sort");
    unsorted = [70, 50, 30, 10, 20, 40, 60];
    console.log("Unsorted = [" + unsorted + "]");
    sorted = merge_sort(unsorted);
    console.log("Sorted = [" + sorted + "]");

    console.log("\nQuick sort");
    unsorted = [5, 3, 7, 6, 2, 9];
    console.log("Unsorted = [" + unsorted + "]");
    sorted = quick_sort(unsorted);
    console.log("Sorted = [" + sorted + "]");
}

test();

/****************************************************
* Sources:
* - https://www.section.io/engineering-education/sorting-algorithms-in-js/
* - https://www.tutorialspoint.com/how-to-implement-merge-sort-in-javascript
* - https://www.tutorialspoint.com/how-to-implement-quick-sort-in-javascript
****************************************************/
