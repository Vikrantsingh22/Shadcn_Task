const express = require("express");
const cors = require("cors");
const { taskSchema } = require("./validator/zod");
const app = express();
const port = 3543;

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
};
// I am providing one more origin to the corsOptions object to tackle the issue where the localhost:5173 is busy
app.use(cors(corsOptions));
app.use(express.json());

let tasks = [];
let currentId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

app.post("/tasks", (req, res) => {
  try {
    const newTaskData = taskSchema.parse(req.body);
    const newTask = { id: currentId++, ...newTaskData };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    res.status(400).json(e.errors);
  }
});

app.put("/tasks/:id", (req, res) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
      const updatedTaskData = taskSchema.parse(req.body);
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
      res.json(tasks[taskIndex]);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (e) {
    res.status(400).json(e.errors);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Task not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
