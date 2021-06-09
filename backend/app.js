const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });
const proxy = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "./src/pages");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(`${__dirname}/public`)));

app.get("/", (req, res) => res.send("Home Route"));

const port = process.env.PORT || 8082;

const todosRouter = require("./routes/todos");

app.use("/todos-list", todosRouter);

mongoose
  .connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Server and Database running on ${port}, http://localhost:${port}`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = function(app) {
    app.use(proxy('/api/**', { target: 'http://localhost:8082' }));
    app.use(proxy('/otherApi/**', { target: 'http://localhost:8082' }));
};

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})
