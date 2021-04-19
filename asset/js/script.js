// connects to HTML
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button")
const myTimer = document.getElementById("my-timer")
const questionBox = document.getElementById("question")
const answerButtons = document.getElementById('answer-buttons')

// variables for time and array
let remainingTime = 120;
let minutes = getMinutes();
let seconds = getSeconds();
let questionIndex = 0;

// 5 questions
let question01 = { 
    "question": " How do you prompt a message on the webpage?",
    "answers": [
                { "answer": "window.prompt()", "correct": true },
                { "answer": "Hello.World", "correct": false },
                { "answer": "windowPrompt()", "correct": false },
                { "answer": "alert.prompt", "correct": false }]

}
let question02 = {
    "question": " What is a boolean?",
    "answers": [
                { "answer": "numeric values", "correct": false },
                { "answer": "true or false values", "correct": true },
                { "answer": "text", "correct": false },
                { "answer": "href", "correct": false }]

}
let question03 = {
    "question": " How do you create a function?",
    "answers": [
                { "answer": "var = function", "correct": false },
                { "answer": "text = function()", "correct": false },
                { "answer": "function()", "correct": true },
                { "answer": "function.myFunction()", "correct": false }]

}
let question04 = {
    "question": " How can you add a comment in a JavaScript?",
    "answers": [
                { "answer": "#This is a comment", "correct": false },
                { "answer": "'This is a comment", "correct": false },
                { "answer": "<!--This is a comment-->", "correct": false },
                { "answer": "//This is a comment", "correct": true }]

}
let question05 = {
    "question": " Where is the correct place to insert a JavaScript?",
    "answers": [
                { "answer": "the body section", "correct": false },
                { "answer": "Both the head section and the body", "correct": true },
                { "answer": "the header section", "correct": false },
                { "answer": "the head", "correct": false }]

}
// array for questions
let myQuestions = [question01, question02, question03, question04, question05]
 

// timer converter seconds to minutes, minutes to seconds.
function getMinutes() {
    return parseInt(remainingTime / 60);
}

function getSeconds() {
    return parseInt(remainingTime % 60);
}


// timer function
function updateRemainingTime() {
    if (remainingTime < 0) return;
    minutes = getMinutes();
    seconds = getSeconds();
    myTimer.innerHTML = `Minutes Left: ${minutes} Seconds Left: ${seconds}`;
    remainingTime--;
    setTimeout(updateRemainingTime, 1000);

}
// Start button, gives first question/starts timer
startButton.addEventListener('click', function () {
    questionContainer.classList.remove("hide");
    nextButton.classList.remove("hide");
    startButton.classList.add("hide");
    questionIndex = 0
    randomQuestion = myQuestions.sort(() => Math.random() - .5)
    updateRemainingTime();
    displayQuestion();
});

// fuctions for diplaying the question
function displayQuestion() {
    questionBox.textContent = myQuestions[questionIndex].question
    displayAnswers()
}

// telling the computer to stop at the length of questions/ giving final score as well
function nextQuestion() {
    let totalQuestions = myQuestions.length;
    if (questionIndex < totalQuestions - 1) {
        questionIndex ++
        displayQuestion()
    } else {
        // show score

    }
}

// function for the next button and the proceed to next question
nextButton.addEventListener('click', nextQuestion);

// true or false / wrong answer or right answer increaseing 5 seconds or decreasing 5 seconds
function pressAnswer(event) {
    let pressedButton = event.target
    if (pressedButton.dataset.correct == "true") {
        // increase score
        remainingTime += 10
    } else {
        //subtract score
        remainingTime -= 20
    }
    nextQuestion()
}

// Displaying answers for each children within the parent / added meta data for correct.
function displayAnswers() {
    let answers = myQuestions[questionIndex].answers
    let buttons = answerButtons.children
    for (let i = 0; i < answers.length; i++) {
        let currentButton = buttons[i];
        let currentAnswer = answers[i];
        currentButton.innerHTML = currentAnswer.answer
        currentButton.dataset.correct = currentAnswer.correct
        currentButton.addEventListener('click', pressAnswer )
    }
    randomAnswers = myQuestions[answers].sort(() => Math.random() - .5)

}
