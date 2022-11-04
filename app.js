// Importação do express
const express = require("express");
//Importação do dotenv que é uma variável de ambiente. Usamos ele para que não enviemos nossa senha e nem login do banco de dados diretamente pela requisição, além disso se quisermos mandar esse projeto para o github essa senha e login estariam vulneráveis
const dotenv = require("dotenv");

// Importação do database
const connectToDatabase = require("./src/database/connect");

const UserModel = require("./src/models/user.model");

dotenv.config();
connectToDatabase();

// Atribuimos o express a uma variável
const app = express();

//Declaramos a porta do nosso localhost
const port = 3333;

//Aqui estamos montando um middleware no express. Esse middleware será executado antes de qualquer comando de requisição. Além disso, estamos dizendo para o express que estaremos enviando apenas arquivos .JSON
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/hello", async (req, res) => {
  const users = await UserModel.find({});
  res.render("index", { users });
});

//Aqui está uma requisição GET que basicamente retorna no nosso site uma frase em HTML na nossa página
app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1> Home </h1>");
});

//Com essa requisição GET estamos pegando todos os usuários que estão presentes nessa URL, ou seja, os usuários cadastrados no banco de dados e que foram atribuidos ao nosso http://localhost:3333/users. Além disso, se retornar algum erro, o NODEJS para a requisição e retorna esse erro
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//A partir dessa requsição podemos procurar usuários por meio de um id especifico, que será passado na URL. Logo, o NODEJS pega o ID que está na nossa URL e busca no banco de dados o usuário que contem esse ID. Além disso, se retornar algum erro, o NODEJS para a requisição e retorna esse erro
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Com essa requisição POST qualquer usuário que for criado na nossa aplicação será redirecionado ao banco de dados para ser criado. Além disso, se retornar algum erro, o NODEJS para a requisição e retorna esse erro.
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Com essa requisição, DELETE os ID do usuário que for passado à URL, será encaminhado para o banco de dados para ser deletado.
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Com o PATCH, podemos fazer alterações parcias, ou seja, podemos alterar as opções que desejarmos do usuário, basta ter o ID do usuário e a a informação que deve ser alterada.
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true }); //Com o { new: true }, a partir do momento que for alterado, o banco de dados altomaticamente irá criar um usuário por cima, alterando a informação passada altomaticamente
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Aqui estamos criando o servidor, na porta 3333 e quando estiver ativo irá dar um console.log
app.listen(port, () => console.log("Rodando na porta", port));
