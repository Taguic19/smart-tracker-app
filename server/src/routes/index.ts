import authRouter from "./auth-routes";
import userRouter from "./user-routes";
import taskRouter from "./task-routes";

export const routes = [authRouter,userRouter, taskRouter] as const;

export type AppRoutes = (typeof routes)[number];