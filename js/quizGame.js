import { Question } from "./question.js";

class QuizGame {
  #questions = [];
  #currentQuestion;

  constructor() {
    this.clearHtml();
    this.getData();
  }

  async getData() {
    const response = await fetch("./data/vraagantwoord.json");
    const resultJSON = await response.json();
    this.addQuestions(resultJSON);
    this.shuffleArray();
    this.#currentQuestion = this.#questions[0];
    this.questionToHtml(this.#currentQuestion);
  }
  addQuestions(dataObjects) {
    this.#questions = dataObjects.map(
      (q) => new Question(q.Vraag, q.Antwoord, q.ImageQuestion, q.ImageAnswer)
    );
  }

  shuffleArray() {
    for (var i = this.#questions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.#questions[i];
      this.#questions[i] = this.#questions[j];
      this.#questions[j] = temp;
    }
  }

  nextQuestion() {
    this.clearHtml();
    if (
      this.#questions.indexOf(this.#currentQuestion) ===
      this.#questions.length - 1
    ) {
      document.getElementById("question").innerText =
        "No more questions... come back later";
      document.getElementById("show").setAttribute("disabled", true);
    } else {
      this.#currentQuestion =
        this.#questions[this.#questions.indexOf(this.#currentQuestion) + 1];
      this.questionToHtml(this.#currentQuestion);
    }
  }

  clearHtml() {
    document.getElementById("question").innerText = "";
    document.getElementById("answer").innerText = "";
    const imgQ = document.getElementById("img-q");
    if (imgQ) {
      document.getElementById("div-img-question").removeChild(imgQ);
    }
    const imgA = document.getElementById("img-a");
    if (imgA) {
      document.getElementById("div-img-answer").removeChild(imgA);
    }
  }

  questionToHtml() {
    document.getElementById("question").innerText =
      "Q: " + this.#currentQuestion.question;
    if (this.#currentQuestion.imgQuestion) {
      const img = document.createElement("img");
      img.src = "./images/" + this.#currentQuestion.imgQuestion;
      img.id = "img-q";
      img.className = "mb-5";
      document.getElementById("div-img-question").appendChild(img);
    }
  }

  showAnswer() {
    document.getElementById("answer").innerText =
      "A: " + this.#currentQuestion.answer;
    if (this.#currentQuestion.imgAnswer) {
      const img = document.createElement("img");
      img.src = "./images/" + this.#currentQuestion.imgAnswer;
      img.id = "img-a";
      img.className = "mt-5";
      document.getElementById("div-img-answer").appendChild(img);
    }
  }

  get answerIsVisible() {
    return document.getElementById("answer").innerText !== "";
  }
}

function init() {
  const game = new QuizGame();
  document.getElementById("show").onclick = () => {
    if (game.answerIsVisible) {
      game.nextQuestion();
      document.getElementById("show").innerText = "Show Answer";
    } else {
      game.showAnswer();
      document.getElementById("show").innerText = "Next Question";
    }
  };
}
window.onload = init;
