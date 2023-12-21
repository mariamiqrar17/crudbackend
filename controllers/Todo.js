const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  const {title,brand,price,description} = req.body;
  console.log(title,brand,price,description)
 
  
  const user = new Todo({
    title,brand,price,description
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "Todo created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
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
  try {
    const todoId = req.params.id;
    const { title, description, price, brand } = req.body;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send({ error: "Todo not found" });
    }

    // Update the properties if they exist in the request body
    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (price) {
      todo.price = price;
    }
    if (brand) {
      todo.brand = brand;
    }

    // Save the updated todo
    await todo.save();

    res.status(200).send({
      todo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };
