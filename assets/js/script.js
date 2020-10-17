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

console.log(countdown());

//a question appears with multiple choices for answers

//if question is answered correctly, "correct!" appears, then moves onto
// next question

//if a question is answered incorrectly "incorrect!" appears,
// and 5 seconds are deducted from the timer

//quiz ends once time runs out

//score is displayed with option to enter intials and log to localstorage 


//once start is clicked, the timer starts
startBtn.onClick = countdown;