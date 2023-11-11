import express from "express";
import { getAllTasks, createTask, toggleTaskStatus, getAllTasksByCategory, getAllCompletedTasks, getAllTasksForToday, deleteTask, editTask } from "../controllers/task.controller";
import { authenticationMiddleware } from "../middleware";

const taskRoutes = express.Router();

// Middleware to authenticate requests
taskRoutes.use(authenticationMiddleware);

// Route to get all tasks
taskRoutes.route("/").get(getAllTasks);

// Route to get all tasks by category
taskRoutes.route("/tasks-by-categories/:id").get(getAllTasksByCategory);

// Route to get all completed tasks
taskRoutes.route("/completed").get(getAllCompletedTasks);

// Route to get all tasks for today
taskRoutes.route("/today").get(getAllTasksForToday);

// Route to create a new task
taskRoutes.route("/create").post(createTask);

// Route to toggle the status of a task
taskRoutes.route("/:id").post(toggleTaskStatus);

// Route to toggle the status of a task
taskRoutes.route("/:id").delete(deleteTask);

taskRoutes.route("/edit/:id").put(editTask)

export default taskRoutes;
