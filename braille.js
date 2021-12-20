function parse_unicode(unicode) {
    /****************************************************
    * Convert unicode hexadecimal value to unicode
    ****************************************************/
    return JSON.parse('\"\\u' + unicode + '\"');
}

function gen_maps() {
    /****************************************************
    * Return [object mapping braille to letters,
    * object mapping letters to braille]
    *
    * Uses https://en.wikipedia.org/wiki/Braille_ASCII
    ****************************************************/
    var braille_to_letter;
    braille_to_letter = {};
    var letter_to_braille;
    letter_to_braille = {};

    // Alphabet
    // a-j
    var unicode_hex_letters;
    unicode_hex_letters = ['2801', '2803', '2809', '2819', '2811', '280b', '281b', '2813', '280a', '281a'];

    // k-t
    var i;
    i = 0;
    while (i < 10) {
        unicode_hex_letters.push((parseInt(unicode_hex_letters[i], 16) + 4).toString(16));
        i = i + 1;
    }

    // u,v+w,x,y,z
    i = 0;
    while (i < 5) {
        unicode_hex_letters.push((parseInt(unicode_hex_letters[i], 16) + 36).toString(16));
        if (i == 1) {
            unicode_hex_letters.push('283a');
        }
        i = i + 1;
    }

    // Add alphabet (a-z) to maps
    var letters;
    letters = "abcdefghijklmnopqrstuvwxyz"
    i = 0;
    while (i < letters.length) {
        var b;
        b = parse_unicode(unicode_hex_letters[i]);
        braille_to_letter[b] = letters[i];
        letter_to_braille[letters[i]] = b;
        i = i + 1;
    }

    // Add numbers (0-9) to letter_to_braille map ONLY
    var nums;
    nums = "1234567890"; // map to abcdefghij
    i = 0;
    while (i < nums.length) {
        var b;
        b = parse_unicode(unicode_hex_letters[i]);
        letter_to_braille[nums[i]] = b;
        i = i + 1;
    }

    // Punctuation
    var unicode_hex_punc;
    unicode_hex_punc = ['2800', '2804', '2824', '2834', '2802', '2806', '2812', '2832', '2816', '2836', '2836', '2826', '2818'];

    // Add punctuation to maps
    var punc;
    punc = " \'-\",;:.!)(?$";
    i = 0;
    while (i < punc.length) {
        var b;
        b = parse_unicode(unicode_hex_punc[i]);
        braille_to_letter[b] = punc[i];
        letter_to_braille[punc[i]] = b;
        i = i + 1;
    }

    // Contractions
    var unicode_hex_contracts = ['282e', '282b', '2829', '282f', '2837', '283e', '2821', '282c', '280c', '2822', '2814', '2831', '2823', '283f', '281c', '2839'];

    // Add contractions to maps
    var contracts;
    contracts = ['the', 'ed', 'sh', 'and', 'of', 'with', 'ch', 'ing', 'st', 'en', 'in', 'wh', 'gh', 'for', 'ar', 'th'];
    i = 0;
    while (i < contracts.length) {
        var b;
        b = parse_unicode(unicode_hex_contracts[i]);
        braille_to_letter[b] = contracts[i];
        letter_to_braille[contracts[i]] = b;
        i = i + 1;
    }

    // Indicators
    var unicode_hex_inds = ['283c', '2820', '2830'];

    // Add indicators to maps
    var inds;
    inds = ['#', 'UC', 'LC']; // number, uppercase, lowercase
    i = 0;
    while (i < inds.length) {
        var b;
        b = parse_unicode(unicode_hex_inds[i]);
        braille_to_letter[b] = inds[i];
        letter_to_braille[inds[i]] = b;
        i = i + 1;
    }

    return [braille_to_letter, letter_to_braille];
}

function get_char_type(c) {
    /****************************************************
    * lowercase = 'LC', uppercase = 'UC', number = '#', other = 'LC'
    ****************************************************/
    if ((/[A-Z]/).test(c)) {
        return 'UC';
    } 
    if ((/[0-9]/).test(c)) {
        return '#';
    } 
    return 'LC';
}

function text_to_braille(text) {
    /****************************************************
    * Convert text to braille 
    ****************************************************/
    // 'LC' = lowercase, 'UC' = uppercase, '#' = number
    var prev_char_type;
    prev_char_type = 'LC';

    // maps
    var maps;
    maps = gen_maps();
    var letter_to_braille;
    letter_to_braille = maps[1];

    // iterate over words in text
    var words;
    words = text.split(" ");
    var braille;
    braille = "";
    var i;
    i = 0;
    while (i < words.length) {
        // get word
        var word;
        word = words[i];
        // TODO: find contractions in each word and convert word to list
        // containing contractions + remaining letters
        var word_parts;
        word_parts = [];
        word_parts = word.split('');
         
        // parse word_parts
        var j;
        j = 0;
        while (j < word_parts.length) {
            var wp;
            wp = word_parts[j];

            var char_type;
            char_type = get_char_type(wp);

            // add indicator if first letter is upper case or if
            // going from letter to number / number to letter
            if ((j == 0) && (char_type == 'UC')) { 
                braille = braille + letter_to_braille[char_type];
            } else if ( (char_type == '#') ^ (prev_char_type == '#') ) {
                braille = braille + letter_to_braille[char_type];
            }
            
            // convert letter(s) to braille
            // letter_to_braille object keys only have lowercase letters
            if (char_type == 'UC') {
                wp = wp.toLowerCase();
            }
            if (wp in letter_to_braille) {
                braille = braille + letter_to_braille[wp];
            } else {
                console.log("Error: invalid character " + wp + ": no mapping found.");
            }

            j = j + 1;
        }
        
        // add space after word
        braille = braille + letter_to_braille[' '];
        // reset previous character type at end of word
        prev_char_type = 'LC';
        i = i + 1;
    }

    return braille;
}

function braille_to_text(braille) {
    /****************************************************
    * Convert braille to text
    ****************************************************/
    // maps
    var maps;
    maps = gen_maps();
    var braille_to_letter;
    braille_to_letter = maps[0];
    var letter_to_braille;
    letter_to_braille = maps[1];
    var letters_to_nums;
    letters_to_nums = {'a':1, 'b':2, 'c':3, 'd':4, 'e':5, 'f':6, 'g':7, 'h':8, 'i':9, 'j':0};

    // character types
    var char_types;
    char_types = new Set(['LC', 'UC', '#']);
    var current_char_type;
    current_char_type = 'LC';

    // iterate over braille words
    words = braille.split(letter_to_braille[' ']);
    var text;
    text = "";
    var i;
    i = 0;
    while (i < words.length) {
        // get word
        var word;
        word = words[i];
         
        // parse word
        var j;
        j = 0;
        while (j < word.length) {
            var b; // braille character
            b = word[j];

            var wp; // word part
            if (b in braille_to_letter) {
                wp = braille_to_letter[b];
                if (char_types.has(wp)) {
                    current_char_type = wp;
                } else {
                    if (current_char_type == '#') {
                        text = text + letters_to_nums[wp];
                    } else if (current_char_type == 'UC' ) {
                        text = text + wp.substring(0,1).toUpperCase() + wp.substring(1);
                        current_char_type = 'LC';
                    } else {
                        text = text + wp;
                    }
                }
            } else {
                console.log("Error: invalid braille symbol " + b + ": no mapping found.");
            }

            j = j + 1;
        }
        
        // add space after word
        text = text + " ";
        // reset character type at end of word
        current_char_type = 'LC';
        i = i + 1;
    }

    return text;
}

function test() {
    var text1;
    text1 = "This is a test.";
    var braille1;
    braille1 = text_to_braille(text1);
    console.log(text1);
    console.log(braille1);

    var text2;
    text2 = braille_to_text(braille1);
    console.log(text2);
}

test();
