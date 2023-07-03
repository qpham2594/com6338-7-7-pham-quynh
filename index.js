// Your code here

// create variables needed for this quiz
// create the questionsArr
// create the button to start game
// create function to start game, if playing again or if already played
// if playing before, then game is back to where the player was with updated score
// if playing again, then game will reset
// displaying option buttons for each question after time is up or an option is clicked
// next question is shown if an option is selected
// check to see if selected option is matching up with the correct answer
// update the score


// Issue 1: questions are appearing one after another when timer is up
// Issue 2: the option buttons are not appearing below the questions
// Issue 2: selection is not working - selecting an option does not move on to the next question checking to see if an option is correct
// Issue 3: previous score is not working


// create variables needed for this quiz

// create the questionsArr

var questionsArr = [
    {
        question: 'How many seats are on the Supreme Court?',
        answer:'9',
        options: [ '8', '9' , '10' , '11']
    },
    
    {
        question: 'Who is the current (17th) Chief Justice on the Supreme Court?',
        answer:'John Roberts',
        options: [ 'Frank Murphy', 'John Roberts' , 'Horace Gray' , 'David Davis', ]
    },

    {
        question: 'What are the words written above the main entrance to the Supreme Court?',
        answer:'Equal Justice Under Law',
        options: [ 'Equal Justice Under Law', 'Fairness, Law, and Order' , 'Truth and Fairness' , 'Power of Justice', ]
    },

    {
        question: 'What are the attributes of Lady Justice?',
        answer:'Scales, sword, blindfold',
        options: [ 'Snake, sword, shield', 'Rope, snake, feather' , 'Scales, feather, sword' , 'Scales, sword, blindfold', ]
    },

    {
        question: 'What are the salaries of the associate justices and the chief justice?',
        answer:'$285,400 and $298,500',
        options: [ '$285,400 and $298,500', '$218,600 and $231,800' , '$203,100 and $215,400' , '$201,100 and $215,400', ]
    },
]

// create the button to start game
// create function to start game, if playing again or if already played
// if playing before, then game is back to where the player was with updated score
// if playing again, then game will reset

var currentQuestion = 0;
var score = 0;
var correctAnswer = 0;
var previousScore = localStorage.getItem("quizScore")
var questionContainer = document.createElement("div");
var questionContent = document.createElement("p");
var quiz = document.getElementById('quiz');
var quizContainer = document.createElement("div");
var startBtn = document.createElement("button");
startBtn.setAttribute('id',"start-quiz");
startBtn.innerHTML = 'Start Quiz!';
quiz.appendChild(startBtn);

startBtn.addEventListener('click',nextQuestion)

function nextQuestion() {
    
    questionContent.innerHTML = questionsArr[currentQuestion].question;
    questionContainer.appendChild(questionContent);
    quiz.appendChild(quizContainer);
    quiz.appendChild(questionContainer);
    quiz.removeChild(startBtn);
    answerChoices();
    timer();

    if (currentQuestion === 0) {
        startBtn.remove;
        previousScore.remove;
    }

}

function quizScore () {
    var quizScore = Math.round(correctAnswer/questionsArr.length * 100);
    var previousScore = document.createElement("p");
    previousScore = localStorage.getItem(quizScore);
    quizScore.innerHTML = 'Your score is ' + quizScore + '%';
    quiz.appendChild(quizScore);
}


// create a timer for each question
// reset timer when time is up for each question or if option is clicked

function timer() {
    var countdown = document.createElement("p");
    var seconds = 30;
    var counter = setInterval(startTimer,1000);

    quiz.appendChild(countdown);

    function startTimer() {
        seconds = seconds-1;
        countdown.innerHTML = seconds;

        if (seconds <= 0) {
            clearInterval(counter);
            quiz.removeChild(countdown);
            currentQuestion++;
            answerChoices++;
            nextQuestion();
        }
    }
}





// displaying option buttons for each question after time is up or an option is clicked

function answerChoices () {
    for (let i = 0; i < questionsArr[currentQuestion].options.length; i++) {     

        var answerContent = document.createElement("button");
        answerContent.innerHTML = questionsArr[currentQuestion].options[i];
        quizContainer.appendChild(answerContent);
        answerContent.addEventListener('click', confirm)
    }
}

// next question is shown if an option is selected
// check to see if selected option is matching up with the correct answer

function confirm (e) {
    var userSelection = e.target.innerHTML;
    var correctAnswer = questionsArr[currentQuestion].answer;

    if (userSelection === correctAnswer) {
        quizScore ++;
        currentQuestion ++;
        answerChoices ++;
        nextQuestion();
    }

    if (!userSelection === correctAnswer) {
        currentQuestion ++;
        answerChoices ++;
        nextQuestion()
    }
}



// update the score
