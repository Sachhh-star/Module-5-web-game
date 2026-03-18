// game 
let StartGame;

// level
let level =1;
let score = 0;
let correctAnswersInLevel = 0;
const correctAnswersToLevelUp = 5;

let currentnum1 = 0;
let currentnum2 = 0;
let currentOperator = "+";
let currentAnswer = 0;



// document elements
let num1 = document.querySelector("#num1");
let operator = document.querySelector("#operator")
let num2 = document.querySelector("#num2");
let input = document.querySelector("input");

// Answer
let answer;