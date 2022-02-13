function char_to_byte(c, binary=true) {
    /****************************************************
     * Convert a character to its character code. If 
     * binary=true, convert to binary, else convert to
     * hexadecimal.
    ****************************************************/
    var base;
    if (binary) {
        base = 2;
    } else {
        base = 16;
    }

    var char_code;
    char_code = c.charCodeAt(0);
    var bits;
    bits = (char_code).toString(base);
    if (base==2 && bits.length<8) {
        bits = "0".repeat(8-bits.length).concat(bits);
    }

    return bits;
}

function byte_to_char(bits, binary=true) {
    /****************************************************
     * Convert a byte to an ASCII char. If binary=true,
     * byte is in binary, else is in hexadecimal.
    ****************************************************/
    var base;
    if (binary) {
        base = 2;
    } else {
        base = 16;
    }

    var char_code;
    char_code = parseInt(bits, base);
    var c;
    c = String.fromCharCode(char_code);
    return c;
}

var text_to_binary;
text_to_binary = function(text) {
    /****************************************************
     * Convert ASCII text to an array of binary 
     * strings (8 bits per char).
    ****************************************************/
    var bin_arr;
    bin_arr = [];
    var i;
    i = 0;
    while (i < text.length) {
        bin_arr.push(char_to_byte(text[i]));
        i = i + 1;
    }
    return bin_arr;
}

var text_to_hex;
text_to_hex = function(text) {
    /****************************************************
     * Convert ASCII text to an array of hex words, where
     * each word is 4 bytes (8 hex digits).
    ****************************************************/
    var hex_arr;
    hex_arr = [];
    var i;
    i = 0;
    var word;
    word = "";
    while (i < text.length) {
        // store as 4-byte words
        // false => use hex
        word = word.concat((char_to_byte(text[i], false)).toString());
        if (((i+1) % 4) == 0) {
            hex_arr.push(word);
            word = "";
        }
        i = i + 1;
    }
    if (word !== "") {
        word = "0".repeat(8-word.length).concat(word);
        hex_arr.push(word);
    }
    return hex_arr;
}

function pretty_print(arr, binary=true) {
    /****************************************************
     * If binary=true, print binary in rows of 4 space-separated bytes,
     * else print hex in rows of 4 space-separated 4-byte words
    ****************************************************/
    var pre;
    if (binary) {
        pre = "0b";
    } else {
        pre = "0x";
    }
    var bit_str;
    bit_str = "";
    var i;
    i = 0;
    while (i < arr.length) {
        bit_str = bit_str.concat(pre, arr[i], " ");
        if (((i+1) % 4) == 0) {
            bit_str = bit_str.concat("\n");
        }
        i = i + 1;
    }
    console.log(bit_str.substring(0,bit_str.length-1)); // ignore last space
}

module.exports = { text_to_binary, text_to_hex };
