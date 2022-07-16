import { buttonHandler } from "/js/buttonHandler.js";
import { filmQuestions } from "/questions/film.js";
import { geographyQuestions } from "/questions/geography.js";
import { sportsQuestions } from "/questions/sports.js";
import { scienceQuestions } from "/questions/science.js";
import { videoGamesQuestions } from "/questions/videoGames.js";

/**
 * This function sets up the question and its options inside the question container.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
export const Question = () => {
  const selectedQuestion = getRandomQuestion();

  const questionContainer = document.querySelector("#question-container");

  const statement = setUpStatement(selectedQuestion);

  const optionsContainer = generateOptions(selectedQuestion);

  questionContainer.append(statement, optionsContainer);
};

/**
 *  Receives a question object and returns a h3 element with the question statement.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Object} selectedQuestion from JSON file
 * @returns {HTMLHeadingElement} h3 element with the question statement
 */
function setUpStatement(selectedQuestion) {
  const statement = document.createElement("h3");
  statement.innerHTML = selectedQuestion.question;
  statement.setAttribute("class", "text-white question-statement");

  return statement;
}

/**
 *  Receives a question object and returns an array with the options.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Object} selectedQuestion from JSON file
 * @returns a list of options from the selected question
 */
function getOptions(selectedQuestion) {
  const { correct_answer } = selectedQuestion;
  const incorrect_answers = [...selectedQuestion.incorrect_answers];
  currentQuestion = { correct_answer, incorrect_answers };
  incorrect_answers.push(correct_answer);

  return [...incorrect_answers];
}

/**
 * Receives a question object and returns a div element with the options inside
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Object} selectedQuestion from JSON file
 * @returns {HTMLDivElement} div element with the options within buttons
 */
function generateOptions(selectedQuestion) {
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute(
    "class",
    "options-container bg-dark text-white"
  );

  const options = getOptions(selectedQuestion);

  createAndAppendButtons(options, optionsContainer);

  return optionsContainer;
}

/**
 *  Receives an array of options and a div element and appends the options inside the div element.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Array} options from the selected question
 * @param {HTMLDivElement} optionsContainer to append the options
 */
function createAndAppendButtons(options, optionsContainer) {
  shuffle(options).forEach((answer) => {
    const button = createOptionButton(answer);
    optionsContainer.append(button);
  });
}

/**
 *  This function creates a button with the option text and adds the event listener to it.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {String} text to be displayed in the button
 * @returns {HTMLButtonElement} button with the text
 */
export function createOptionButton(text) {
  const button = document.createElement("button");
  button.setAttribute("class", "option-button btn btn-light");
  button.innerHTML = text;
  button.id = text;
  button.addEventListener("click", buttonHandler);

  return button;
}

/**
 * This function shuffles an array to get a random order.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Array} array to be shuffled
 * @returns {Array} shuffled array
 */
function shuffle(array) {
  let shuffledArray = [...array];

  let currentIndex = shuffledArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}

/**
 *  This function returns a random integer between min (inclusive) and max (inclusive).
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} random number between min and max
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *  This function returns a random question from the questions list depending on the category.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @returns {Object} a random question from the selected category
 */
function getRandomQuestion() {
  const round = localStorage.getItem("round");
  const randomQuestion = getRandomIntInclusive(0, 9);

  if (round === "1") {
    return questions.film.results[randomQuestion];
  }

  if (round === "2") {
    return questions.geography.results[randomQuestion];
  }

  if (round === "3") {
    return questions.sports.results[randomQuestion];
  }

  if (round === "4") {
    return questions.science.results[randomQuestion];
  }

  if (round === "5") {
    return questions.videoGames.results[randomQuestion];
  }
}

/**
 * This function selects title, question container, statement and options container from the DOM
 * and updates them with the new question and its options.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
export function updateQuestion() {
  const title = document.querySelector("#stage-title");
  const questionContainer = document.querySelector("#question-container");
  const questionStatement = document.querySelector(".question-statement");
  const optionsContainer = document.querySelector(".options-container");

  title.textContent = `${localStorage.getItem(
    "playerName"
  )} 📄 Score: ${localStorage.getItem("score")}`;
  questionContainer.removeChild(questionStatement);
  questionContainer.removeChild(optionsContainer);

  Question();
}

/**
 * This variable stores the current question. It is used to compare the answer with the correct answer.
 */
export let currentQuestion = {};

/**
 * This object stores the questions and their answers previously charged from files.
 */
const questions = {
  film: filmQuestions,
  geography: geographyQuestions,
  sports: sportsQuestions,
  science: scienceQuestions,
  videoGames: videoGamesQuestions,
};
