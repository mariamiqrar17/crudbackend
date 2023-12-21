const Todo = require("../models/Todo");
const { validationResult } = require('express-validator');

const createTodo = async (req, res) => {
  const { title, brand, price, description } = req.body;
  console.log(title, brand, price, description);

  // Validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = new Todo({
    title,
    brand,
    price,
    description,
  });

  try {
    const data = await user.save();
    res.send({
      message: "Todo created successfully!!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating user",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const states = await Todo.find();
    res.send({
      Todo: states,
      message: "Todo Fetch Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedResource = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  const { title, description, price, brand, id } = req.body;

  const obj = {
    title,
    brand,
    price,
    description,
  };

  try {
    const updated = await Todo.findByIdAndUpdate({ _id: id }, obj);
    res.status(200).send({
      updated,
      message: "Todo updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };
