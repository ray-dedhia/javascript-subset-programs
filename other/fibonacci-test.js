var { gen_fibonacci, sum_even_fibonacci, sum_odd_fibonacci, sum_fibonacci } = require("./fibonacci.js");

function test() {
    console.log(gen_fibonacci(200));
    console.log(sum_even_fibonacci(200));
    console.log(sum_odd_fibonacci(200));
    console.log(sum_fibonacci(200));
}

test();
