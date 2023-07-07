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
  
// creating any variables needed

var quiz = document.getElementById('quiz');
var quizContainer = document.createElement("div");
var currentScore = 0;
var finalScore = 0;
var currentQuestion = 0;
var quizBefore = localStorage.getItem('playedBefore');
var quizAgain = false // setting variable here and define below so that if user is taking quiz again, the quiz can restart


var previousScoreElement = document.createElement("p");
var startBtn = document.createElement("button");

var questionContent = document.createElement('p');
var countdown = document.createElement('p');
var seconds = 30;
var timer

// create a function that will start the quiz so that the button will appear if the user took the quiz before or is taking it again
startQuiz()

//Setting up the function to start the quiz
function startQuiz(){

    //if the user already took the quiz before, then the page will show previous score to user using localStorage
    if(quizBefore){
        var previousScore = localStorage.getItem('previous-score');
        previousScoreElement.innerHTML = ('Previous Score: ' + previousScore + '%');
        quiz.appendChild(previousScoreElement) 
    }


    if(quizAgain){
    
        // if the user is taking the quiz again, then everything will reset

        updateData();
        countdown.remove();
        quizAgain = false;
        currentScore = 0;
        quizContainer.innerHTML = "";
        quizContainer.remove() ;
        questionContent.remove();
        currentQuestion = 0 
    }

    // creating the start button here, need a established DOM to use appendChild and innerHTML

    startBtn.setAttribute('id','start-quiz');
    startBtn.innerHTML = "Start Quiz!";
    quiz.appendChild(startBtn)  ;
    startBtn.addEventListener('click', nextQuestion) ;  
}



// creating the timer

function clockTimer(){
    timer = setInterval(function(){
        seconds --;
        countdown.innerHTML = seconds

            // for when seconds = 0 

            if(seconds === 0){
                resetTimer()
                //questions remaining
                if((currentQuestion < questionsArr.length - 1)) {
                    quizContainer.innerHTML = "";
                    currentQuestion ++;
                    nextQuestion()
                } 

                // for the very last question

                else if(currentQuestion == questionsArr.length - 1){
                    quizAgain = true;
                    updateData();
                    startQuiz() 
                }   
            } 
        }, 1000)
}
// using questionsArr.length -1 or currentQuestion+1 < questionsArr.length is to check the following situation whereas currentQuestion < questionsArr.length is only for the current situation comparison

// need timer reset when changing questions
function resetTimer(){
    seconds = 30;
    clearInterval(timer);
    countdown.innerHTML = ""
}


// using forEach to have each option as button, and use innerHTML and appendChild here when button is created

function choices() {
    questionsArr[currentQuestion].options.forEach(function (option) {
      var answerOptions = document.createElement("button");
      answerOptions.innerHTML = option;
      answerOptions.addEventListener('click', compare);
      quizContainer.appendChild(answerOptions);
    });
  }
  

// function to present question with the timer

function nextQuestion(){

    clockTimer()

    // for when it's the first question, start button and previous score will be remove to start the quiz
    if(currentQuestion  == 0){
        startBtn.remove();
        previousScoreElement.remove()
    }

    // to display question content
    questionContent.innerHTML = questionsArr[currentQuestion].question;
    quiz.appendChild(questionContent);
    quiz.appendChild(quizContainer);
    // to display the options for user to click
    choices();
    //show the timer
    countdown.innerHTML = seconds;
    quiz.appendChild(countdown) 
}

//Validate option selected by user
function compare(){
    resetTimer();
    // if the input matches the answer then score will increase by 1
    if (questionsArr[currentQuestion].answer == this.innerHTML){
        currentScore++  
    }  

    //if there are any questions remaining, then it will move on to the next question
    if(currentQuestion < questionsArr.length-1){
        currentQuestion ++;
        quizContainer.innerHTML = "";
        nextQuestion()  
    }
    //if the current question is the last question and there is no more question left, then the data will be updated with score
    else if(currentQuestion == questionsArr.length-1){
        updateData();
        startQuiz()
    }  
}

// Storing data to update score for user after calculating it
function updateData(){
    finalScore = Math.round((currentScore/questionsArr.length)*100);
    localStorage.setItem('previous-score', finalScore);
    localStorage.setItem('quizBefore', true);
    quizBefore = localStorage.getItem('quizBefore', true);
    quizAgain = true

}
