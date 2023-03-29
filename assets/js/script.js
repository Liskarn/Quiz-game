const question = document.querySelector("#question")
const choises = Array.from(document.querySelectorAll(".choise-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#ScoreText")
const progressBarFull = document.querySelector("#progressBarFull")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0 
let availibleQuestions = []

let questions = [
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",    
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "", 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "", 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "", 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "", 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "", 
    }
]
