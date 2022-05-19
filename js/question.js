export class Question {
  #category;
  #question;
  #answer;
  #imgQuestion;
  #imgAnswer;

  constructor(category, question, answer, imgQuestion, imgAnswer) {
    this.#category = category;
    this.#question = question;
    this.#answer = answer;
    this.#imgQuestion = imgQuestion;
    this.#imgAnswer = imgAnswer;
  }

  get category() {
    return this.#category;
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
