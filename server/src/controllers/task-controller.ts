import { createFactory } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { createTaskSchema, taskStatusSchema } from "@/schema/task-grouped-schema-types";
import { HTTPException } from "hono/http-exception";
import { paginationSchema, paramsSchema, type Variables } from "@/schema/request-grouped-schema-types";
import { zValidator } from "@hono/zod-validator";
import { createTaskService, deleteTaskByIdService, findTasksService, updateTaskStatusService } from "@/services/task-grouped-services";

const factory = createFactory<{Variables: Variables}>();

export const createTaskController = factory.createHandlers(zValidator("json", createTaskSchema), async (c) => {
    const task = c.req.valid("json");
    
    const createdTask = await createTaskService(task);
    if(!task) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR,{message: "Failed to create task"});
    }

    return c.json({success: true, message: "Task created successfully", createdTask},StatusCodes.CREATED);
}); 

export const updateTaskStatusController = factory.createHandlers(zValidator("param", paramsSchema), zValidator("json", taskStatusSchema), async (c) => {
    const { id} = c.req.valid("param");
    const {status} = c.req.valid("json");

    const updatedTask = await updateTaskStatusService(id,status);
    if(!updatedTask) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: `Failed to update task Id: ${id}`});
    }

    return c.json({success: true, message: "Task updated successfully", updatedTask});

});

export const deleteTaskController = factory.createHandlers(zValidator("param", paramsSchema), async (c) => {
    const {id} = c.req.valid("param");
    const deletedTask = await deleteTaskByIdService(id);

    if(!deletedTask) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: `Failed to delete task with Id: ${id}`});
    }

    return c.json({success: true, message: "Task deleted successfully",deletedTask});
});

export const getAllTasksController = factory.createHandlers(zValidator("query",paginationSchema), async (c) => {
    const {pageNumber, pageSize} = c.req.valid("query");
    const tasks = await findTasksService(pageNumber, pageSize);
    
    return c.json({tasks});
})




