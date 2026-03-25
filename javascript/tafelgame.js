// Game Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const ui = {
    level: document.getElementById('level-display'),
    score: document.getElementById('score-display'),
    lives: document.getElementById('lives-display'),
    timerText: document.getElementById('timer-display'),
    timerBar: document.getElementById('timer-bar'),
    question: document.getElementById('question-text'),
    answersContainer: document.getElementById('answers-container'),
    feedback: document.getElementById('feedback-msg'),
    finalScore: document.getElementById('final-score-display'),
    endTitle: document.getElementById('end-title'),
    endMessage: document.getElementById('end-message')
};

const btns = {
    start: document.getElementById('start-btn'),
    restart: document.getElementById('restart-btn'),
    back: document.getElementById('back-btn'),
    menu: document.getElementById('menu-btn')
};

// Game State
let level = 1;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval;

const maxLevel = 10;
const pointsPerCorrect = 10;
const pointsToLevelUp = 50;
let correctAnswer = 0;
let isAnimating = false;

// event listeners
btns.start.addEventListener('click', startGame);
btns.restart.addEventListener('click', startGame);
btns.back.addEventListener('click', backToMenu);
if (btns.menu) btns.menu.addEventListener('click', backToMenu);

function backToMenu() {
    clearInterval(timerInterval);
    switchScreen('start');
}

function switchScreen(screenKey) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    screens[screenKey].classList.remove('hidden');
    setTimeout(() => {
        screens[screenKey].classList.add('active');
    }, 50);
}

function startGame() {
    level = 1;
    score = 0;
    lives = 3;
    ui.endTitle.textContent = 'Awesome!';
    ui.endMessage.textContent = 'You have conquered the Times Table Tower!';
    updateHUD();
    switchScreen('game');
    generateQuestion();
}

function updateHUD() {
    ui.level.textContent = level;
    ui.score.textContent = score;
    ui.lives.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
}

function startTimer() {
    clearInterval(timerInterval);
    timer = 30;
    updateTimerUI();
    
    timerInterval = setInterval(() => {
        timer--;
        updateTimerUI();
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    ui.timerText.textContent = timer;
    const percentage = (timer / 30) * 100;
    ui.timerBar.style.width = percentage + '%';
    
    if (timer > 10) {
        ui.timerBar.className = 'timer-bar';
    } else if (timer > 5) {
        ui.timerBar.className = 'timer-bar warning';
    } else {
        ui.timerBar.className = 'timer-bar danger';
    }
}

function handleTimeOut() {
    if (isAnimating) return;
    isAnimating = true;
    
    lives--;
    updateHUD();
    
    const allBtns = ui.answersContainer.querySelectorAll('.answer-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        if (parseInt(b.textContent) === correctAnswer) {
            b.classList.add('correct');
        }
    });

    ui.feedback.textContent = 'Time is up!';
    ui.feedback.className = 'feedback show error';
    
    setTimeout(() => {
        if (lives <= 0) {
            loseGame();
        } else {
            generateQuestion();
        }
    }, 1500);
}

function loseGame() {
    ui.finalScore.textContent = score;
    switchScreen('end');
    ui.endTitle.textContent = 'Game Over';
    ui.endMessage.textContent = 'You are out of lives...';
}

function generateQuestion() {
    isAnimating = false;
    ui.feedback.classList.remove('show', 'success', 'error');
    
    let minFactor = 1;
    let maxTafel = 5; 
    
    if (level === 1) { maxTafel = 5; }
    else if (level === 2) { maxTafel = 7; }
    else if (level === 3) { minFactor = 2; maxTafel = 9; }
    else if (level === 4) { minFactor = 3; maxTafel = 10; }
    else if (level === 5) { minFactor = 4; maxTafel = 12; }
    else if (level === 6) { minFactor = 4; maxTafel = 15; }
    else if (level === 7) { minFactor = 5; maxTafel = 15; }
    else if (level === 8) { minFactor = 6; maxTafel = 18; }
    else if (level === 9) { minFactor = 8; maxTafel = 20; }
    else if (level >= 10) { minFactor = 10; maxTafel = 25; }
    
    const num1 = getRandomInt(minFactor, maxTafel);
    const num2 = getRandomInt(1, maxTafel > 10 ? 10 : maxTafel);
    
    if (Math.random() > 0.5) {
        correctAnswer = num1 * num2;
        ui.question.textContent = `${num1} × ${num2} = ?`;
    } else {
        correctAnswer = num2 * num1;
        ui.question.textContent = `${num2} × ${num1} = ?`;
    }
    
    generateAnswers(num1, num2);
    startTimer();
}

function generateAnswers(num1, num2) {
    let answers = [correctAnswer];
    
    while(answers.length < 4) {
        let wrongAnswer;
        
        const strategy = getRandomInt(1, 3);
        
        if (strategy === 1) {
            let offset = getRandomInt(1, 4) * (Math.random() > 0.5 ? 1 : -1);
            wrongAnswer = correctAnswer + offset;
        } else if (strategy === 2) {
            let fakeNum = (Math.random() > 0.5 ? num1 : num2) + (Math.random() > 0.5 ? 1 : -1);
            if (fakeNum < 1) fakeNum = 2;
            wrongAnswer = (Math.random() > 0.5 ? num1 : num2) * fakeNum;
        } else {
            wrongAnswer = correctAnswer + (Math.random() > 0.5 ? 10 : -10);
        }
        
        if (wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    
    answers = answers.sort(() => Math.random() - 0.5);
    
    const answerBtns = ui.answersContainer.querySelectorAll('.answer-btn');
    answers.forEach((ans, index) => {
        if (index < answerBtns.length) {
            let btn = answerBtns[index];

            const newBtn = btn.cloneNode(true);
            newBtn.className = 'answer-btn'; 
            newBtn.style.visibility = 'visible';
            newBtn.disabled = false;
            newBtn.textContent = ans;
            newBtn.addEventListener('click', () => checkAnswer(ans, newBtn));
            btn.parentNode.replaceChild(newBtn, btn);
        }
    });
}

function checkAnswer(selectedAnswer, btnElement) {
    if (isAnimating) return;
    isAnimating = true;
    clearInterval(timerInterval); 
    
    const isCorrect = (selectedAnswer === correctAnswer);
    

    const allBtns = ui.answersContainer.querySelectorAll('.answer-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        if (parseInt(b.textContent) === correctAnswer) {
            b.classList.add('correct'); 
        }
    });

    if (isCorrect) {
        score += pointsPerCorrect; 
        ui.feedback.textContent = 'Correct answer! +10 points';
        ui.feedback.className = 'feedback show success';
    } else {
        lives--;
        btnElement.classList.add('wrong');
        ui.feedback.textContent = 'Too bad, that was wrong!';
        ui.feedback.className = 'feedback show error';
    }
    
    updateHUD();
    
    setTimeout(() => {
        if (lives <= 0 && !isCorrect) {
            loseGame();
        } else if (isCorrect) {
            checkLevelProgress();
        } else {
            generateQuestion();
        }
    }, 1500); // 1.5 second delay before next question
}

function checkLevelProgress() {
    // 50 points = next level -> points % 50 === 0
    if (score % pointsToLevelUp === 0 && score > 0) {
        level++;
        if (level > maxLevel) {
            winGame();
            return;
        }
        showLevelUp();
    } else {
        generateQuestion();
    }
}

function showLevelUp() {
    ui.question.textContent = `Level Unlocked!`;
    const allBtns = ui.answersContainer.querySelectorAll('.answer-btn');
    allBtns.forEach(b => {
        b.textContent = '';
        b.className = 'answer-btn';
        b.disabled = true;
        b.style.visibility = 'hidden';
    });
    ui.feedback.textContent = `Welcome to Level ${level}`;
    ui.feedback.className = 'feedback show success';
    updateHUD();
    
    setTimeout(() => {
        generateQuestion();
    }, 2000);
}

function winGame() {
    ui.finalScore.textContent = score;
    switchScreen('end');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
