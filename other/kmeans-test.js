var { kmeans } = require("./kmeans.js");

function test() {
    var data;
    data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5], [-1, -1, -1.5]];
    console.log("Data = " + JSON.stringify(data));

    var k;
    k = 2;
    console.log("K = " + k);

    var result
    result = kmeans(data, 2);
    console.log("Results = " + JSON.stringify(result));
}

test();
