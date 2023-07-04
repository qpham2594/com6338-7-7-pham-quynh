// Your code here

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

// creating needed variables

var quiz = document.getElementById('quiz')
var quizContainer = document.createElement("div")
var currentScore = 0
var finalScore = 0
var quizBefore = localStorage.getItem('playedBefore')
var quizAgain = false // setting variable here and define below so that if user is taking quiz again, the quiz can restart
var currentQuestion = 0

var previousScoreElement = document.createElement("p")
var startBtn = document.createElement("button")
startBtn.setAttribute('id','start-quiz')
startBtn.innerHTML = "Start Quiz!"


var questionContent = document.createElement('p')
var countdown = document.createElement('p')
var seconds = 30
var timer 
// declaring timer as a global variable here allows us to use the variable anywhere such as in the reset function; declaring it within the timer function will disabled the resetTimer function to work

// create a function that will start the quiz so that the button will appear if the user took the quiz before or is taking it again
startQuiz()

// set up the new quiz
function startQuiz(){

// if the user took the quiz before, then localStorage will get the previous score and display it using previouScoreElement
    if(quizBefore){
        var previousScore = localStorage.getItem('previous-score');
        previousScoreElement.innerHTML = ('Previous Score: ' + previousScore + '%');
        quiz.appendChild(previousScoreElement) 
    }

// if the user is taking the quiz again 
    if(quizAgain){
        
        updateData(); // updates score and player status
        countdown.remove();
        quizAgain = false;
        currentScore = 0;
        quizContainer.innerHTML = "";
        quizContainer.remove() ;
        questionContent.remove();
        currentQuestion = 0 
    }

// start button, need to append within the function. Won't work outside the function
    quiz.appendChild(startBtn) ;
    startBtn.addEventListener('click', nextQuestion)   
}


// Displaying the questions one by one

function nextQuestion(){
    // to start timer when question starts
        clockTimer();
    
    // for brand new quiz, startBtn is remove and previous score won't show
        if(currentQuestion  == 0){
            startBtn.remove();
            previousScoreElement.remove()
        }
    
    // displaying question
        questionContent.innerHTML = questionsArr[currentQuestion].question;
        quiz.appendChild(questionContent);
    
    // quizContainer is holding the answer choices, so we need to appendChild quiz to the quiz container to display the option buttons
        quiz.appendChild(quizContainer);
        
    // need to have the function for option buttons so that it can compare the user input vs the answer
        choices();
    
    // show timer 
        countdown.innerHTML = seconds;
        quiz.appendChild(countdown) 
    }

// Using forEach function within choices funtion to display each option as a button
// Need a valid DOM to use innerHTML and to appendChild

function choices() {
    questionsArr[currentQuestion].options.forEach(function(option) {
      var answerOptions = document.createElement("button");
      answerOptions.innerHTML = option;
      answerOptions.addEventListener('click', compare);
      quizContainer.appendChild(answerOptions);
    });
  }

// Timer function
function clockTimer(){
    timer = setInterval(function(){
        seconds = seconds-1;
        countdown.innerHTML = seconds;
        // timer = 0 second
            if(seconds === 0){
                resetTimer()
        
        // if there are more questions
        // using just currentQuestion < questionsArr.length won't work because that is for the current situation
        // currentQuestion < questionsArr.length -1 or currentQuestion +1 < questionsArr.length is based on the next situation (next question in this case)
                
            if((currentQuestion < questionsArr.length - 1)) {
                quizContainer.innerHTML = "";
                currentQuestion ++;
                nextQuestion()
            } 
        // for the last question
            if(currentQuestion == questionsArr.length - 1){
                 quizAgain = true;
                updateData();
                startQuiz() 
            }   
        } 
    }, 1000)
}

// Need to reset the time when user clicks on an option or when the timer is out of time
function resetTimer(){
    seconds = 30;
    clearInterval(timer);
    countdown.innerHTML = ""
}


// compare the user input vs the actual answer
function compare(){

// when comparing, we want to reset the timer rather than having it continue
    resetTimer();
// check the user input and if it's matches with the answer then the score will be +1
    if (questionsArr[currentQuestion].answer == this.innerHTML){
        currentScore++  
    }  

// if there are still questions left over then it will go to the next question
    if(currentQuestion < questionsArr.length){
        currentQuestion ++;
        quizContainer.innerHTML = "";
        nextQuestion()  
    }

// for the last question
    if(currentQuestion == questionsArr.length){
        updateData();
        startGame()
    }  
}

// Storing data to update score for user
function updateData(){
    finalScore = Math.round((currentScore/questionsArr.length)*100);
    localStorage.setItem('previous-score', finalScore);
    localStorage.setItem('quizBefore', true);
    quizBefore = localStorage.getItem('quizBefore', true);
    quizAgain = true

}