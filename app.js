const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");
const UserModel = require("./src/models/user.model");

dotenv.config();
connectToDatabase();

const app = express();
const port = 3333;
const users = [
  { name: "João Henrique", age: 16 },
  { name: "Eliana", age: 44 },
  { name: "George", age: 43 },
  { name: "Cecilia", age: 5 },
];

app.use(express.json());

app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1> Home </h1>");
});

app.get("/users", (req, res) => {
  res.contentType("application/json");
  res.send(JSON.stringify(users));
});

app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log("Rodando na porta", port));
