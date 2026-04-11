import { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController } from "@/controllers/task-controller";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { Hono } from "hono";


const taskRouter = new Hono().basePath("/v1/task");


taskRouter.get("/", authenticationMiddleware, ...getAllTasksController);
taskRouter.post("/", authenticationMiddleware, ...createTaskController);
taskRouter.get("/:id", authenticationMiddleware, ...getTaskByIdController);
taskRouter.delete("/:id", authenticationMiddleware, ...deleteTaskController);


export default taskRouter;