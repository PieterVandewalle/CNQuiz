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
    console.log(dataObjects);
    this.#questions = dataObjects.map(
      (q) => new Question(q.Vraag, q.Antwoord, q.Image)
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
      document.getElementById("next").setAttribute("disabled", true);
    } else {
      this.#currentQuestion =
        this.#questions[this.#questions.indexOf(this.#currentQuestion) + 1];
      this.questionToHtml(this.#currentQuestion);
    }
  }

  clearHtml() {
    document.getElementById("question").innerText = "";
    document.getElementById("answer").innerText = "";
    const img = document.getElementById("img");
    if (img) {
      document.getElementById("afb-parent").removeChild(img);
    }
  }

  questionToHtml() {
    document.getElementById("question").innerText =
      "Q: " + this.#currentQuestion.question;
    if (this.#currentQuestion.imgUrl) {
      const img = document.createElement("img");
      img.src = "./images/" + this.#currentQuestion.imgUrl;
      img.id = "img";
      img.width = "300";
      img.height = "300";
      img.className = "mb-5";
      document.getElementById("afb-parent").appendChild(img);
    }
  }

  showAnswer(q) {
    document.getElementById("answer").innerText =
      "A: " + this.#currentQuestion.answer;
  }
  get currentQuestion() {
    return this.#currentQuestion;
  }
}

function init() {
  const game = new QuizGame();
  document.getElementById("show").onclick = () => game.showAnswer();
  document.getElementById("next").onclick = () => game.nextQuestion();
}

window.onload = init;
