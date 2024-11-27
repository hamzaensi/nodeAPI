const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data store with two default tasks
let tasks = [
    {
        id: 1,
        title: "Prepare Presentation",
        description: "Create slides for the client meeting",
        state: "urgent",
    },
    {
        id: 2,
        title: "Code Review",
        description: "Review code for the new feature branch",
        state: "not urgent",
    },
];

// CRUD Operations

// 1. Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// 2. Get a single task by ID
app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// 3. Create a new task
app.post("/tasks", (req, res) => {
    const { title, description, state } = req.body;
    if (!title || !description || !state) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        state,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. Update a task by ID
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, state } = req.body;

    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, state };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// 5. Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: "Task deleted successfully" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
