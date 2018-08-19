'use strict';

let questionNum = 0;
let score = 0;

const generateQuestion = () => {
  if (questionNum < STORE.length) {
    return `
      <h2>${STORE[questionNum].question}</h2>
      <form>
        <fieldset>
          <label for='${STORE[questionNum].choices[0]}'>
            <input type='radio' name='quizOption' value='${STORE[questionNum].choices[0]}' id='${STORE[questionNum].choices[0]}' required />
            ${STORE[questionNum].choices[0]}
          </label>
          <label for='${STORE[questionNum].choices[1]}'>
            <input type='radio' name='quizOption' value='${STORE[questionNum].choices[1]}' id='${STORE[questionNum].choices[1]}' />
            ${STORE[questionNum].choices[1]}
          </label>
          <label for='${STORE[questionNum].choices[2]}'>
            <input type='radio' name='quizOption' value='${STORE[questionNum].choices[2]}' id='${STORE[questionNum].choices[2]}' />
            ${STORE[questionNum].choices[2]}
          </label>
          <label for='${STORE[questionNum].choices[3]}'>
            <input type='radio' name='quizOption' value='${STORE[questionNum].choices[3]}' id='${STORE[questionNum].choices[3]}' />
            ${STORE[questionNum].choices[3]}
          </label>
        </fieldset>
        <button class='submit'>Submit</button>
      </form>
    `;
  } else {
    renderQuizFeedback();
    restartQuiz();
  }
};

const generateCorrectAnswerFeedback = () => {
  return `
    <section>
      <p>That's right!</p>
      <button class='continue'>Continue</button>
    </section>
  `;
};

const renderCorrectAnswerFeedback = () => {
  $('main section').html(generateCorrectAnswerFeedback());
};

const generateWrongAnswerFeedback = () => {
  return `
    <section>
      <p>Sorry, the correct answer was <span>${STORE[questionNum].answer}</span>.</p>
      <button class='continue'>Continue</button>
    </section>
  `;
};

const renderWrongAnswerFeedback = () => {
  $('main section').html(generateWrongAnswerFeedback());
};

const renderFeedback = (answer) => {
  if (answer === STORE[questionNum].answer) {
    score++;    
    renderCorrectAnswerFeedback();
  } else {
    renderWrongAnswerFeedback();
  }
  $('.score').text(score);
};

const beginQuiz = () => {
  $('.begin').on('click', (event) => {
    event.preventDefault();
    $('.begin').remove();
    renderQuestion();
    $('.question').text(questionNum + 1);
  })
};

const generateQuizFeedback = () => {
  return `
    <section>
      <p>You got <span>${score}/10 right.</span></p>
      <p>Give it one more try!</p>
      <button class='restart'>Restart Quiz</button>
    </section>
  `;
}

const renderQuizFeedback = () => {
  $('main section').html(generateQuizFeedback());
};

const restartQuiz = () => {
  $(document).on('click', '.restart', event => {
    event.preventDefault();
    score = 0;
    $('.score').text(score);
    questionNum = 0;
    $('.question').text(questionNum);
    renderQuestion();
  });
};

const renderQuestion = () => {
  $('main section').html(generateQuestion());
};

const renderNextQuestion = () => {
  $(document).on('click', '.continue', event => {
    event.preventDefault();
    renderQuestion();
    if (questionNum < STORE.length) {
      $('.question').text(questionNum + 1);
    }
  });
};

const submitAnswer = () => {
  $(document).on('submit', 'form', event => {
    event.preventDefault();
    const selectedAnswer = $('input:checked').val();
    renderFeedback(selectedAnswer);
    questionNum++;
  });
};

const init = () => {
  beginQuiz();
  submitAnswer();
  renderNextQuestion();
};

$(init);