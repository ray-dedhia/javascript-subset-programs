module.exports = function (raw_string, keyword, decrypt=false) {
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
