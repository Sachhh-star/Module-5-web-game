let startgame;
let gamecontainer = document.getElementById("game-container");
let startScreen = document.getElementById("start-screen");
let startbtn = document.getElementById("start-btn");
let status = document.getElementById("status");
let displaylevel = document.getElementById("display-level");
let displayscore = document.getElementById("display-score");
let gamearea = document.getElementById("game-area");
let displaytimer = document.getElementById("display-timer");
let displayback = document.getElementById("display-back");



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

// timer variables
const timer = document.getElementById("timer");
let timeSecounds = 30;
let timerInterval;

// start game
startbtn.addEventListener("click", startGame);

function startGame() {
    startScreen.style.display = "none";
    gamearea.style.display = "block";
    generateQuestion();
}

// generate question
function generateQuestion() {
    // Increase difficulty based on the level
    let maxNumber = 20 * level;
    num1.innerHTML = Math.floor(Math.random() * maxNumber);
    num2.innerHTML = Math.floor(Math.random() * maxNumber);
    let operators = ["+", "-", "*", "/"];
    operator.innerHTML = operators[Math.floor(Math.random() * operators.length)];
    
    clearInterval(timerInterval);
    timeSecounds = 30;
    timer.innerHTML = timeSecounds;
    timerInterval = setInterval(countdown, 1000);
}

submitBtn.addEventListener("click", checkAnswer);

// check answer
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

// timer function
function countdown() {
    if (timeSecounds > 0) {
        timeSecounds--;
        timer.innerHTML = timeSecounds;
    } else {
        clearInterval(timerInterval);
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
                // Using Math.floor to match parseInt for UI answers or keeping it basic as JS handles it.
                correctAnswer = parseInt(num1.innerHTML) / parseInt(num2.innerHTML);
                break;
        }
        alert("time's up! the correct answer is " + correctAnswer);
        generateQuestion();
    }
}

// reset game
function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    level = 1;
    correctAnswersInLevel = 0;
    timeSecounds = 30;
    timer.innerHTML = timeSecounds;
    updateDisplay();
    startScreen.style.display = "block";
    gamearea.style.display = "none";
}
// update score and level display
function updateDisplay() {
    displayscore.innerHTML = score;
    displaylevel.innerHTML = level;
}
