//once button is clicked quiz questions appear and timer starts
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start');


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


function buildQuiz() {

    //once start quiz is clicked, the first question appears
    var firstQuestion = document.getElementById("question").innerHTML = "Who invented Javascript?";

    //remove the original paragraph
    var oldParagraph = document.getElementById("oldText");
    oldParagraph.remove();

    //creates a button for an answer
    var answerOne = document.createElement("button");
    document.getElementById("question").appendChild(answerOne);

    var answerTwo = document.createElement("button");
    document.getElementById("question").appendChild(answerTwo);
    
    var answerThree = document.createElement("button");
    document.getElementById("question").appendChild(answerThree);

    var answerFour = document.createElement("button");
    document.getElementById("question").appendChild(answerFour);

}







startBtn.addEventListener("click", buildQuiz);
startBtn.addEventListener("click", countdown);

//a question appears with multiple choices for answers

//if question is answered correctly, "correct!" appears, then moves onto
// next question

//if a question is answered incorrectly "incorrect!" appears,
// and 5 seconds are deducted from the timer

//quiz ends once time runs out

//score is displayed with option to enter intials and log to localstorage 


//once start is clicked, the timer starts
