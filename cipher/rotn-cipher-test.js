var rotn_cipher;
rotn_cipher = require("./rotn-cipher.js");
var { check } = require("../check.js");

function rotn_cipher_test() {
    var test_string;
    test_string = "Hello, world!";
    var n;
    n = 17;
    var test_rot = "YvCCFnmNFICup";

    var rot_string; 
    rot_string = rotn_cipher(test_string, n);
    check(rot_string, test_rot, "Rot-N encryption");

    var derot_string; 
    derot_string = rotn_cipher(rot_string, -n);
    check(derot_string, test_string, "Rot-N decryption");
}

rotn_cipher_test();
