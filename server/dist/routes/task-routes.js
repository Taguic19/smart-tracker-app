import { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController } from "@/controllers/task-controller";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { Hono } from "hono";
const taskRouter = new Hono()
    .get("/", authenticationMiddleware, ...getAllTasksController)
    .post("/", authenticationMiddleware, ...createTaskController)
    .get("/test", c => c.text("Test"))
    .get("/:id", authenticationMiddleware, ...getTaskByIdController)
    .delete("/:id", authenticationMiddleware, ...deleteTaskController);
export default taskRouter;
