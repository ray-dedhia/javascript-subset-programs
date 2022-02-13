var { check } = require("../check.js");
var { text_to_braille, braille_to_text } = require("./braille-conversion.js");

function braille_test() {
    var test_text1;
    test_text1 = "hello";
    var test_braille1;
    test_braille1 = "⠓⠑⠇⠇⠕";

    var test_text2;
    test_text2 = "world";
    var test_braille2;
    test_braille2 = "⠺⠕⠗⠇⠙";

    var braille_out1;
    braille_out1 = text_to_braille(test_text1);
    check(braille_out1, test_braille1, "Text to braille, test 1/2");
    console.log(braille_out1);
    console.log(test_braille1);

    var braille_out2;
    braille_out2 = text_to_braille(test_text2);
    check(braille_out2, test_braille2, "Text to braille, test 2/2");
    console.log(braille_out2);
    console.log(test_braille2);

    var text_out1;
    text_out1 = braille_to_text(test_braille1);
    check(text_out1, test_text1, "Braille to text, test 1/2");
    console.log(text_out1);
    console.log(test_text1);

    var text_out2;
    text_out2 = braille_to_text(test_braille2);
    check(text_out2, test_text2, "Braille to text, test 2/2");
    console.log(text_out2);
    console.log(test_text2);
}

braille_test();
