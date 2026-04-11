import authRouter from "./auth-routes";
import userRouter from "./user-routes";


export const routes = [authRouter,userRouter] as const;

export type AppRoutes = (typeof routes)[number];