import z from "zod";



export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(["EASY","MEDIUM","HARD"]),
    status: z.enum(["PENDING","IN_PROGRESS","DONE"]),
    deadline: z.date(),
    assigneeId: z.string()
});

export type Level = "EASY" | "MEDIUM" | "HARD"
export type Status = "PENDING" | "IN_PROGRESS" | "DONE"


export type CreateTask = z.infer<typeof createTaskSchema>;

export interface ITask {
    id: string;
    title: string;
    description: string;
    assigneeId: string;
    status: Status;
    level: Level;
    createdAt: Date;
    updatedAt: Date;
}

export const taskStatusSchema = z.object({
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"])
});