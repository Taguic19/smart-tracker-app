import profileRouter from "./profile-routes";
import userRouter from "./user-routes";
import authRouter from "./auth-routes";
import taskRouter from "./task-routes";

export const routes = [profileRouter,userRouter,authRouter,taskRouter] as const;


export type AppTypes = (typeof routes)[number];