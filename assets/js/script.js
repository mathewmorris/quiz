//once button is clicked quiz questions appear and timer starts
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start');
var btnOne = document.createElement("button");
var btnTwo = document.createElement("button");
var btnThree = document.createElement("button");
var btnFour = document.createElement("button");



//function that runs the countdown timer
function countdown() {
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;
            timeLeft = timeLeft - 1;
        }

        if (timeLeft === 0) {
            timerEl.textContent = '';
        }


    }, 1000);
}

var startQuestions = 0;
var score = 0;


var questions = [
    
    {
        question: "Stinky?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    {
        question: "Smelly?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    {
        question: "Gross?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    {
        question: "Nasty?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    {
        question: "Icky?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    {
        question: "Rotten?",
        answers: ["yes", "no","duh", "of course"],
        correct: "yes"
    },
    
    ];
    
    

//function that loops through the questions and their answers
function nextQuestion() {
    if (startQuestions < questions.length) {

        //prints the question 
        var questionTitle = document.getElementById("question");
        questionTitle.textContent = questions[startQuestions].question;
        
        var oldParagraph = document.getElementById("oldText");
        oldParagraph.remove();

        //answers for the question
        var answerOne = questions[startQuestions].answers[0];
        btnOne.textContent = answerOne;
        
        var answerTwo = questions[startQuestions].answers[1];
        btnTwo.textContent = answerTwo;

        var answerThree = questions[startQuestions].answers[2];
        btnThree.textContent = answerThree;

        var answerFour = questions[startQuestions].answers[3];
        btnFour.textContent = answerFour;



        quiz.appendChild(questionTitle);
        quiz.appendChild(btnOne);
        quiz.appendChild(btnTwo);
        quiz.appendChild(btnThree);
        quiz.appendChild(btnFour);


    }
}




startBtn.addEventListener("click", nextQuestion);
startBtn.addEventListener("click", countdown);









//if question is answered correctly, "correct!" appears, then moves onto
// next question

//if a question is answered incorrectly "incorrect!" appears,
// and 5 seconds are deducted from the timer

//quiz ends once time runs out

//score is displayed with option to enter intials and log to localstorage 


//once start is clicked, the timer starts



