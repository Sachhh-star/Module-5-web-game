// game 
let startgame;
let live = 3;
let score = 0;
let correctAnswer = 0;
let selectedoptionbtn = null;

// elments
const screen = {
    start: document.getElementById("startscreen-game"),
    game: document.getElementById("game-screen"),
    result: document.getElementById("result-screen")
}

const startbtn = document.getElementById("start-btn");
const tableGrid = document.getElementById("tableGrid"); //might deleted 
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const liveEl = document.getElementById("live");
const resultEl = document.getElementById("result");
const playAgainBtn = document.getElementById("play-again-btn");

const display = {
    gamequestion: document.getElementById("gamequestion"),
    num1: document.getElementById("num-1"),
    num2: document.getElementById("num-2"),
}

// timer variables
const timer = document.getElementById("timer-container"); 
let timeSecounds = 30;
let timerInterval;


// start game
startbtn.addEventListener("click", startGame);
// playAgainBtn.addEventListener("click", startGame);

function startGame() {
    live = 3;
    score = 0;
    correctAnswer = 0;
    selectedoptionbtn = null;
    screen.start.style.display = "none";
    screen.game.style.display = "block";
    screen.result.style.display = "none";
    generateQuestion();
}
// generate question
function generateQuestion() {

}