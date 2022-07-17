import { createOptionButton } from "./Question.js";

/**
 * This function returns a div element with the class "stage" within a title and a container to hold the questions.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 * @returns {HTMLDivElement}
 */
export const Stage = () => {
  const title = document.createElement("h1");
  title.setAttribute("id", "stage-title");

  title.textContent = `${localStorage.getItem(
    "playerName"
  )} 📄 Score: ${localStorage.getItem("score")}`;

  const questionContainer = document.createElement("div");
  questionContainer.setAttribute("class", "bg-dark text-white");
  questionContainer.setAttribute("id", "question-container");

  const exitButton = createOptionButton("Exit");
  const scoreBoardButton = createOptionButton("Score board");
  scoreBoardButton.id = "score-board";
  scoreBoardButton.setAttribute("type", "button");
  scoreBoardButton.setAttribute("class", "btn btn-light");
  scoreBoardButton.setAttribute("data-bs-toggle", "modal");
  scoreBoardButton.setAttribute("data-bs-target", "#exampleModal");

  const stage = document.createElement("div");
  stage.setAttribute("class", "stage");
  stage.append(title, questionContainer, exitButton, scoreBoardButton);

  return stage;
};
