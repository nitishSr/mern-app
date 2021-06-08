// const router = require('todos').Router();
const express = require("express");
const router = express.Router();
let Todos = require("../models/todos.model");

router.route("/").get((req, res) => {
  Todos.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;

  const newTodo = new Todos({
    title,
    desc,
  });

  newTodo
    .save()
    .then(() => res.json("Todo item added !"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Todos.findById(req.params.id)
    .then((todoItem) => res.json(todoItem))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Todos.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo item deleted !"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Todos.findById(req.params.id)
    .then((todo) => {
      todo.title = req.body.title;
      todo.desc = req.body.desc;

      todo
        .save()
        .then(() => res.json("Todo item updated !"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
