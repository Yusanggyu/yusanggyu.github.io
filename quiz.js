const quizData = [
    {
        question: "교육학 퀴즈 질문 1: \n 1 + 1 = ?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "2"
    },
    {
        question: "교육학 퀴즈 질문 2: \n 2 x 2 = ?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "4"
    },
    // 추가 질문
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultElement = document.getElementById("result");
const quizcontainer = document.querySelector(".quiz-container");
const startButton = document.getElementById("start-btn");
const quizDescription = document.getElementById("quiz-description");
const restartButton = document.getElementById("restart-btn");
const retryButton = document.getElementById("retry-btn");

function startQuiz() {
    startButton.style.display = "none";
    document.getElementById("quiz").style.display = "block";
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
    loadQuestion();
}

startButton.addEventListener("click", function() {
    quizDescription.style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startQuiz();
});

restartButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    resultElement.textContent = "";
    restartButton.style.display = "none";
    retryButton.style.display = "none";
    quizDescription.style.display = "block";
    startButton.style.display = "block";
});

retryButton.addEventListener("click", function() {
    score = 0;
    resultElement.textContent = "";
    retryButton.style.display = "none";
    loadQuestion();
});

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    optionsContainer.innerHTML = "";
    selectedAnswers[currentQuestion] = null;

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", function() {
            checkAnswer(this, index);
        });
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, optionIndex) {
    const currentQuizData = quizData[currentQuestion];
    const selectedAnswer = selectedOption.textContent;

    selectedAnswers[currentQuestion] = optionIndex;

    if (selectedAnswer === currentQuizData.correctAnswer) {
        score++;
        showAnswerResult("정답입니다!", "#4CAF50");
    } else {
        showAnswerResult("틀렸습니다!", "#ca1f1f");
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        setTimeout(loadQuestion, 1500);
    } else {
        setTimeout(showResult, 1500);
    }
}

function showAnswerResult(message, color) {
    questionElement.textContent = "";
    optionsContainer.innerHTML = "";
    quizcontainer.style.backgroundColor = color;
    questionElement.textContent = message;
    questionElement.style.color = "#fff";

    setTimeout(function() {
        quizcontainer.style.backgroundColor = "#fff";
        questionElement.style.color = "#333";
    }, 1500);
}

function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    const roundedScore = Math.round((score / quizData.length) * 100);
    resultElement.textContent = `당신의 점수는 ${roundedScore}점입니다.`;
    document.querySelector(".restart-btn").style.display = "inline-block";
    if (score === quizData.length) {
        document.querySelector(".retry-btn").style.display = "none";
        resultElement.innerHTML += "<p>축하합니다! 모든 정답을 맞추셨습니다!</p>";
    }
    else {
        document.querySelector(".retry-btn").style.display = "inline-block";
        resultElement.innerHTML += "<p>축하합니다! 퀴즈를 완료하셨습니다!</p>";
    }
}

let clickCount = 0;
let lastClickTime = 0;

document.addEventListener('click', function(event) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < 300) {
        clickCount++;
    } else {
        clickCount = 1;
    }

    lastClickTime = currentTime;

    if (clickCount === 2) {
        if (currentQuestion < quizData.length) {
            quizcontainer.style.backgroundColor = "#fff";
            questionElement.style.color = "#333";
            loadQuestion();
        } else if (currentQuestion === quizData.length) {
            quizcontainer.style.backgroundColor = "#fff";
            questionElement.style.color = "#333";
            showResult();
        }
    }
});
