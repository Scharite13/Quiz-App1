const STORE = [
    {
        image: 'https://japari-library.com/w/images/6/65/Mule_deer.jpg',
        alt: 'Deer standing broad side with forking antlers, white tail with brown tip, whiteface, and rounded mule like ears',
        question: 'What type of game animal is this?',
        answers: [
            'Browntail Deer',
            'Whitetail Deer',
            'Mule Deer',
            'White neck Deer'
        ],
        correctAnswer: 'Mule Deer'
    },
    {
        image: 'https://www.outdoorlife.com/resizer/_JKwPZKVV41uqZ8bagK2fh6PHhM=/760x570/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/STC6GHQ4U77HVZQVPI5WCPHNGU.jpg',
        alt: 'Deer quartering away, with antlers branching from main beem, reddish brown fur, mostly brown face with white around eyes and nose, and brwon tail when lifted up is completely white.',
        question: 'What type of game animal is this?',
        answers: [
            'Moose',
            'Mule Deer',
            'Whitetail Deer',
            'Black Bear'
        ],
        correctAnswer: 'Whitetail Deer'
    },
    {
        image: 'https://www.wxpr.org/sites/wxpr/files/styles/x_large/public/201904/black-bear-50293_960_720.jpg',
        alt: 'Bear standing broadside, with a large round butt, black fur, no shoulder hump, straight face profile, and pointed ears.',
        question: 'What type of game animal is this?',
        answers: [
            'Black Bear',
            'Moose',
            'Grizzly Bear',
            'Black Fox'
        ],
        correctAnswer: 'Black Bear'
    },
    {
        image: 'https://elknetwork.com/wp-content/uploads/2016/09/bull_elk.jpg',
        alt: 'Large deer like animal quartering towards bugling, they bugle loud and frequently, large main beem antlers, light tan fur body with dark brown fur around neck.',
        question: 'What type of game animal is this?',
        answers: [
            'Moose',
            'Elk',
            'Mule Deer',
            'Brown Dear'
        ],
        correctAnswer: 'Elk'
    },
    {
        image: 'https://cdn.britannica.com/57/92857-050-8D5A0A8E/bull-moose-water.jpg',
        alt:'Largest type of deer, drinking water, has large bulbous nose, large neck with "bell" under neck, dark brown fur, and large disk like antlers.',
        question: 'What type of game animal is this?',
        answers: [
            'Whitetail Deer',
            'Elk',
            'Mule Deer',
            'Moose'
        ],
        correctAnswer: 'Moose'
    },
]

let score = 0;
let questionNumber = 0;

function restartQuiz(){
    $('.contentBox').on('click', '.restartButton', function(e){
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.startBox').show();
        

    });
    console.log('`restartquiz` ran');
};
    //This function will display a button to restart quiz

function resetStats(){
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
}    

function finalScore(){
    $('.finalBox').show();
    $('.finalBox').html(`
    <h3>Final score is ${score} /5<h3>
    <button type="submit" class="restartButton">Restart Quiz</button>`
    );
    console.log('`finalScore` ran');
};
    //This fuction will display the final score


function nextQuestion(){
    $('.contentBox').on('click','.nextButton', function(e){
        $('.altBox').hide();
        $('.questionBox').show();
        addToQuestionNumber();
        $('.questionBox form').replaceWith(renderQuestion());
    })
    console.log('`nextQuestion` ran');
};
    //This function will render a button to go to the next question


function addToScore(){
    score++;
    $('.score').text(score);

    console.log('`addToScore` ran');
};
    //This function will handle adding correct answers to score


function wrongAnswer(){
    $('.responseBox').html(
        `<h3>Sorry that answer is wrong</h3>
        <p>The correct answer is, ${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="nextButton">Next</button>`
    )
    console.log('`wrongAnswer` ran');
};
    //This function will handle wrong answers





function createQuestion(questionIndex){
    let questionMaker = $(`<form>
        <fieldset>
            <legend>
                    <img class="animalpic" src="${STORE[questionIndex].image}" alt="${STORE[questionIndex].alt}">
            </legend>
            <legend class= "questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`)
     
    let answerSelector = $(questionMaker).find('fieldset')
    ;

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex){
        $(`<label for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
            <span>${answerValue}</span>
        </label>`).appendTo(answerSelector)
    });
    $(`<button type="submit" class="submitButton">Submit</button>`).appendTo(answerSelector);
    return questionMaker;


    console.log('`createQuestion` ran');
};
    //This function will creat the questions


function handleSubmitAnswer(){
    $('.contentBox').on('submit', function(e){
        event.preventDefault();
        $('.altBox').hide();
        $('.responseBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if ( answer === correct){
            correctAnswer();
        }
        else {
            wrongAnswer();
        }

    })
    console.log('`handleSubmitAnswer` ran');
};
    //This function will handle the submit of the answers

function correctAnswer(){
    $(".responseBox").html(`
    <h3>You are Correct!</h3>
    <button type="button" class="nextButton">Next</button>`);
    addToScore();
    console.log('`correctAnswer` ran');
};
    //This function will handle correct answers  


function addToQuestionNumber(){
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
    console.log('`addToQuestionNumber` ran');
};
    //This function will add to the question number holder


function renderQuestion(){    //This function will render the questions and options
    if (questionNumber < STORE.length){
        return createQuestion(questionNumber);
    }
    else{ $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(5);
    }
    console.log('`renderQuestion` ran');
};


function startQuiz(){
    $('.altBox').hide();
    $('.startBox').on('click', '.js-startButton', function (e) { 
        e.preventDefault();
        $('.startBox').hide();
        $('.questionBox').show();
        $('.questionNumber').text(1);
        $('.questionBox').prepend(renderQuestion());

        //console.log('`startQuiz` ran');
    });
};
    //This function will start the Quiz


function renderQuiz(){
    startQuiz();
    renderQuestion();
    handleSubmitAnswer();
    nextQuestion();
    restartQuiz();
};

renderQuiz();