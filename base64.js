function text_to_binary(text) {
    /****************************************************
    * Convert text to binary
    ****************************************************/
    var binary_output;
    binary_output = [];
    var i;
    i = 0;
    while (i < text.length) {
        var bin;
        bin = text[i].charCodeAt().toString(2);
        binary_output.push(Array(8-bin.length+1).join("0") + bin);
        i++;
    } 
    return binary_output.join("");
}

function binary_to_text(binary) {
    /****************************************************
    * Convert binary to text
    ****************************************************/
    var text;
    text = [];
    var i;
    i = 0;
    while (i < binary.length) {
        var bin_group;
        bin_group = binary.substring(i, i+8);
        text.push(String.fromCharCode(parseInt(bin_group, 2)));
        i += 8;
    }
    return text.join("");
}

function binary_to_base64(binary) {
    /****************************************************
    * Convert binary to Base64
    ****************************************************/
    var base64_alphabet;
    base64_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var num_pad_chars;
    num_pad_chars = 0;

    // if needed, pad binary string so that its length is a multiple of 6
    var rem = binary.length % 24;
    if (rem == 8) {
        binary = binary + "0000";
        num_pad_chars = 2;
    } else if (rem == 16) { 
        binary = binary + "00";
        num_pad_chars = 1;
    }

    // convert each 6-bit group to the corresponding Base64 alphabet letter
    var i;
    i = 0;
    var base64;
    base64 = "";
    while (i < binary.length) {
        var bin_group;
        bin_group = binary.substring(i, i+6);
        var num;
        num = parseInt(bin_group, 2);
        base64 = base64 + base64_alphabet[num];
        i += 6;
    }

    // pad with ='s
    base64 = base64 + "=".repeat(num_pad_chars);

    return base64;
}

function base64_to_binary(base64) {
    /****************************************************
    * Convert Base64 to binary
    ****************************************************/
    var base64_alphabet;
    base64_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64_map;
    base64_map = {};
    var i;
    i = 0;
    while (i < base64_alphabet.length) {
        base64_map[base64_alphabet[i]] = i;
        i++;
    }

    // get number of ='s and remove them from base64 string
    var num_pad_chars;
    if (base64.substring(base64.length-2) == "==") {
        num_pad_chars = 2;
        base64 = base64.substring(0, base64.length-2);
    } else if (base64.substring(base64.length-1) == "=") {
        num_pad_chars = 1;
        base64 = base64.substring(0, base64.length-1);
    } else {
        num_pad_chars = 0;
    }

    // convert to binary_output
    var binary_output;
    binary_output = "";
    i = 0;
    while (i < base64.length) {
        var num;
        num = base64_map[base64[i]];
        var bin;
        bin = (num).toString(2);
        // if needed, pad start of bin with 0's so that bin is 6 bits long
        bin = "0".repeat(6-bin.length) + bin;
        binary_output = binary_output + bin;
        i++;
    }

    // remove num_pad_chars*2 from end of binary_output string
    binary_output = binary_output.substring(0, binary_output.length - num_pad_chars*2);

    return binary_output;
}

function base64_encode(text) {
    /****************************************************
    * Convert text to Base64
    ****************************************************/
    var binary;
    binary = text_to_binary(text);
    var base64;
    base64 = binary_to_base64(binary);
    return base64;
}

function base64_decode(base64) {
    /****************************************************
    * Convert Base64 to text
    ****************************************************/
    var binary;
    binary = base64_to_binary(base64);
    var text;
    text = binary_to_text(binary);
    return text;
}

function test() {
    var text;
    text = "!a";
    var encoded;
    encoded = base64_encode(text);
    var decoded = base64_decode(encoded);
    console.log("Original text: " + text);
    console.log("Encoded to Base64: " + encoded);
    console.log("Decoded Base64 text: " + decoded);
}

test();

/****************************************************
* Sources:
* - https://stackoverflow.com/questions/14430633/how-to-convert-text-to-binary-code-in-javascript
* - https://stackoverflow.com/questions/11103487/how-to-convert-binary-representation-of-number-from-string-to-integer-number-in
* - https://www.base64encoder.io/learn/
****************************************************/
