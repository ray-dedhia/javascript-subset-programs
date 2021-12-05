function rotn_cipher(raw_string, n) {
    /****************************************************
    * Apply rot n cipher to raw_string. 
    * To decrypt, negate n.
    ****************************************************/

    // create mapping from letters to numbers
    letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.!?";
    letter_map = {};
    var i;
    for (i = 0; i < letters.length; i++) {
        letter_map[letters[i]] = i;
    }

    // encrypt/decrypt the string
    var cipher_string, j, raw_letter, ind;
    cipher_string = ""; 

    if (n < 0) {
        n = n + letters.length;
    }

    for (j = 0; j < raw_string.length; j++) {
        raw_letter = raw_string[j];
        if (letters.includes(raw_letter)) {
            ind = (letter_map[raw_letter] + n) % letters.length;
            cipher_string = cipher_string + letters[ind];
        } else {
            cipher_string = cipher_string + raw_letter;
        }
    }

    return cipher_string;
}

function keyword_cipher(raw_string, keyword, decrypt=false) {
    /****************************************************
    * Apply keyword cipher to raw_string. 
    * To decrypt, set decrypt to true.
    ****************************************************/

    // create mapping from letters to numbers
    letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.!?";
    letter_map = {};
    var i;
    for (i = 0; i < letters.length; i++) {
        letter_map[letters[i]] = i;
    }

    // encrypt/decrypt the string
    var cipher_string, j, raw_letter, key_delta, ind;
    cipher_string = "";
    for (j = 0; j < raw_string.length; j++) {
        raw_letter = raw_string[j];
        if (letters.includes(raw_letter)) {
            key_delta = letter_map[keyword[j % keyword.length]];
            if (decrypt) {
                key_delta = -key_delta + letters.length;                    
            }
            ind = (letter_map[raw_letter] + key_delta) % letters.length;
            cipher_string = cipher_string + letters[ind];
        } else {
            cipher_string = cipher_string + raw_letter;
        }
    }

    return cipher_string;
}

function test() {
    console.log("Testing rot N cipher...");
    var test_string, rot_string, derot_string, n;
    test_string = "Hello, world!";
    n = 17;
    rot_string = rotn_cipher(test_string, n);
    derot_string = rotn_cipher(rot_string, -n);
    console.log("Test string = " + test_string);
    console.log("Encrypted string = " + rot_string);
    console.log("Decrypted string = " + derot_string);

    console.log("\nTesting keyword cipher...");
    var key_cipher_string, dekey_cipher_string, keyword;
    keyword = "pinecone";
    key_cipher_string = keyword_cipher(test_string, keyword);
    dekey_cipher_string = keyword_cipher(key_cipher_string, keyword, true);
    console.log("Test string = " + test_string);
    console.log("Encrypted string = " + key_cipher_string);
    console.log("Decrypted string = " + dekey_cipher_string);
}

test();
