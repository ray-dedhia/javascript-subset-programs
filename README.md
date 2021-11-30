# Overview

This project uses a subset of the JavaScript language that is described below. 

The goal of project is to use this subset to prove important properties about the programs written in this subset. We have a formal model and semantics describing this subset, as well as key properties of the transformations applied on these programs.

## Subset
| #  | Language Constructs       | Examples                                              |
|----|---------------------------|-------------------------------------------------------|
| 1  | Identifiers               | myVal, result, y4                                     |
| 2  | Variable declaration      | var x                                                 |
| 3  | Values                    | 10, "apples", null                                    |
| 4  | Assignment                | val = 20                                              |
| 5  | New operator              | new Number(15)                                        |
| 6  | Arithmetic operation      | 144 / 6                                               |
| 7  | Logical operators         | x == y, b !== a                                       |
| 8  | Function                  | function myFunc(x) => {...}                           |
| 9  | Function calls            | myFunc(arg)                                           |
| 10 | Return statement          | // only allowed as last expression inside a function  |
| 11 | User defined objects      | x = {a: 3, b: (x) => {return x + 3}, c: "apples"}     |
| 12 | Object setter operation   | x.a = 10                                              |
| 13 | Object getter operation   | x.a                                                   |
| 14 | Object delete operation   | delete x.a                                            |
| 15 | if statement              | if (condition) { expression }                         |
| 16 | if else statement         | if (condition) { expression } else { expression }     |
| 17 | while loop                | while (condition) { expression }                      |
| 18 | require (import module)   | require("path/file_name.js")                          |
| 19 | export module             | module.exports = {field1:value1, ..., fieldN:valueN}  |
| 20 | console.log (print)       | console.log("string to print")                        |
