import { issueAccessTokenController, loginUserController, logoutUserController, registerUserController } from "@/controllers/auth-controller";
import { Hono } from "hono";

const authRouter = new Hono().basePath("/v1/auth");

authRouter.get("/test", async (c) => c.text("Hono test"));
authRouter.post("/login", ...loginUserController);
authRouter.post("/signup", ...registerUserController);
authRouter.post("/logout", ...logoutUserController);
authRouter.get("/refresh-token", ...issueAccessTokenController);


export default authRouter;

