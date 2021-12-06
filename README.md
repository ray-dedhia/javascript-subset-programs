# Overview

This project uses a subset of the JavaScript language that is described below. 

The goal of project is to use this subset to prove important properties about the programs written in this subset. We have a formal model and semantics describing this subset, as well as key properties of the transformations applied on these programs.


## Subset
1. Identifiers (e.g. `myVal`, `result`, `y4`)
2. Variable declaration (e.g. `var x`) 
    - `const`, `let` and `with` not supported
    - Can't perform variable declaration and assignment at the same time
3. Values (e.g. `10`, `"apples"`, `null`)
4. Assignment (e.g. `val = 20`)
5. New operator (e.g. `new Number(15)`)
6. Arithmetic operation (e.g. `144 / 6`)
7. Logical operators (e.g. `x == y`, `b !== a`)
8. Function (e.g. `function myFunc(x) {...}`)
9. Function calls (e.g. `myFunc(arg)`)
10. Return statement (e.g. `function myFunc(x) { return x; }`)
    - Only allowed as last expression inside a function
11. User defined objects (e.g. `x = {a: 3, b: function myFunc(x) {return x + 3}, c: "apples"}`) 
12. Object setter operation (e.g. `x.a = 10`)
13. Object getter operation (e.g. `x.a`)
14. Object delete operation (e.g. `delete x.a`)
15. if statement (e.g. `if (condition) { expression }`)
16. if else statement (e.g. `if (condition) { expression } else { expression }`)
17. while loop (e.g. `while (condition) { expression }`)
18. require (import module) (e.g. `require("path/file_name.js")`)
    - Can't use `import`
19. export module (`module.exports = {field1:value1, ..., fieldN:valueN}`)
20. console.log (e.g. `console.log("string to print")`)


## Additional Notes
- Not allowed
    - New features in ES6 and later JavaScript versions
    - `class`, `constructor`, `this`
- Allowed objects
    - `Math` and `String`


## Programs
- Pseudo-Random Number Generators (prng.js)
    - Middle square method and linear congruent generator algorithm
- Cipher (Encryption & Decryption) (cipher.js)
    - ROT-N cipher and keyword cipher
- Generate WAV File (gen_wav.js)
    - Generate WAV file from list of notes 
    - Notes format: [[scientific pitch notation, length in seconds], ...]
- Sorting Algorithms (sort.js)
    - Algorithms: bubble sort, insertion sort, selection sort, merge sort, and quick sort
- Search Algorithms (search.js)
    - Algorithms: sequential search, binary search, find min/max value
