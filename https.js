const http = require("http");

const port = 3333;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1> Home </h1>");
});

server.listen(port, () => console.log("Rodando na porta " + port));
