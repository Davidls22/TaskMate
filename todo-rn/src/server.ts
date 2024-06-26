import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";

const application = express();

application.use(express.json());

const PORT = 1337;

connectToDatabase();

application.get("/greeting", (request: Request, response: Response) => {
  response.send("Whats up :)");
});

application.use("/user", userRoutes);
application.use("/categories", categoryRoutes);
application.use("/tasks", taskRoutes);

application.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
