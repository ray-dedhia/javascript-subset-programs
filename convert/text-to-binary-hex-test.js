var { check } = require("../check.js");
var { text_to_binary, text_to_hex } = require("./text-to-binary-hex.js");

function test() {
    var test_text;
    test_text = "hello";
    var test_binary;
    test_binary = "01101000 01100101 01101100 01101100 01101111";
    var test_hex;
    test_hex = "68656c6c 0000006f";
    console.log("Test string:", test_text);

    var output_binary;
    output_binary = text_to_binary(test_text).join(" ");
    check(output_binary, test_binary, "Text to binary");
    console.log("Output binary:", output_binary);

    var output_hex;
    output_hex = text_to_hex(test_text).join(" ");
    check(output_hex, test_hex, "Text to hex");
    console.log("Output hex:", output_hex);
}

test();
