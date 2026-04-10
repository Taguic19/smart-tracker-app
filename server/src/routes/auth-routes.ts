import { loginUserController } from "@/controllers/auth-controller";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.post("/login", ...loginUserController);

export default authRouter;

