// Add event listener to submit button
// On click render questions to the DOM
// Create Variable to hold current score
// Create Variable to hold current question number

let currentScore = 0;
let questionCount = 0;

function handleStartQuiz() {
    $('.start-btn').on('click', function(event) {
        event.preventDefault();
        console.log('handleStartQuiz Ran')
        $('.questions').html(generateQuestionTemplate());
        $('span.question-number').text(questionCount+1);
    })
}

// Change Current Score in the DOM
// Change Current Question in the DOM



// Input question from array into the template
// Input the answers from array into the template

function generateQuestionTemplate() {
    return `
    <form id="quiz-form" >
        <fieldset>
            <legend><sup>#</sup><span class="question-number">${questionCount+1}</span>. ${questions[questionCount].question}</legend>
            <div>
                <input type="radio" name="answer" id="answer_1" value="A" class="form-radio" required>
                <label for="answer_1">${questions[questionCount].choiceA}</label>
            </div>
            <div>
                <input type="radio" name="answer" id="answer_2" value="B" class="form-radio" required>
                <label for="answer_2">${questions[questionCount].choiceB}</label>
            </div>
            <div>
                <input type="radio" name="answer" id="answer_3" value="C" class="form-radio" required>
                <label for="answer_3">${questions[questionCount].choiceC}</label>
            </div>
            <div>
                <input type="radio" name="answer" id="answer_4" value="D" class="form-radio" required>
                <label for="answer_4">${questions[questionCount].choiceD}</label>
            </div>
        </fieldset>
        <button class="btn submit-btn">Submit Answer</button>
    </form>
    `;
}

// Add event listener to form
// Prevent default action from occuring
// Take the value of the selected radio item and match against correct answer
// If answer is correct 'currentScore++' & render correct answer page
// If answer is wrong do not add a point & render wrong answer page

function handleQuestionSubmit() {
    $('.questions').on('submit', '#quiz-form', function(event){
        event.preventDefault();
        checkAnswer();
        console.log('Question Submitted');
    })
}

function checkAnswer() {
    const submittedAnswer =  $("input[name='answer']:checked"). val();
    if (submittedAnswer === questions[questionCount].correct) {
        currentScore++;
        questionCount++;
        renderCorrectAnswer();
        $('span.question-number').text(questionCount+1);
    } else {
        questionCount++;
        renderWrongAnswer();
        $('span.question-number').text(questionCount+1);
    }
};

// Render Template to DOM for Correct Answer Page
// Add event listener to submit
// On click 'questionCount++'
// If questionCount === 10 send to results page
// On click return to question template ii less then 10

function handleCorrectAnswerSubmit() {
    $('.questions').on('click', '.btn-correct', function() {
        if (questionCount < questions.length) {
            $('.questions').html(generateQuestionTemplate());
        } else {
            $('.questions').html(renderFinalResults());
        }
    })
}

function renderCorrectAnswer(answer) {
    $('.questions').html(`
    <section class="correct-answer">
        <i class="fas fa-thumbs-up fa-8x"></i>
        <hr>
        <p>You're Right</p>
        <hr>
        <button class="btn btn-correct">Continue <i class="fas fa-arrow-right"></i></button>
    </section>
    `);
    console.log('Right Answer Has Been Served')
}

// Render Template to DOM for Wrong Answer Page
// Add event listener to submit
// On click don't add points
// If questionCount === 10 send to results page
// On click return to question template if less then 10

function renderWrongAnswer() {
    $('.questions').html(`
    <section class="wrong-answer">
        <i class="fas fa-thumbs-down fa-8x"></i>
        <hr>
        <p>The Correct Answer Is:</p>
        <p id='correct-answer-string'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, nisi.</p>
        <hr>
        <button class="btn">Continue <i class="fas fa-arrow-right"></i></button>
    </section>
    `);
    console.log('Wrong Answer Has Been Served');
}

function renderFinalResults() {
    console.log('This is the final results');
}

function handleQuizApp() {
    handleStartQuiz();
    handleQuestionSubmit();
    handleCorrectAnswerSubmit();
}

window.onload = handleQuizApp();