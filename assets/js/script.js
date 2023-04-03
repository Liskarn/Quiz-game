const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const questions = [
    {
        question: "What Movie do we find\n the character Aragorn from,",
        answers: [
            { text: "Game Of Thrones", correct: false},
            { text: "Lord Of The Rings", correct: true},
            { text: "Eragon", correct: false},
            { text: "My Little Pony", correct: false},
        ]
    },
    {
        question: "what movie did not\n Quentin Tarantino direct",
        answers: [
            { text: "Pulp Fiction", correct: false},
            { text: "The Hatefull Eight", correct: false},
            { text: "Django Unchained", correct: false},
            { text: "John Wick", correct: true},
        ]
    },
    {
        question: "What movie did Samuel L. Jackson\n not star in",
        answers: [
            { text: "Captain Marvel", correct: false},
            { text: "Starwars", correct: false},
            { text: "The Lighthouse", correct: true},
            { text: "Kong: Skull Island", correct: false},
        ]
    },
    {
        question: "What Hollywood movie star\n plays himself in Zombieland?",
        answers: [
            { text: "Bill Murray", correct: true},
            { text: "Brad Pitt", correct: false},
            { text: "The Rock", correct: false},
            { text: "Emma Watson", correct: false},
        ]
    },

]

let score = 0
let currentQuestionI = 0 

function startGame(){
    score = 0
    currentQuestionI = 0
    nextButton.innerHTML = "next"
    showQuestion()
}

function showQuestion() {
    resetBtn()
    let currentQuestion = questions[currentQuestionI]
    let questionNum = currentQuestionI + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.classList.add("btn")
        button.innerHTML = answer.text
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
    
}

function resetBtn(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
    }else{
        selectedBtn.classList.add("incorrect")
    }
}
startGame()