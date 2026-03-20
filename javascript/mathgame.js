let startgame;
let gamecontainer = document.getElementById("game-container");
let startScreen = document.getElementById("start-screen");
let startbtn = document.getElementById("start-btn");
let status = document.getElementById("status");
let displaylevel = document.getElementById("display-level");
let displayscore = document.getElementById("display-score");
let gamearea = document.getElementById("game-area");

// game variables
let score = 0;
let level = 1;
let correctAnswersInLevel = 0;
let correctAnswersToLevelUp = 5;

let num1 = document.getElementById("num1");
let operator = document.getElementById("operator");
let num2 = document.getElementById("num2");
let answerInput = document.getElementById("answer-input");
let submitBtn = document.getElementById("submit-btn");

// start game
startbtn.addEventListener("click", startGame);

function startGame() {
    startScreen.style.display = "active";
    gamearea.style.display = "block";
    generateQuestion();
}

function generateQuestion() {
    num1.innerHTML = Math.floor(Math.random() * 20);
    num2.innerHTML = Math.floor(Math.random() * 20);
    let operators = ["+", "-", "*", "/"];
    operator.innerHTML = operators[Math.floor(Math.random() * operators.length)];
}

submitBtn.addEventListener("click", checkAnswer);

function checkAnswer() {    
    let userAnswer = parseInt(answerInput.value);
    let correctAnswer;
    switch (operator.innerHTML) {
        case "+":
            correctAnswer = parseInt(num1.innerHTML) + parseInt(num2.innerHTML);
            break;
        case "-":
            correctAnswer = parseInt(num1.innerHTML) - parseInt(num2.innerHTML);
            break;
        case "*":
            correctAnswer = parseInt(num1.innerHTML) * parseInt(num2.innerHTML);
            break;
        case "/":
            correctAnswer = parseInt(num1.innerHTML) / parseInt(num2.innerHTML);
            break;
    }
    if (userAnswer === correctAnswer) {
        alert("Correct!");
        score += 10;
        correctAnswersInLevel++;
        if (correctAnswersInLevel >= correctAnswersToLevelUp) {
            level++;
            correctAnswersInLevel = 0;
            alert("Level Up! You are now on level " + level);
        }
    } else {
        alert("Wrong! The correct answer is " + correctAnswer);
    }   
    displayscore.innerHTML = score;
    displaylevel.innerHTML = level;
    answerInput.value = "";
    generateQuestion();
}

