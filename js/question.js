export class Question {
  #question;
  #answer;
  #imgQuestion;
  #imgAnswer;

  constructor(question, answer, imgQuestion, imgAnswer) {
    this.#question = question;
    this.#answer = answer;
    this.#imgQuestion = imgQuestion;
    this.#imgAnswer = imgAnswer;
  }

  get question() {
    return this.#question;
  }

  get answer() {
    return this.#answer;
  }

  get imgQuestion() {
    return this.#imgQuestion;
  }

  get imgAnswer() {
    return this.#imgAnswer;
  }
}
