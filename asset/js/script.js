// connects to HTML
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button")
const myTimer = document.getElementById("my-timer")
const questionBox = document.getElementById("question")
const answerButtons = document.getElementById('answer-buttons')
const playerHighScore = document.getElementById('my-score')

// variables for time, score, array
let remainingTime = 60;
let minutes = getMinutes();
let seconds = getSeconds();
let questionIndex = 0;
let highScore = 0;
let timerInterval;


// 5 questions
let question01 = {
    "question": " How do you prompt a message on the webpage?",
    "answers": [
        { "answer": "window.prompt()", "correct": true },
        { "answer": "Hello.World", "correct": false },
        { "answer": "windowPrompt()", "correct": false },
        { "answer": "alert.prompt", "correct": false }],
    "points": 20

}
let question02 = {
    "question": " What is a boolean?",
    "answers": [
        { "answer": "numeric values", "correct": false },
        { "answer": "true or false values", "correct": true },
        { "answer": "text", "correct": false },
        { "answer": "href", "correct": false }],
    "points": 20

}
let question03 = {
    "question": " How do you create a function?",
    "answers": [
        { "answer": "var = function", "correct": false },
        { "answer": "text = function()", "correct": false },
        { "answer": "function()", "correct": true },
        { "answer": "function.myFunction()", "correct": false }],
    "points": 20

}
let question04 = {
    "question": " How can you add a comment in a JavaScript?",
    "answers": [
        { "answer": "#This is a comment", "correct": false },
        { "answer": "'This is a comment", "correct": false },
        { "answer": "&lt!--This is a comment--&gt", "correct": false },
        { "answer": "//This is a comment", "correct": true }],
    "points": 20

}
let question05 = {
    "question": " Where is the correct place to insert a JavaScript?",
    "answers": [
        { "answer": "the body section", "correct": false },
        { "answer": "Both the head section and the body", "correct": true },
        { "answer": "the header section", "correct": false },
        { "answer": "the head", "correct": false }],
    "points": 20

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

//highscore function
function updateHighScore () {
    playerHighScore.innerHTML = `Highscore:${highScore}`
}

// timer function
function updateRemainingTime() {
    if (remainingTime < 0) return;
    minutes = getMinutes();
    seconds = getSeconds();
    myTimer.innerHTML = `Minutes Left: ${minutes} Seconds Left: ${seconds}`;
    remainingTime--;
    timerInterval = setTimeout(updateRemainingTime, 1000);
}
// time stop function
function stopTimer() {
    clearInterval(timerInterval);
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

// telling the computer to stop at the length of questions/ giving final score as well end of quiz
function nextQuestion() {
    let totalQuestions = myQuestions.length;
    if (questionIndex < totalQuestions - 1) {
        questionIndex++
        displayQuestion()
    } else {
        questionContainer.classList.add("hide");
        updateHighScore();
        stopTimer();
    }
}

// function for the next button and the proceed to next question
nextButton.addEventListener('click', nextQuestion);

// true or false / wrong answer or right answer increaseing 5 seconds or decreasing 5 seconds
function pressAnswer(event) {
    let pressedButton = event.target
    if (pressedButton.dataset.correct == "true") {
        // increase score
        remainingTime += 5
        highScore += 20
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
        currentButton.addEventListener('click', pressAnswer)
    }


}
