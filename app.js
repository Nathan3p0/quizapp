// Add event listener to submit button
// On click render questions to the DOM
// Create Variable to hold current score
// Create Variable to hold current question number

let currentScore = 0;
let questionCount = 0;

function renderIntroPage(){
    return $('.questions').html(`
        <section class='intro'>
            <h2>The Design Quiz</h2>
            <hr>
            <p>Are You Ready?</p>
            <i class="fas fa-arrow-down fa-3x"></i>
            <button class='btn start-btn'>START</button>
        </section>
    `)
}

function handleStartQuiz() {
    $('.questions').on('click', '.start-btn', function(event) {
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

function changeQuestionCount() {
    return $('span.question-number').text(questionCount+1);
}

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
        changeScore();
        renderCorrectAnswer();
    } else {
        renderWrongAnswer();
        changeQuestionCount();
    }
};

// Render Template to DOM for Correct Answer Page
// Add event listener to submit
// On click 'questionCount++'
// If questionCount === 10 send to results page
// On click return to question template ii less then 10

function handleCorrectAnswerSubmit() {
    $('.questions').on('click', '.btn-correct', function() {
        if (questionCount < questions.length - 1) {
            questionCount++;
            changeQuestionCount();;
            $('.questions').html(generateQuestionTemplate());
        } else {
            renderFinalResults();
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

function changeScore() {
    currentScore++;
    $('.questions-correct').text(currentScore);
    console.log('Point Added to Score')
}

// Render Template to DOM for Wrong Answer Page
// Add event listener to submit
// On click don't add points
// If questionCount === 10 send to results page
// On click return to question template if less then 10

function getCorrectAnswer(){
    const correctAnswer = questions[questionCount].correct;
    if (correctAnswer === 'A') {
        return questions[questionCount].choiceA;
    } else if ( correctAnswer === 'B') {
        return questions[questionCount].choiceB;
    } else if ( correctAnswer === 'C') {
        return questions[questionCount].choiceC;
    } else{
        return questions[questionCount].choiceD;
    }
}

function renderWrongAnswer() {
    $('.questions').html(`
    <section class="wrong-answer">
        <i class="fas fa-thumbs-down fa-8x"></i>
        <hr>
        <p>The Correct Answer Is:</p>
        <p id='correct-answer-string'>${getCorrectAnswer()}</p>
        <hr>
        <button class="btn btn-wrong">Continue <i class="fas fa-arrow-right"></i></button>
    </section>
    `);
    console.log('Wrong Answer Has Been Served');
}

function handleWrongAnswerSubmit() {
    $('.questions').on('click', '.btn-wrong', function() {
        if (questionCount < questions.length - 1) {
            questionCount++;
            console.log(questionCount);
            changeQuestionCount();;
            $('.questions').html(generateQuestionTemplate());
        } else {
            console.log(questionCount);
            renderFinalResults();
        }
    })
}

// Display final results to DOM showing final score and restart button
// Display message based on final score
// Add event listener to restart button
// On click return to intro page
// Reset current Score to 0
// Reset current question to 0

function renderFinalResults() {
    console.log('This is the final results');
    $('.questions').html(`
        <section class="final-results">
            <h3>${finalResultMessage()}</h3>
            <p class="final-correct"><i class="fas fa-spray-can"></i> <span id="questions-correct">${currentScore}</span>/<span class="total-questions">${questions.length}</span></p>
            <hr>
            <button class="btn btn-restart">Take It Again <i class="fas fa-undo"></i></button>
        </section>
    `);
}

function finalResultMessage() {
    const percentage = (currentScore / questions.length) * 100;
    if (percentage === 100) {
       return 'The DESIGN is strong in this one!';
    } else if (percentage >= 80) {
       return  'WOW! You did great!';
    } else if( percentage >= 60) {
       return 'Not too bad. You\'ll get it next time!';
    } else {
       return 'Those are ROOKIE NUMBERS!';
    }
}

function handleRestartSubmit() {
    $('.questions').on('click', '.btn-restart', function() {
        currentScore = 0;
        questionCount = 0;
        renderIntroPage();
        changeQuestionCount();;
        $('.questions-correct').text(currentScore);
    })
}

function handleQuizApp() {
    renderIntroPage();
    handleStartQuiz();
    handleQuestionSubmit();
    handleCorrectAnswerSubmit();
    handleWrongAnswerSubmit();
    handleRestartSubmit();
}

window.onload = handleQuizApp();