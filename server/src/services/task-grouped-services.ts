import z from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(["EASY","MEDIUM","HARD"]),
    status: z.enum(["PENDING","IN_PROGRESS","DONE"]),
    deadline: z.date(),
    assigneeId: z.string()
});


export type CreateTask = z.infer<typeof createTaskSchema>;