// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Questions array
const questions = [
  {
    question: "What movie do we find the character Aragorn in?",
    answers: [
      { text: "Game of Thrones", correct: false },
      { text: "Lord of the Rings", correct: true },
      { text: "Eragon", correct: false },
      { text: "My Little Pony", correct: false },
    ],
  },
  {
    question: "What movie did not Quentin Tarantino direct?",
    answers: [
      { text: "Pulp Fiction", correct: false },
      { text: "The Hateful Eight", correct: false },
      { text: "Django Unchained", correct: false },
      { text: "John Wick", correct: true },
    ],
  },
  {
    question: "What movie did Samuel L. Jackson not star in?",
    answers: [
      { text: "Captain Marvel", correct: false },
      { text: "Star Wars", correct: false },
      { text: "The Lighthouse", correct: true },
      { text: "Kong: Skull Island", correct: false },
    ],
  },
  {
    question: "What Hollywood movie star plays himself in Zombieland?",
    answers: [
      { text: "Bill Murray", correct: true },
      { text: "Brad Pitt", correct: false },
      { text: "The Rock", correct: false },
      { text: "Emma Watson", correct: false },
    ],
  },
  {
    question: "Which movie features Leonardo DiCaprio and Kate Winslet as the main characters?",
    answers: [
      { text: "Titanic", correct: true },
      { text: "The Notebook", correct: false },
      { text: "Eternal Sunshine of the Spotless Mind", correct: false },
      { text: "Romeo + Juliet", correct: false },
    ],
  },
  {
    question: "Which movie is famous for the quote 'May the Force be with you'?",
    answers: [
      { text: "Star Trek", correct: false },
      { text: "Star Wars", correct: true },
      { text: "The Matrix", correct: false },
      { text: "Blade Runner", correct: false },
    ],
  },
  {
    question: "In which movie does Tom Hanks play the character Forrest Gump?",
    answers: [
      { text: "Saving Private Ryan", correct: false },
      { text: "Forrest Gump", correct: true },
      { text: "The Green Mile", correct: false },
      { text: "Apollo 13", correct: false },
    ],
  },
  {
    question: "Which movie won the Academy Award for Best Picture in 2020?",
    answers: [
      { text: "Parasite", correct: true },
      { text: "1917", correct: false },
      { text: "Joker", correct: false },
      { text: "Once Upon a Time in Hollywood", correct: false },
    ],
  },
  {
    question: "Which movie features the character Tony Stark as Iron Man?",
    answers: [
      { text: "Captain America: Civil War", correct: false },
      { text: "The Avengers", correct: true },
      { text: "Guardians of the Galaxy", correct: false },
      { text: "Thor: Ragnarok", correct: false }
    ]
  },
  {
    question: "In which movie does Johnny Depp portray the character Jack Sparrow?",
    answers: [
      { text: "Pirates of the Caribbean", correct: true },
      { text: "The Great Gatsby", correct: false },
      { text: "Alice in Wonderland", correct: false },
      { text: "Sweeney Todd: The Demon Barber of Fleet Street", correct: false },
    ],
  },
];

// Array to store the used question indices
let usedQuestionIndices = [];

// Function to display a random question
function displayRandomQuestion() {
  resetState();

  if (usedQuestionIndices.length === questions.length) {
    endGame();
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestionIndices.includes(randomIndex));

  const question = questions[randomIndex];
  usedQuestionIndices.push(randomIndex);

  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = createAnswerButton(answer);
    answerButtons.appendChild(button);
  });
}

// Function to start the game
function startGame() {
  score = 0;
  usedQuestionIndices = [];
  displayRandomQuestion();
  startTimer();
}

// Function to create an answer button
function createAnswerButton(answer) {
  const button = document.createElement("button");
  button.innerText = answer.text;
  button.classList.add("btn");

  if (answer.correct) {
    button.dataset.correct = answer.correct;
  }

  button.addEventListener("click", selectAnswer);
  return button;
}

// Function to reset the state
function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle the selection of an answer
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Function to end the game
function endGame() {
  clearInterval(timer);
  questionElement.innerText = `Quiz Completed! Your Score: ${score}/${questions.length}`;
  nextButton.style.display = "none";

  // Remove answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  // Create "Quit Game" button
  const quitButton = document.createElement("button");
  quitButton.innerText = "Quit Game";
  quitButton.classList.add("btn");
  quitButton.addEventListener("click", () => {
    // Redirect to index.html
    window.location.href = "index.html";
  });

  // Create "Play Again" button
  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Play Again";
  playAgainButton.classList.add("btn");
  playAgainButton.addEventListener("click", () => {
    // Restart the game
    restartGame();
  });

  // Append the buttons to the answer buttons container
  answerButtons.appendChild(quitButton);
  answerButtons.appendChild(playAgainButton);
}

// Function to start the timer
function startTimer() {
  let timeLeft = 60;
  timerElement.innerText = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayRandomQuestion();
  } else {
    endGame();
  }
});

// Function to restart the game
function restartGame() {
  score = 0;
  usedQuestionIndices = [];

  // Clear any error message
  const errorMessage = answerButtons.querySelector("p");
  if (errorMessage) {
    answerButtons.removeChild(errorMessage);
  }

  resetState();
  displayRandomQuestion();
  startTimer();
}

// Start the game
startGame();