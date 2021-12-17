function parse(unicode) {
    /****************************************************
    * Convert unicode hexadecimal value to unicode
    ****************************************************/
    return JSON.parse('\"\\u' + unicode + '\"');
}

function gen_unicode_maps() {
    /****************************************************
    * Return [object mapping unicode braille to ascii glyphs,
    * object mapping ascii glyphs to unicode braille] 
    *
    * Uses https://en.wikipedia.org/wiki/Braille_ASCII
    ****************************************************/
    // Map braille unicode to ascii glyphs and vice versa
    var unicode_to_glyph;
    unicode_to_glyph = {};
    var glyph_to_unicode;
    glyph_to_unicode = {};

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
        b = parse(unicode_hex_letters[i]);
        unicode_to_glyph[b] = letters[i];
        glyph_to_unicode[letters[i]] = b;
        i = i + 1;
    }

    // Add numbers (0-9) to maps
    var nums;
    nums = "1234567890"; // map to abcdefghij
    i = 0;
    while (i < nums.length) {
        var b;
        b = parse(unicode_hex_letters[i]);
        unicode_to_glyph[b] = nums[i];
        glyph_to_unicode[nums[i]] = b;
        i = i + 1;
    }

    // Symbols
    var unicode_hex_syms;
    unicode_hex_syms = ['2800', '282e', '283c', '282b', '2829', '282f', '2804', '2837', '283e', '2821', '282c', '2820', '2824', '2828', '280c', '2834', '2802', '2806', '2812', '2832', '2822', '2816', '2836', '2826', '2814', '2831', '2830', '2823', '283f', '281c', '2839', '282a', '2833', '283b', '2818'];

    // Add symbols to maps
    var syms;
    syms = " !#$%&\'()*+,-./0123456789:;<=>?[\\]^";
    i = 0;
    while (i < syms.length) {
        var b;
        b = parse(unicode_hex_syms[i]);
        unicode_to_glyph[b] = syms[i];
        glyph_to_unicode[syms[i]] = b;
        i = i + 1;
    }

    return [unicode_to_glyph, glyph_to_unicode];
}

function gen_glyph_maps() {
    /****************************************************
    * Return [object mapping punctuation to ascii glyphs,
    * object mapping ascii glyphs to punctuation, object mapping
    * numbers to ascii glyphs, object mapping ascii glyphs to numbers] 
    *
    * Uses https://en.wikipedia.org/wiki/Braille_ASCII
    ****************************************************/
    // punctuation
    var punc_to_glyph;
    punc_to_glyph = {};
    var glyph_to_punc;
    glyph_to_punc = {};
    // note: ( and ) map to same glyph
    var punc;
    punc = "\'-\",;:.!)(?$";
    var punc_glyphs;
    punc_glyphs = "\'-012346778^";
    var i;
    i = 0;
    while (i < punc.length) {
        punc_to_glyph[punc[i]] = punc_glyphs[i];
        glyph_to_punc[punc_glyphs[i]] = punc[i];
        i = i + 1;
    }

    // numbers
    var num_to_glyph;
    num_to_glyph = {};
    var glyph_to_num;
    glyph_to_num = {};
    var num_glyphs;
    num_glyphs = "jabcdefghi";
    i = 0;
    while (i < num_glyphs.length) {
        num_to_glyph[i] = num_glyphs[i];
        glyph_to_num[num_glyphs[i]] = i;
        i = i + 1;
    }

    return [punc_to_glyph, glyph_to_punc, num_to_glyph, glyph_to_num];
}

function get_char_type(c) {
    /****************************************************
    * lowercase letter = 0, uppercase letter = 1, number = 2, other = 0
    ****************************************************/
    if ((/[a-z]/).test(c)) {
        return 0;
    } else if ((/[A-Z]/).test(c)) {
        return 1;
    } else if ((/[0-9]/).test(c)) {
        return 2;
    } else {
        return 0;
    }
}

function text_to_glyphs(text) {
    /****************************************************
    * Convert text to ascii glyphs
    ****************************************************/
    // 0 = lowercase letter, 1 = uppercase letter, 2 = number
    var ind_glyphs;
    ind_glyphs = [';', ',', '#'];
    var prev_char_type;
    prev_char_type = 0;

    // maps
    var glyph_maps;
    glyph_maps = gen_glyph_maps();
    var punc_to_glyph;
    punc_to_glyph = glyph_maps[0];
    num_to_glyph = glyph_maps[2];

    // regex
    var punc_regex;
    punc_regex = (/'|-|"|,|;|:|.|!|\(|\)|\?|$/);
    var alpha_regex;
    alpha_regex = (/[a-zA-Z]/);
    var num_regex;
    num_regex = (/[0-9]/);

    // iterate over words in text
    var words;
    words = text.split(" ");
    var glyphs;
    glyphs = "";
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
            var p;
            p = word_parts[j];

            // if length of word part is > 1, it is a contraction
            if (p.length > 1) {
                // TODO: parse contractions
            } else { // else it is a letter / number / punctuation mark
                var char_type;
                char_type = get_char_type(p);

                // add indicator if first letter is upper case or if
                // going from letter to number / number to letter
                if ((j == 0) && (char_type == 1)) { 
                    glyphs = glyphs + ind_glyphs[char_type];
                } else if ( (char_type < 2) ^ (prev_char_type < 2) ) {
                    glyphs = glyphs + ind_glyphs[char_type];
                }

                if (alpha_regex.test(p)) {
                    glyphs = glyphs + p.toLowerCase();
                } else if (num_regex.test(p)) {
                    glyphs = glyphs + num_to_glyph[p];
                } else if (punc_regex.test(p)) {
                    glyphs = glyphs + punc_to_glyph[p];
                } else {
                    console.log("Error: invalid character " + c + ": no mapping found.");
                }
            }

            j = j + 1;
        }
        
        // add space after word
        glyphs = glyphs + " ";
        // reset previous char type at end of word
        prev_char_type = 0;
        i = i + 1;
    }

    return glyphs;
}

// TODO: Create glyphs_to_text function

function glyphs_to_braille(glyphs) {
    /****************************************************
    * Convert ascii glyphs to braille unicode
    ****************************************************/
    // get map
    var unicode_maps;
    unicode_maps = gen_unicode_maps();
    var glyph_to_unicode;
    glyph_to_unicode = unicode_maps[1];

    // convert glyphs to braille
    var braille;
    braille = "";
    var i;
    i = 0;
    while (i < glyphs.length) {
        braille = braille + glyph_to_unicode[glyphs[i]];
        i = i + 1;
    }

    return braille;
}

// TODO: Create braille_to_glyphs function

function text_to_braille(text) {
    var glyphs;
    glyphs = text_to_glyphs(text);
    var braille;
    braille = glyphs_to_braille(glyphs);
    return braille;
}

// TODO: Create braille to text function

function test() {
    var text;
    text = "This is a test.";
    console.log(text);
    console.log(text_to_braille(text));
}

test();
