import { issueAccessTokenController, loginUserController, logoutUserController, registerUserController } from "@/controllers/auth-controller";
import { Hono } from "hono";
let authRouter = new Hono()
    .post("/login", ...loginUserController)
    .post("/signup", ...registerUserController)
    .post("/logout", ...logoutUserController)
    .get("/refresh-token", ...issueAccessTokenController);
export default authRouter;
