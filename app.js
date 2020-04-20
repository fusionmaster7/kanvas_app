const express = require("express");
const ejs = require("ejs");

const app = express();

app.set("view-engine", ejs);
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {});

app.get("/hardik", (req, res) => {
  res.sendFile("public/Hardik.html");
});

app.listen(8000);
