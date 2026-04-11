import authRouter from "./auth-routes";

export const routes = [authRouter] as const;

export type AppRoutes = (typeof routes)[number];