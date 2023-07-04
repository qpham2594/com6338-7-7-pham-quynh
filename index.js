
var questionsArr = [
    {
      question: 'How many seats are on the Supreme Court?',
      answer: '9',
      options: ['8', '9', '10', '11']
    },
    {
      question: 'Who is the current (17th) Chief Justice on the Supreme Court?',
      answer: 'John Roberts',
      options: ['Frank Murphy', 'John Roberts', 'Horace Gray', 'David Davis']
    },
    {
      question: 'What are the words written above the main entrance to the Supreme Court?',
      answer: 'Equal Justice Under Law',
      options: ['Equal Justice Under Law', 'Fairness, Law, and Order', 'Truth and Fairness', 'Power of Justice']
    },
    {
      question: 'What are the attributes of Lady Justice?',
      answer: 'Scales, sword, blindfold',
      options: ['Snake, sword, shield', 'Rope, snake, feather', 'Scales, feather, sword', 'Scales, sword, blindfold']
    },
    {
      question: 'What are the salaries of the associate justices and the chief justice?',
      answer: '$285,400 and $298,500',
      options: ['$285,400 and $298,500', '$218,600 and $231,800', '$203,100 and $215,400', '$201,100 and $215,400']
    }
  ];
  

var quiz = document.getElementById('quiz')
var quizContainer = document.createElement("div")
var currentScore = 0
var finalScore = 0
var quizBefore = localStorage.getItem('playedBefore')
var quizAgain = false // setting variable here and define below so that if user is taking quiz again, the quiz can restart
var currentQuestion = 0

var previousScoreElement = document.createElement("p")
var startBtn = document.createElement("button")

var questionContent = document.createElement('p')
var countdown = document.createElement('p')
var seconds = 30
var timer

// create a function that will start the quiz so that the button will appear if the user took the quiz before or is taking it again
startQuiz()

//Sets up new game
function startQuiz(){

    //if played before, show previous score to player
    if(quizBefore){
        var previousScore = localStorage.getItem('previous-score')
        previousScoreElement.innerHTML = ('Previous Score: ' + previousScore + '%')
        quiz.appendChild(previousScoreElement) 
    }


    if(quizAgain){
        
        updateData() // updates score and player status
        countdown.remove()
        quizAgain = false
        currentScore = 0
        quizContainer.innerHTML = ""
        quizContainer.remove() 
        questionContent.remove()
        currentQuestion = 0 
    }

    //Creates start button
    startBtn.setAttribute('id','start-quiz')
    startBtn.innerHTML = "Start Quiz!"
    quiz.appendChild(startBtn)  
    startBtn.addEventListener('click', nextQuestion)   
}

//Create option buttons from question array
function choices() {
    for (let i = 0; i < questionsArr[currentQuestion].options.length; i++) {
        var answerOptions = document.createElement("button")
        answerOptions.innerHTML = questionsArr[currentQuestion].options[i]
        answerOptions.addEventListener('click', compare)
        quizContainer.appendChild(answerOptions)
    }
}

//Game timer
function clockTimer(){
    timer = setInterval(function(){
        seconds --
        countdown.innerHTML = seconds
            //if time runs out 
            if(seconds === 0){
                resetTimer()
                //questions remaining
                if((currentQuestion < questionsArr.length - 1)) {
                    quizContainer.innerHTML = ""
                    currentQuestion ++
                    nextQuestion()
                } 
                //last question
                else if(currentQuestion == questionsArr.length - 1){
                    quizAgain = true
                    updateData()
                    startQuiz() 
                }   
            } 
        }, 1000)
}

//Reset timer (when option is clicked or time runs out/new question)
function resetTimer(){
    seconds = 30
    clearInterval(timer)
    countdown.innerHTML = ""
}

//Presents new question/options to user

function nextQuestion(){

    clockTimer()

    //If first round of game (remove start button and previous score)
    if(currentQuestion  == 0){
        startBtn.remove()
        previousScoreElement.remove()
    }

    //Create and present question prompt to user
    questionContent.innerHTML = questionsArr[currentQuestion].question
    quiz.appendChild(questionContent)

    //Create container to hold/format option buttons
    quiz.appendChild(quizContainer)
    
    //Create and present option buttons to user
    choices()

    //present timer to user
    countdown.innerHTML = seconds
    quiz.appendChild(countdown) 
}

//Validate option selected by user
function compare(){
    resetTimer()
    //validate answer and increase score if correct
    if (questionsArr[currentQuestion].answer == this.innerHTML){
        currentScore++  
    }  

    //if remaining questions present new question
    if(currentQuestion < questionsArr.length-1){
        currentQuestion ++
        quizContainer.innerHTML = ""
        nextQuestion()  
    }
    //if last question, update score and reset game
    else if(currentQuestion == questionsArr.length-1){
        updateData()
        startQuiz()
    }  
}

// Storing data to update score for user
function updateData(){
    finalScore = Math.round((currentScore/questionsArr.length)*100)
    localStorage.setItem('previous-score', finalScore)
    localStorage.setItem('quizBefore', true)
    quizBefore = localStorage.getItem('quizBefore', true)
    quizAgain = true

}
