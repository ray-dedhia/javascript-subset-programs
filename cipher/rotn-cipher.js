module.exports = function(raw_string, n) {
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
