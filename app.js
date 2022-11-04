const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");
const UserModel = require("./src/models/user.model");

dotenv.config();
connectToDatabase();

const app = express();
const port = 3333;

app.use(express.json());

app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1> Home </h1>");
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
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
