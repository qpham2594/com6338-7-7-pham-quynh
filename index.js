var questionsArr = [
    {
      question: "How many seats are on the Supreme Court?",
      answer: "9",
      options: ["8", "9", "10", "11"],
    },
    {
      question: "Who is the current (17th) Chief Justice on the Supreme Court?",
      answer: "John Roberts",
      options: ["Frank Murphy", "John Roberts", "Horace Gray", "David Davis"],
    },
    {
      question: "What are the words written above the main entrance to the Supreme Court?",
      answer: "Equal Justice Under Law",
      options: ["Equal Justice Under Law", "Fairness, Law, and Order", "Truth and Fairness", "Power of Justice"],
    },
    {
      question: "What are the attributes of Lady Justice?",
      answer: "Scales, sword, blindfold",
      options: ["Snake, sword, shield", "Rope, snake, feather", "Scales, feather, sword", "Scales, sword, blindfold"],
    },
    {
      question: "What are the salaries of the associate justices and the chief justice?",
      answer: "$285,400 and $298,500",
      options: ["$285,400 and $298,500", "$218,600 and $231,800", "$203,100 and $215,400", "$201,100 and $215,400"],
    },
  ];

  // variables needed for the quiz

  var currentQuestion = 0
  var currentScore = 0;
  var finalScore = 0;
  var playingAgain = false;
  var optionClicked = false;


  var quiz = document.getElementById('quiz');
  var quizContainer = document.createElement("div");
  quiz.appendChild(quizContainer);


  var questionContent = document.createElement("p");
  
  

  var countdown = document.createElement("p");
  quiz.appendChild(countdown);
  var seconds = 30;
  var timer

  var previousScoreElement = document.createElement("p");
  var previousScoreInput = localStorage.getItem('previous-score');
  var playedBefore = localStorage.getItem('playedBefore')


 


// create function to start the quiz
// if user goes on the page and already played, previous score will show with Start Button
// if user has not played before, then only Start button will show

startQuiz()

function startQuiz() {
    if (playedBefore) {
        previousScoreElement.innerHTML = ('Previous Score: ' + previousScoreInput + "%");
        quiz.appendChild(previousScoreElement)
    }

    if (playingAgain) {
        updateData()
        countdown.remove()
        playingAgain = false
        currentScore = 0
        currentQuestion = 0
        quizContainer.remove()
        questionContent.remove() 
    }

    var startButton = document.createElement("button");
    startButton.setAttribute('id', 'start-quiz');
    startButton.innerHTML = "Start Quiz!";
    quiz.appendChild(startButton);
    startButton.addEventListener('click', nextQuestion)
}



function answerChoices() {
    var answerContent = document.createElement("button")
    questionsArr[currentQuestion].options.forEach(function(option){
        answerContent.innerHTML = option;
        quizContainer.appendChild(answerContent);
        answerContent.addEventListener("click",compare) // make compare functiont to check if option clicked is correct or not
    })
}


// set timer

function timerStarts () {
timer = setInterval(function() {
    seconds--
    countdown.innerHTML = seconds;

    if(seconds <= 0) {
        resetTimer()    // need to create reset for timer
     

        if((currentQuestion+1) < questionsArr.length){
            quizContainer.innerHTML = "";
            currentQuestion++;
            nextQuestion()
        }

    // for the last question

        if ((currentQuestion+1) == questionsArr.length) {
            playingAgain = true;
            updateData()
            startQuiz()
        }
    }
    }, 1000)
}


//reset timer

function resetTimer () {
    seconds = 30
    clearInterval(timer)
    countdown.innerHTML = ""
}

// new question

function nextQuestion() {

    timerStarts()

    //initial start
    if (currentQuestion == 0) {
        startButton.remove()
        previousScoreElement.remove()
    }

    //other questions
    questionContent.innerHTML = questionsArr[currentQuestion].question;

    //option function
    answerChoices()

    //timer display
    countdown.innerHTML = seconds
    quiz.appendChild(countdown)
}

function compare () {
    resetTimer()

    //check answer
    if (questionsArr[currentQuestion].answer == this.innerHTML){
        currentScore++
    }
    
    // remaining questions
    if (currentQuestion+1 < questionsArr.length) {
        currentQuestion++
        quizContainer.innerHTML = ""
        nextQuestion()
    }

    //last question
    else if ((currentQuestion+1)== questionsArr.length) {
        updateData()
        startQuiz()
    }
}

//store
function updateData() {
    finalScore = Math.round((currentScore/questionsArr.length)*100)
    localStorage.setItem('previous-score', finalScore)

    playingAgain = true
    localStorage.setItem('playedBefore', true)
    playedBefore = localStorage.getItem('playedBefore', true)

}