const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const questions = [
    {
        question: "What Movie do we find\n the character Aragorn from?",
        answers: [
            { text: "Game Of Thrones.", correct: false},
            { text: "Lord Of The Rings.", correct: true},
            { text: "Eragon.", correct: false},
            { text: "My Little Pony.", correct: false},
        ]
    },
    {
        question: "what movie did not\n Quentin Tarantino direct?",
        answers: [
            { text: "Pulp Fiction.", correct: false},
            { text: "The Hatefull Eight.", correct: false},
            { text: "Django Unchained.", correct: false},
            { text: "John Wick.", correct: true},
        ]
    },
    {
        question: "What movie did Samuel L. Jackson\n not star in?",
        answers: [
            { text: "Captain Marvel.", correct: false},
            { text: "Starwars.", correct: false},
            { text: "The Lighthouse.", correct: true},
            { text: "Kong: Skull Island.", correct: false},
        ]
    },
    {
        question: "What Hollywood movie star\n plays himself in Zombieland?",
        answers: [
            { text: "Bill Murray.", correct: true},
            { text: "Brad Pitt.", correct: false},
            { text: "The Rock.", correct: false},
            { text: "Emma Watson.", correct: false},
        ]
    },

]

let score = 0
let currentQuestionIndex = 0 

function startGame(){
    score = 0
    currentQuestionIndex = 0
    nextButton.innerHTML = "next"
    displayQuestion()
}

function displayQuestion() {
    resetBtn()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNum = currentQuestionIndex + 1
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
        selectedBtn.classList.add("green")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        displayQuestion()
    }else{
        showScore()
    }
}

function showScore(){
    resetBtn()
    questionElement.innerHTML = `Your ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again!"
    nextButton.style.display = "block"
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startGame()
    }
})
startGame()