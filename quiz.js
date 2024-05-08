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
    },
    {
        question_index: "교육학 퀴즈 질문 4.",
        question: "학벌 중시 사회의 폐해로 알맞지 않은 것은?",
        options: [
            "출신 학교나 학연보다 실력이나 역량을 중시",
            "저출산 유발",
            "국가 사회의 경쟁력 저하",
            "학력 인플레이션"
        ],
        correctAnswer: "출신 학교나 학연보다 실력이나 역량을 중시"
    },
    {
        question_index: "교육학 퀴즈 질문 5.",
        question: "주입식 교육의 한계점으로 올바른 것은?",
        options: [
            "정답을 선택하는 능력이 강화된다",
            "입시 위주의 교육으로 전개된다",
            "대학 입시에서 좋은 결과를 얻을 수 있다",
            "창의성과 인성 교육을 기를 수 있다"
        ],
        correctAnswer: "입시 위주의 교육으로 전개된다"
    },
    {
        question_index: "교육학 퀴즈 질문 6.",
        question: "사교육비의 부담이 가중되는 이유중 올바른 것은?",
        options: [
            "재력 과시",
            "명문대학 진학",
            "출산율 감소",
            "건강 문제"
        ],
        correctAnswer: "명문대학 진학"
    },
    {
        question_index: "교육학 퀴즈 질문 7.",
        question: "다음 중 사회 양극화가 끼치는 영향이 아닌 것은?",
        options: [
            "자녀의 교육 격차",
            "노동 시장의 불평등",
            "부모의 사회 경제적 지위 대물림",
            "속세를 떠나기 위한 귀농 및 귀촌"
        ],
        correctAnswer: "속세를 떠나기 위한 귀농 및 귀촌"
    },
    {
        question_index: "교육학 퀴즈 질문 8.",
        question: "미래 한국 교육의 방향으로 알맞지 않은 것은?",
        options: [
            "실력과 역량에 따른 직업 및 보수",
            "문이과 통합 및 의대생 감축",
            "토론, 탐구 및 프로젝트 강조",
            "사회 경제적 지위와 무관한 교육"
        ],
        correctAnswer: "문이과 통합 및 의대생 감축"
    },
    {
        question_index: "교육학 퀴즈 질문 9.",
        question: "코치로서의 교사의 역할로 알맞지 않은 것은?",
        options: [
            "자율적인 학습 촉진",
            "있는 그대로의 정답 제공",
            "필요한 도움과 안내 제공",
            "피드백 제공"
        ],
        correctAnswer: "있는 그대로의 정답 제공"
    },
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
    if (currentQuestion < quizData.length) {
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
    } else {
        showResult();
    }
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

    if (message === "틀렸습니다!") {
        const currentQuizData = quizData[currentQuestion];
        const correctAnswerElement = document.createElement("p");
        correctAnswerElement.textContent = `정답은 "${currentQuizData.correctAnswer}" 입니다.`;
        correctAnswerElement.style.color = "#fff";
        optionsContainer.appendChild(correctAnswerElement);
    }
    
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
