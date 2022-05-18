export class Question {
  #question;
  #answer;
  #imgUrl;

  get question() {
    return this.#question;
  }

  get answer() {
    return this.#answer;
  }

  get imgUrl() {
    return this.#imgUrl;
  }

  constructor(question, answer, imgUrl) {
    this.#question = question;
    this.#answer = answer;
    this.#imgUrl = imgUrl;
  }
}
