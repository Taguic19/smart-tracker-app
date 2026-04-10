import { type CreateTask, type ITask } from "@/schema/task-grouped-schema-types";
import prisma from "@/configs/prisma-config";
import { Status } from "@/generated/prisma/enums";
import { userSafeSelect } from "./user-grouped-services";


export const createTaskService = async (taskData: CreateTask): Promise<ITask> => {
    return await prisma.task.create({
        data: taskData,
    });
}

export const updateTaskStatus = async (taskId: string, newStatus: Status ): Promise<ITask> => {
    return await prisma.task.update({
        where: {id: taskId},
        data: {status: newStatus}
    });
}

export const findTasksService = async (pageNumber: number, pageSize: number) => {
    return await prisma.task.findMany({
        take: 10,
        skip: (pageNumber -1) * pageSize,
        include: {
            assignee: {
                select: userSafeSelect
            }
        }
    });

}

export const deleteTaskByIdService = async (taskId: string): Promise<ITask> => {
    return await prisma.task.delete({
        where: {id: taskId},
    });
}