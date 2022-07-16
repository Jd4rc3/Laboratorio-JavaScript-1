const modal = document.createElement("div");
modal.setAttribute("class", "modal fade");
modal.setAttribute("id", "exampleModal");

const modalDialog = document.createElement("div");
modalDialog.setAttribute("class", "modal-dialog");

const modalContent = document.createElement("div");
modalContent.setAttribute("class", "modal-content");

const modalHeader = document.createElement("div");
modalHeader.setAttribute("class", "modal-header");

const modalTitle = document.createElement("h5");
modalTitle.setAttribute("class", "modal-title text-dark");
modalTitle.textContent = "Score Board!";

const closeButton = document.createElement("button");
closeButton.setAttribute("type", "button");
closeButton.setAttribute("class", "btn-close");
closeButton.setAttribute("data-bs-dismiss", "modal");
closeButton.setAttribute("aria-label", "Close");

const modalBody = document.createElement("div");
modalBody.setAttribute("class", "modal-body");
modalBody.setAttribute("id", "modal-body");

modalHeader.append(modalTitle, closeButton);
modalContent.append(modalHeader, modalBody);
modalDialog.append(modalContent);
modal.append(modalDialog);

const domBody = document.querySelector("body");
domBody.append(modal);

/**
 * This function reads the scoreBoard from localStorage and put it in the modal.
 *
 * @author Juan Daniel Arce <jdarce91@misena.edu.co>
 * @version 1.0.0
 */
export function fIllScoreBoard() {
  const scoreBoard = localStorage.getItem("scoreBoard")
    ? JSON.parse(localStorage.getItem("scoreBoard"))
    : [];

  if (scoreBoard.length > 0) {
    const modalBody = document.querySelector("#modal-body");
    const children = [...modalBody.childNodes];

    if (children.length > 0) {
      children.forEach((child) => {
        modalBody.removeChild(child);
      });
    }

    scoreBoard.forEach((score) => {
      const p = document.createElement("p");
      const line = `${score.playerName}  | Score: ${score.score} | Round: ${score.round} | ${score.date}`;
      p.textContent = line;
      p.setAttribute("class", "text-dark");
      modalBody.append(p);
    });
  }
}
