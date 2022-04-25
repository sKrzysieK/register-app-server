const express = require("express");

const app = express();
app.use(express.json());


const { port } = require("./server-config");

let users = [];
let currentKey = 0;

app.get("/users", function (req, res) {
  console.log(users);
  res.end(JSON.stringify(users));
});

app.post("/addUser", function (req, res) {
  const filtered = users.filter((user) => user.username === req.body.username);
  if (filtered.length === 0) {
    users.push({
      key: currentKey,
      username: req.body.username,
      password: req.body.password,
      date: new Date().toLocaleDateString(),
    });
    currentKey++;
    res.end("ok");
  } else {
    res.end("user alredy exists!");
  }
});

app.post("/delete", function (req, res) {
  console.log(req.body);
  users = users.filter((user) => user.username !== req.body.username);
  res.end(JSON.stringify(users));
});

app.listen(port, function () {
  console.log("start serwera na porcie " + port);
});
