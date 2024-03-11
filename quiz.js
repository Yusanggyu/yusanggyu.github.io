const quizData = [
    {
        question_index: "교육학 퀴즈 질문 1.",
        question: "1 + 1 = ?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "2"
    },
    {
        question_index: "교육학 퀴즈 질문 2.",
        question: "2 x 2 = ?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "4"
    },
    {
        question_index: "교육학 퀴즈 질문 3.",
        question: "10 / 2 = ?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: "5"
    }
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
    quizDescription.style.display = "none";
    document.getElementById("quiz").style.display = "block";
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
    loadQuestion();
}

startButton.addEventListener("click", startQuiz);

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
    document.getElementById("question_index").style.display = "block";
    const currentQuizData = quizData[currentQuestion];
    document.getElementById("question_index").textContent = currentQuizData.question_index; // 이 부분 추가
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
    document.getElementById("question_index").style.display = "none"; // 이 부분 추가하여 문제 번호 숨김
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
}

function showAnswerResult(message, color) {
    questionElement.textContent = "";
    optionsContainer.innerHTML = "";
    quizcontainer.style.backgroundColor = color;
    questionElement.textContent = message;
    questionElement.style.color = "#fff";
    if (currentQuestion < quizData.length - 1) {
        const nextQuestionButton = document.createElement("button");
        nextQuestionButton.textContent = "다음 문제로";
        nextQuestionButton.classList.add("next-question-btn");
        nextQuestionButton.addEventListener("click", function() {
            quizcontainer.style.backgroundColor = "#fff";
            questionElement.style.color = "#333";
            loadQuestion();
        });
        optionsContainer.appendChild(nextQuestionButton);
    } else {
        const showResultButton = document.createElement("button");
        showResultButton.textContent = "결과 화면 보기";
        showResultButton.classList.add("show-result-btn");
        showResultButton.addEventListener("click", function() {
            quizcontainer.style.backgroundColor = "#fff";
            questionElement.style.color = "#333";
            showResult();
        });
        optionsContainer.appendChild(showResultButton);
    }
}


function showResult() {
    document.getElementById("question_index").style.display = "none"; // 이 부분 추가하여 문제 번호 숨김
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    const roundedScore = Math.round((score / quizData.length) * 100);
    resultElement.textContent = `당신의 점수는 ${roundedScore}점입니다.`;
    restartButton.style.display = "inline-block";
    if (score === quizData.length) {
        retryButton.style.display = "none";
        resultElement.innerHTML += "<p>축하합니다! 모든 정답을 맞추셨습니다!</p>";
    }
    else {
        retryButton.style.display = "inline-block";
        resultElement.innerHTML += "<p>축하합니다! 퀴즈를 완료하셨습니다!</p>";
    }
}

