var keyword_cipher;
keyword_cipher = require("./keyword-cipher.js");
var { check } = require("../check.js");

function keyword_cipher_test() {
    var test_string;
    test_string = "Hello, world!";
    var keyword;
    keyword = "pinecone";
    var test_cipher_string;
    test_cipher_string = "WmypqkiADzyha";

    var key_cipher_string; 
    key_cipher_string = keyword_cipher(test_string, keyword);
    check(key_cipher_string, test_cipher_string, "Keyword cipher encryption");

    var dekey_cipher_string; 
    dekey_cipher_string = keyword_cipher(key_cipher_string, keyword, true);
    check(dekey_cipher_string, test_string, "Keyword cipher decryption");
}

keyword_cipher_test();
