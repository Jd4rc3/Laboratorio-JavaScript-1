import { Question } from "./Components/Question.js";
import { Stage } from "./Components/Stage.js";

/**
 *  This function loads the structure of the game set up round, score, ask user for his/her name and start the game.
 *
 *  @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
export function start() {
  localStorage.setItem("round", "1");
  localStorage.setItem("score", "0");
  askForName();

  const body = document.querySelector("body");
  body.setAttribute("class", "bg-dark text-white");
  body.append(Stage());
  Question();
}

/**
 * This function check if username is null if it is, asks the user for his/her name and saves it in local storage.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 */
export function askForName() {
  if (
    localStorage.getItem("playerName") === null ||
    localStorage.getItem("playerName") === "null"
  ) {
    localStorage.setItem(
      "playerName",
      prompt("Welcome to the Trivia Game!\n\nEnter your name: ")
    );
  }
}
