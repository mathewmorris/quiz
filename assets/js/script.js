// Grab all elements for easy selection later.
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var introEl = document.getElementById("intro");
var quizContainer = document.getElementById("quiz");
var questionTitle = document.getElementById("question");
var answersEl = document.getElementById("answers");
var statusEl = document.getElementById("status");
var resetButton = document.getElementById("resetButton");

// Setup the timer
var timer;
var penalty = 5;
var timeLeft = 60;
function countdown() {
  timer = setInterval(function () {
    if (timeLeft >= 1) {
      timerEl.textContent = timeLeft;
      timeLeft = timeLeft - 1;
    }

    if (timeLeft === 0) {
      timerEl.textContent = "";
    }
  }, 1000);
}

var quiz = [
  {
    question: "Stinky?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 0,
  },

  {
    question: "Smelly?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 1,
  },

  {
    question: "Gross?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 2,
  },

  {
    question: "Nasty?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 3,
  },

  {
    question: "Icky?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 1,
  },

  {
    question: "Rotten?",
    answers: ["yes", "no", "duh", "of course"],
    correct: 2,
  },
];

// Setup quiz status
var current = 0;
var currentQuestion = quiz[current];
var score = 0;

// Clears the #status element
function clearStatus() {
  statusEl.innerText = null;
}

// Toggles visibility of an element.
function toggleElement(element) {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

// Reset quiz back to default settings
function resetQuiz() {
  // reset quiz status
  current = 0;
  score = 0;
  currentQuestion = quiz[current];

  // reset timer
  timeLeft = 60;

  // Reset text
  questionTitle.innerText = "Coding Quiz Challenge";
  answersEl.innerHTML = null;

  // Show intro
  toggleElement(introEl);

  // Hide reset button
  toggleElement(resetButton);
}

// Add onclick to reset button
resetButton.onclick = function () {
  resetQuiz();
};

function showResults() {
  questionTitle.innerText = "Results";
  answersEl.innerHTML =
    "You got " +
    score +
    " out of " +
    quiz.length +
    " right! That's " +
    Math.floor((score / quiz.length) * 100) +
    "%";

  // shows reset button
  toggleElement(resetButton);

  // stops timer
  clearInterval(timer);

  // Clear status
  clearStatus();
}

function nextQuestion() {
  // Go to next question
  current++;
  currentQuestion = quiz[current];

  // Update DOM
  updateQuestion(currentQuestion.question);
  updateAnswers(currentQuestion.answers);
}

// Updates Question Text
function updateQuestion(text) {
  questionTitle.innerText = text;
}

// Increase score if correct, reduce time if incorrect
function checkAnswer(idx) {
  if (idx === currentQuestion.correct) {
    score++;
    statusEl.innerText = "Correct!";
  } else {
    timeLeft = timeLeft - penalty;
    statusEl.innerText = "Incorrect. -" + penalty + " seconds!";
  }
}

// Replaces old answers with new
function updateAnswers(answers) {
  // empty answers
  answersEl.innerHTML = null;

  // add answers
  answers.forEach((answer, idx) => {
    var button = document.createElement("button");

    button.innerText = answer;
    button.onclick = () => {
      checkAnswer(idx);
      if (current + 1 < quiz.length) {
        nextQuestion();
      } else {
        showResults();
      }
    };
    answersEl.append(button);
  });
}

function startQuiz() {
  // start countdown
  countdown();
  // hide intro
  toggleElement(introEl);

  // Start the quiz with first question
  updateQuestion(currentQuestion.question);
  updateAnswers(currentQuestion.answers);
}

startBtn.addEventListener("click", startQuiz);
