var { base64_encode, base64_decode } = require("./base64-enc-dec.js");
var { check } = require("../check.js");

function test() {
    var test_text;
    test_text = "!a";
    var test_encoded = "IWE=";

    var encoded;
    encoded = base64_encode(test_text);
    check(encoded, test_encoded, "Text to base64");

    var decoded;
    decoded = base64_decode(test_encoded);
    check(decoded, test_text, "Base64 to test");
}

test();
