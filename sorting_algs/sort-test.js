var check;
check = require("../check.js");
var { bubble_sort, insertion_sort, selection_sort, merge, merge_sort, quick_sort } = require("./sort.js");

function sort_test() {
    var test_unsorted;
    test_unsorted = [14, 72, 0, 46, 65, 6, 34];
    var test_sorted;
    test_sorted = [0, 6, 14, 34, 46, 65, 72];

    var bubble_sorted_list;
    bubble_sorted_list = bubble_sort(test_unsorted);
    console.log(bubble_sorted_list);
    check(bubble_sorted_list, test_sorted, "Bubble sort");

    var insertion_sorted_list;
    insertion_sorted_list = insertion_sort(test_unsorted);
    console.log(insertion_sorted_list);
    check(insertion_sorted_list, test_sorted, "Insertion sort");

    var selection_sorted_list;
    selection_sorted_list = selection_sort(test_unsorted);
    console.log(selection_sorted_list);
    check(selection_sorted_list, test_sorted, "Selection sort");

    var merge_sorted_list;
    merge_sorted_list = merge_sort(test_unsorted);
    console.log(merge_sorted_list);
    check(merge_sorted_list, test_sorted, "Merge sort");

    var quick_sorted_list;
    quick_sorted_list = quick_sort(test_unsorted);
    console.log(quick_sorted_list);
    check(quick_sorted_list, test_sorted, "Quick sort");
}

sort_test();
