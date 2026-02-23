require("dotenv").config();
require("express-async-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("./config/db");
const express = require("express");
const cors = require("cors");
const Data = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 8086;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("build"));
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    name: user.name,
    email: user.email,
  });
});
const authMiddleware = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Get all tasks
app.get("/api/tasks", authMiddleware, async (req, res) => {
  const tasks = await Data.find({ user: req.user.id });
  res.json(tasks);
});

// Create task
app.post("/api/tasks", authMiddleware, async (req, res) => {
  const { tname, date, taccomplished } = req.body;

  const task = new Data({
    tname,
    date,
    taccomplished,
    user: req.user.id,
  });

  const savedTask = await task.save();
  res.status(201).json(savedTask);
});

// Update task
app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
  const updatedTask = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updatedTask);
});

// Delete task
app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
  const deletedTask = await Data.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(deletedTask);
});

app.use((req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
});

// Global error handler (OVERRIDE)
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
