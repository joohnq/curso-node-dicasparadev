const fs = require("fs");
const path = require("path");

const users = [
  { name: "João Henrique", age: 16 },
  { name: "Eliana", age: 44 },
  { name: "George", age: 43 },
  { name: "Cecilia", age: 5 },
];

fs.mkdir(path.join(__dirname, "test"), (error) => {
  if (error) {
    return error;
  }

  console.log("Pasta criada");
});

const writeFile = () => {
  fs.writeFile(
    path.join(__dirname, "/test", "text.txt"),
    JSON.stringify(users),
    (error) => {
      if (error) {
        console.log(error);
      }

      console.log("Arquivo criado");
    }
  );
};

function addUser(name, age) {
  users.push({ name: name, age: age });

  writeFile();
}

module.exports;
