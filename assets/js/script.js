const question = document.getElementById("question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#Score")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionsCounter = 0 
let availableQuestions = []

let questions = [
    {
        question: "What Movie do we find\n the character Aragorn from,",
        choice1: "Game Of Thrones",
        choice2: "Lord Of The Rings",
        choice3: "Eragon",
        choice4: "My Little Pony",
        answer: 2,    
    },
    {
        question: "what movie did not\n Quentin Tarantino direct",
        choice1: "Pulp Fiction",
        choice2: "The Hatefull Eight",
        choice3: "Django Unchained",
        choice4: "John Wick", 
        answer: 4,
    },
    {
        question: "What movie did Samuel L. Jackson\n not star in",
        choice1: "Captain Marvel",
        choice2: "Starwars",
        choice3: "The Lighthouse",
        choice4: "Kong: Skull Island", 
        answer: 3,
    },
   
    {
        question: "What Hollywood movie star\n plays himself in Zombieland?",
        choice1: "Bill Murray",
        choice2: "Brad Pitt",
        choice3: "The Rock",
        choice4: "Emma Watson", 
        answer: 1,
    },
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


runGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionsCounter++
    progressText.innerHTML = `question ${questionsCounter} of ${MAX_QUESTIONS}` 

    const questionsIdex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIdex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIdex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToAplly = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'       

        selectedChoice.parentElement.classList.add(classToAplly)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToAplly)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

runGame()