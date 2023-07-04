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
  var answerChoices
  

  var countdown = document.createElement("P");
  var seconds = 30;
  var timer

  var previousScoreElement = document.createElement("p");
  var previousScoreInput = localStorage.getItem('previous-score');

  var startButton = document.createElement("button");
  startButton.setAttribute('id', 'start-quiz');
  startButton.innerHTML = "Start Quiz!";
 


// create function to start the quiz
// if user goes on the page and already played, previous score will show with Start Button
// if user has not played before, then only Start button will show

function startQuiz() {
    if (playedBefore) {
        previousScoreElement.innerHTML = ('Previous Score: ' + previousScoreInput + "%");
        quiz.appendChild(previousScoreElement)
    }

    if (playingAgain) {
        updateDate()
        countdown.remove()
        playingAgain = false
        currentScore = 0
        currentQuestion = 0
        quizContainer.remove()
        questionContent.remove() 
    }
    quiz.appendChild(startButton);
    startButton.addEventListener('click', nextQuestion)
}

