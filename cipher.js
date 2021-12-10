function rotn_cipher(raw_string, n) {
    /****************************************************
    * Apply rot n cipher to raw_string. 
    * To decrypt, negate n.
    ****************************************************/

    // create mapping from letters to numbers
    var letters;
    letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.!?";
    var letter_map;
    letter_map = {};
    var i;
    i = 0;
    while (i < letters.length) {
        letter_map[letters[i]] = i;
        i = i + 1;
    }

    // encrypt/decrypt the string
    var cipher_string;
    cipher_string = ""; 

    if (n < 0) {
        n = n + letters.length;
    }

    var j;
    j = 0;
    while (j < raw_string.length) {
        var raw_letter;
        raw_letter = raw_string[j];
        if (letters.includes(raw_letter)) {
            var ind;
            ind = (letter_map[raw_letter] + n) % letters.length;
            cipher_string = cipher_string + letters[ind];
        } else {
            cipher_string = cipher_string + raw_letter;
        }
        j = j + 1;
    }

    return cipher_string;
}

function keyword_cipher(raw_string, keyword, decrypt=false) {
    /****************************************************
    * Apply keyword cipher to raw_string. 
    * To decrypt, set decrypt to true.
    ****************************************************/

    // create mapping from letters to numbers
    var letters;
    letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.!?";
    var letter_map;
    letter_map = {};
    var i;
    i = 0;
    while (i < letters.length) {
        letter_map[letters[i]] = i;
        i = i + 1;
    }

    // encrypt/decrypt the string
    var cipher_string;
    cipher_string = "";
    var j;
    j = 0;
    while (j < raw_string.length) {
        var raw_letter; 
        raw_letter = raw_string[j];
        if (letters.includes(raw_letter)) {
            var key_delta; 
            key_delta = letter_map[keyword[j % keyword.length]];
            if (decrypt) {
                key_delta = -key_delta + letters.length;                    
            }
            var ind;
            ind = (letter_map[raw_letter] + key_delta) % letters.length;
            cipher_string = cipher_string + letters[ind];
        } else {
            cipher_string = cipher_string + raw_letter;
        }
        j = j + 1;
    }

    return cipher_string;
}

function test() {
    console.log("Testing rot N cipher...");
    var test_string;
    var rot_string; 
    var derot_string; 
    var n;
    test_string = "Hello, world!";
    n = 17;
    rot_string = rotn_cipher(test_string, n);
    derot_string = rotn_cipher(rot_string, -n);
    console.log("Test string = " + test_string);
    console.log("Encrypted string = " + rot_string);
    console.log("Decrypted string = " + derot_string);

    console.log("\nTesting keyword cipher...");
    var key_cipher_string; 
    var dekey_cipher_string; 
    var keyword;
    keyword = "pinecone";
    key_cipher_string = keyword_cipher(test_string, keyword);
    dekey_cipher_string = keyword_cipher(key_cipher_string, keyword, true);
    console.log("Test string = " + test_string);
    console.log("Encrypted string = " + key_cipher_string);
    console.log("Decrypted string = " + dekey_cipher_string);
}

test();
