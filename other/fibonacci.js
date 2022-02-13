var gen_fibonacci;
gen_fibonacci = function(max) {
    /****************************************************
    * Return all Fibonacci numbers less than or equal to max
    ****************************************************/
    var fib_list;
    fib_list = [1, 1];
    var prev;
    prev = 1;
    var current;
    current = 1;
    while (current <= max) {
        var next;
        next = prev + current;
        fib_list.push(next);
        prev = current;
        current = next;
    }
    return fib_list;
}

var sum_even_fibonacci;
sum_even_fibonacci = function(max) {
    /****************************************************
    * Return sum of all even Fibonacci numbers less than max
    ****************************************************/
    var fib_list;
    fib_list = gen_fibonacci(max);
    var sum;
    sum = 0;
    var i;
    i = 0;
    while (i < fib_list.length) {
        if ((fib_list[i] % 2) == 0) {
            sum = sum + fib_list[i];
        }
        i = i + 1;
    }
    return sum;
}

var sum_odd_fibonacci;
sum_odd_fibonacci = function(max) {
    /****************************************************
    * Return sum of all odd Fibonacci numbers less than max
    ****************************************************/
    var fib_list;
    fib_list = gen_fibonacci(max);
    var sum;
    sum = 0;
    var i;
    i = 0;
    while (i < fib_list.length) {
        if ((fib_list[i] % 2) != 0) {
            sum = sum + fib_list[i];
        }
        i = i + 1;
    }
    return sum;
}

function add(accum, a) {
    return accum + a;
}

var sum_fibonacci;
sum_fibonacci = function(max) {
    /****************************************************
    * Return sum of all Fibonacci numbers less than max
    ****************************************************/
    var fib_list;
    fib_list = gen_fibonacci(max);
    var sum;
    sum = fib_list.reduce(add, 0);
    return sum;
}

module.exports = { gen_fibonacci, sum_even_fibonacci, sum_odd_fibonacci, sum_fibonacci };
