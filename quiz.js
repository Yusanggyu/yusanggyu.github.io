const quizData = [
    {
        question_index: "교육학 퀴즈 질문 1.",
        question: "다음 입시 제도중 국가에서 주관하는 것은?",
        options: [
            "대학별 고사",
            "고교 내신",
            "대학 수학 능력 시험",
            "쪽지 시험"
        ],
        correctAnswer: "대학 수학 능력 시험"
    },
    {
        question_index: "교육학 퀴즈 질문 2.",
        question: "우리나라의 교육 문제점 중 알맞지 않은 것은?",
        options: [
            "학력 인플레이션",
            "주입식 교육",
            "명문 대학 출범",
            "사교육비 부담"
        ],
        correctAnswer: "명문 대학 출범"
    },
    {
        question_index: "교육학 퀴즈 질문 3.",
        question: "한국 교육의 문제를 해결하는데에 적절한 방법은?",
        options: [
            "명문 대학 폐지",
            "지식 중심 교육",
            "세계 시민 의식 교육 강화",
            "고등학교 6학년제 도입"
        ],
        correctAnswer: "세계 시민 의식 교육 강화"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];
let Answer = new Set(); // Answer 변수를 Set 객체로 초기화합니다.

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
    Answer.clear(); // Answer를 초기화합니다.
    loadQuestion();
}

startButton.addEventListener("click", startQuiz);

restartButton.addEventListener("click", function() {
    location.reload();
});

retryButton.addEventListener("click", function() {
    resultElement.textContent = "구현 중인 기능입니다.";
    retryButton.style.display = "none";
    loadQuestion();
});

function loadQuestion() {
    document.getElementById("question_index").style.display = "block";
    const currentQuizData = quizData[currentQuestion];
    document.getElementById("question_index").textContent = currentQuizData.question_index;
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
    document.getElementById("question_index").style.display = "none";
    const currentQuizData = quizData[currentQuestion];
    const selectedAnswer = selectedOption.textContent;

    selectedAnswers[currentQuestion] = optionIndex;
    Answer.add(selectedAnswer);
    
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
    document.getElementById("question_index").style.display = "none";
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    const roundedScore = Math.round((score / quizData.length) * 100);
    resultElement.textContent = `당신의 점수는 ${roundedScore}점입니다.`;
    restartButton.style.display = "inline-block";
    if (score === quizData.length) {
        retryButton.style.display = "none";
        resultElement.innerHTML += "<p>축하합니다! 모든 정답을 맞추셨습니다!</p>";
    } else {
        let wrongQuestionNumbers = [];
        for (let i = 0; i < quizData.length; i++) {
            const selectedAnswer = quizData[i].options[selectedAnswers[i]];
            if (selectedAnswers[i] !== null && selectedAnswer != quizData[i].correctAnswer) {
                wrongQuestionNumbers.push(i);
            }
        }
        if (wrongQuestionNumbers.length > 0) {
            resultElement.innerHTML += "<p>틀린 문항 번호:</p>";
            wrongQuestionNumbers.forEach(questionNumber => {
                resultElement.innerHTML += `<p>${questionNumber+1}. ${quizData[questionNumber].question}</p>`;
            });
        } else {
            resultElement.innerHTML += "<p>틀린 문항이 없습니다.</p>";
        }
        retryButton.style.display = "inline-block";
        resultElement.innerHTML += "<p>틀린 문항을 다시 풀거나 처음부터 시작할 수 있습니다.</p>";
    }
}
