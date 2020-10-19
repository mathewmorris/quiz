// Grab all elements for easy selection later.
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var introEl = document.getElementById("intro");
var resultsEl = document.getElementById("results");
var quizContainer = document.getElementById("quiz");
var questionTitle = document.getElementById("question");
var answersEl = document.getElementById("answers");
var statusEl = document.getElementById("status");
var resetButton = document.getElementById("resetButton");
var highScoreButton = document.getElementById("scoreButton");
var scoresEl = document.getElementById("scores");
var quizEl = document.getElementById("quiz");
var scoreKey = "highScores";

highScoreButton.onclick = function () {
  showScores();
};

function saveScore(initials, score) {
  var oldScores = JSON.parse(localStorage.getItem(scoreKey));
  var newScore = {
    name: initials,
    score: score,
  };
  var newScores;

  if (oldScores) {
    oldScores.push(newScore);
    newScores = oldScores;
  } else {
    newScores = [newScore];
  }

  localStorage.setItem(scoreKey, JSON.stringify(newScores));
}

function toggleScoresButtonText() {
  if (!scores.classList.contains("hidden")) {
    updateInnerText(highScoreButton, "View High Scores");
  } else {
    updateInnerText(highScoreButton, "Go Back To Quiz");
  }
}

function showScores() {
  updateInnerHTML(scoresEl, null);
  toggleScoresButtonText();
  toggleElement(scoresEl);
  toggleElement(quizEl);
  var scores = JSON.parse(localStorage.getItem(scoreKey));

  if (scores) {
    scores
      .sort(function (a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      })
      .forEach(function (score) {
        var item = document.createElement("p");
        updateInnerText(item, score.name + ": " + score.score);

        append(scoresEl, item);
      });
  } else {
    updateInnerText(scoresEl, "No Scores!");
  }
}

// global update inner text
function updateInnerText(el, text) {
  el.innerText = text;
}

// global update inner html
function updateInnerHTML(el, item) {
  el.innerHTML = item;
}

// global append
function append(el, item) {
  el.append(item);
}

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
  var initials = prompt("What are your initials?");
  saveScore(initials, score);
  toggleElement(highScoreButton);
  updateQuestion("Results");
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
  updateInnerText(questionTitle, text);
}

// Replaces old answers with new
function updateAnswers(answers) {
  // empty answers
  updateInnerHTML(answersEl, null);

  // add answers
  answers.forEach((answer, idx) => {
    var button = document.createElement("button");
    updateInnerText(button, answer);
    button.onclick = () => {
      checkAnswer(idx);
      if (current + 1 < quiz.length) {
        nextQuestion();
      } else {
        showResults();
      }
    };

    // Adds button to answers div
    append(answersEl, button);
  });
}

// Updates Status div
function updateStatus(text) {
  updateInnerText(statusEl, text);
}

// Clears the #status element
function clearStatus() {
  updateStatus("");
}

// Increase score if correct, reduce time if incorrect
function checkAnswer(idx) {
  if (idx === currentQuestion.correct) {
    score++;
    window.score = score;
    updateStatus("Correct!");
  } else {
    timeLeft = timeLeft - penalty;
    updateStatus("Incorrect. -" + penalty + " seconds!");
  }
}

function startQuiz() {
  // start countdown
  countdown();
  // hide intro
  toggleElement(introEl);
  // hide scores button
  toggleElement(highScoreButton);

  // Start the quiz with first question
  updateQuestion(currentQuestion.question);
  updateAnswers(currentQuestion.answers);
}

startBtn.addEventListener("click", startQuiz);
