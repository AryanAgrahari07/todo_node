const express = require("express");
const { newTask, getmytask, updateTask, deleteTask } = require("../controllers/task.js");
const isAuthenticated = require("../middlewares/auth.js");

const router = express.Router();

router.post("/task/new", isAuthenticated , newTask);

router.get("/task/my", isAuthenticated , getmytask);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)
module.exports = router