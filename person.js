class Person {
  constructor(name) {
    this.name = name;
  }

  saudacao() {
    return `Hello, ${this.name}`;
  }
}

module.exports = {
  Person,
};
