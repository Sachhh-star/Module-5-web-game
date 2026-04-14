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
let feedbackMsg = document.getElementById("feedback-msg");
let resetBtn = document.getElementById("reset-btn");

// reset button event listener
resetBtn.addEventListener("click", resetGame);



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
let resultBox = document.getElementById("result");

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
let currentCorrectAnswer;

function generateQuestion() {
    // increase difficulty based on the level
    let maxNumber = 10 * level;
    
    let operators = ["+", "-", "*", "/"];
    let op = operators[Math.floor(Math.random() * operators.length)];
    
    let n1 = Math.floor(Math.random() * maxNumber) + 1; // 1 to maxNumber
    let n2 = Math.floor(Math.random() * maxNumber) + 1;
    
    if (op === "-") {
        if (n1 < n2) {
            let temp = n1;
            n1 = n2;
            n2 = temp;
        }
    } else if (op === "/") {
        // Ensure clean division
        let ans = Math.floor(Math.random() * (maxNumber / 2)) + 1;
        n1 = ans * n2;
    }

    // question generation logic based on level :3
    
    if (level === 1) {
        maxNumber = 10 * level;
        n1 = Math.floor(Math.random() * maxNumber) + 1;
        n2 = Math.floor(Math.random() * maxNumber) + 1;
        op = ["+", "-"][Math.floor(Math.random() * 2)];
        let temp;
        if (op === "-" && n1 < n2) {
            temp = n1;
            n1 = n2;
            n2 = temp;
        }
    }else if (level === 2 || level === 3 || level === 4 || level === 5) {
        maxNumber = 10 * level;
        n1 = Math.floor(Math.random() * maxNumber) + 1;
        n2 = Math.floor(Math.random() * maxNumber) + 1;
        op = ["+", "-",][Math.floor(Math.random() * 2)];
        let temp;
        if (op === "-" && n1 < n2) {
            temp = n1;
            n1 = n2;
            n2 = temp;
        }
    } else if (level >= 6 || level === 7) {
        maxNumber = 10 * level;
        n1 = Math.floor(Math.random() * maxNumber) + 1;
        n2 = Math.floor(Math.random() * maxNumber) + 1;
        op = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
        let temp;
        if (op === "-" && n1 < n2) {
            temp = n1;
            n1 = n2;
            n2 = temp;
        } else if (op === "/") {
            let ans = Math.floor(Math.random() * (maxNumber / 2)) + 1;
            n1 = ans * n2;
        }
    }else {
        maxNumber = 15 * level;
        n1 = Math.floor(Math.random() * maxNumber) + 1;
        n2 = Math.floor(Math.random() * maxNumber) + 1;
        op = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
        let temp;
        if (op === "-" && n1 < n2) {
            temp = n1;
            n1 = n2;
            n2 = temp;
        } else if (op === "/") {
            let ans = Math.floor(Math.random() * (maxNumber / 2)) + 1;
            n1 = ans * n2;
        }
    }

    num1.innerHTML = n1;
    num2.innerHTML = n2;
    operator.innerHTML = op;
    
    // correct answer
    switch (op) {
        case "+": currentCorrectAnswer = n1 + n2; break;
        case "-": currentCorrectAnswer = n1 - n2; break;
        case "*": currentCorrectAnswer = n1 * n2; break;
        case "/": currentCorrectAnswer = n1 / n2; break;
    }
    
    answerInput.value = "";
    resultBox.innerHTML = "";

    clearInterval(timerInterval);
    timeSecounds = 30;
    timer.innerHTML = timeSecounds;
    timerInterval = setInterval(countdown, 1000);
}

submitBtn.addEventListener("click", checkAnswer);

// update result box 
answerInput.addEventListener("input", function() {
    resultBox.innerHTML = answerInput.value;
});
answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});

let isChecking = false;

// check answer
function checkAnswer() {    
    if (isChecking) return;
    if (answerInput.value.trim() === "") return;
    
    isChecking = true;
    clearInterval(timerInterval);
    let userAnswer = parseInt(answerInput.value);
    
    if (userAnswer === currentCorrectAnswer) {
        feedbackMsg.innerHTML = "Correct! +10 points";
        feedbackMsg.style.color = "lightgreen";
        score += 10;
        correctAnswersInLevel++;
        if (correctAnswersInLevel >= correctAnswersToLevelUp) {
            level++;
            correctAnswersInLevel = 0;
            // Optionally notify level up
            feedbackMsg.innerHTML = "Level Up! Welcome to level " + level;
            feedbackMsg.style.color = "gold";
        }
        saveLevel(); // Save local storage when getting points/leveling up
    } else {
        feedbackMsg.innerHTML = "Wrong! The right answer was " + currentCorrectAnswer;
        feedbackMsg.style.color = "red";
    }   
    displayscore.innerHTML = score;
    displaylevel.innerHTML = level;
    answerInput.value = "";
    resultBox.innerHTML = "";
    
    setTimeout(() => {
        isChecking = false;
        generateQuestion();
        feedbackMsg.innerHTML = "";
    }, 3000);
}

// timer function
function countdown() {
    if (timeSecounds > 0) {
        timeSecounds--;
        timer.innerHTML = timeSecounds;
    } else {
        clearInterval(timerInterval);
        isChecking = true;
        feedbackMsg.innerHTML = "Time's up! The answer was " + currentCorrectAnswer;
        feedbackMsg.style.color = "white";
        setTimeout(() => {
            isChecking = false;
            generateQuestion();
            feedbackMsg.innerHTML = "";
        }, 3000);
    }
}

// reset game
function resetGame() {
    // Immediately stop the timer to prevent time's up bugs
    clearInterval(timerInterval);

    // save old stats to display :x
    let oldLevel = level;
    let oldScore = score;

    // reset stats
    score = 0;
    level = 1;
    correctAnswersInLevel = 0;
    timeSecounds = 30;
    timer.innerHTML = timeSecounds;
    updateDisplay();
    
    startScreen.style.display = "flex";
    gamearea.style.display = "none";
    document.getElementById("main-game").style.display = "none";
    
    saveLevel(); // Ensure local storage resets as well
}
// update score and level display
function updateDisplay() {
    displayscore.innerHTML = score;
    displaylevel.innerHTML = level;
}

// level save (local storage)
function saveLevel() {
    const levelToSave = level;
    const scoreToSave = score;
    localStorage.setItem("mathGameLevel", levelToSave);
    localStorage.setItem("mathGameScore", scoreToSave);
} 
function loadLevel() {
    const savedLevel = localStorage.getItem("mathGameLevel");
    const savedScore = localStorage.getItem("mathGameScore");
    if (savedLevel) {
        level = parseInt(savedLevel);
        displaylevel.innerHTML = level;
    }
    if (savedScore) {
        score = parseInt(savedScore);
        displayscore.innerHTML = score;
    }
}

// initialize game
window.onload = function() {
    loadLevel();
}