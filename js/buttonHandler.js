import { fIllScoreBoard } from "./Components/bootstrapModal.js";
import { currentQuestion } from "./Components/Question.js";
import { updateQuestion } from "./Components/Question.js";
import { askForName } from "./loadStructure.js";

/**
 * This function is called when the user clicks on the button and delegates the answer to the handleAnswer function.
 *  if the user clicks on exit button, the game is reset and the user is asked for his/her name.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Event} event  The event that triggered the function
 */
export const buttonHandler = (event) => {
  if (event.target.id === "Exit") {
    exit();
    return;
  }

  if (event.target.id === "score-board") {
    fIllScoreBoard();
    return;
  }

  handleAnswer(event);
};

/**
 * This function reads the current question and checks if the answer is correct
 * If the answer is correct, the user is congratulated and the next question is asked.
 * If the answer is incorrect, the user is congratulated and the game is reset.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {Event} event The event that triggered the function passed as a parameter
 */
function handleAnswer(event) {
  const currentAnswers = { ...currentQuestion };
  const { correct_answer: escapedCorrectAnswer } = currentAnswers;
  const unescapedCorrectAnswer = htmlDecode(escapedCorrectAnswer);
  const selectedAnswer = event.target.textContent;

  // If answer is right
  if (selectedAnswer === unescapedCorrectAnswer) {
    alert("Correct!");

    if (getCurrentRound() === 5) {
      alert(`You've finished the game! Your score is ${getCurrentScore()}`);
      saveScore();
      resetGame();
      updateQuestion();
      return;
    }

    nextLevel();
    updateQuestion();
    return;
  }

  // Otherwise, the answer is wrong
  alert("Incorrect!");
  saveScore();
  resetGame();
  updateQuestion();
}

/**
 * This function resets the game.
 * put the current round to 1, the current score to 0
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
function resetGame() {
  localStorage.setItem("score", "0");
  localStorage.setItem("round", "1");
  localStorage.removeItem("playerName");
  askForName();
}

/**
 * Reads the current round from localStorage and parses it to a number.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @returns {number} the current round
 */
function getCurrentRound() {
  return parseInt(localStorage.getItem("round"));
}

/**
 * Reads the current score from localStorage and parses it to a number.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @returns {number} the current score
 */
function getCurrentScore() {
  return parseInt(localStorage.getItem("score"));
}

/**
 * This function increases the current round and current score by 1 and updates the localStorage.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
function nextLevel() {
  const currentRound = getCurrentRound();
  const currentScore = getCurrentScore();

  localStorage.setItem("score", `${currentScore + 1}`);
  localStorage.setItem("round", `${currentRound + 1}`);
}

/**
 * This function is called when the user clicks on the exit button remove his/her name from the localStorage.
 *  and reset the game.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
function exit() {
  resetGame();
  updateQuestion();
}

/**
 * This function takes a string html escaped and returns a string html unescaped.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @param {String} input The string to be decoded
 * @returns {String} The decoded string
 */
function htmlDecode(input) {
  const e = document.createElement("textarea");
  e.innerHTML = input;

  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

/**
 * This function saves the score if the user loses or wins the game.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
function saveScore() {
  const playerName = localStorage.getItem("playerName");
  const scoreList = localStorage.getItem("scoreBoard")
    ? JSON.parse(localStorage.getItem("scoreBoard"))
    : [];

  const score = getCurrentScore();
  const round = getCurrentRound();
  const date = new Date();

  const dateString = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  const scoreBoard = {
    playerName,
    score,
    round,
    date: dateString,
  };

  scoreList.push(scoreBoard);

  const scoreBoardString = JSON.stringify(scoreList);
  localStorage.setItem("scoreBoard", scoreBoardString);
}
