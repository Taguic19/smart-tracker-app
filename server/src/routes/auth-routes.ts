import { getCurrentUserController, issueAccessTokenController, loginUserController, logoutUserController, registerUserController } from "@/controllers/auth-controller";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { Hono } from "hono";

const authRouter = new Hono().basePath("/v1/auth");

authRouter.post("/login", ...loginUserController);
authRouter.post("/signup", ...registerUserController);
authRouter.post("/logout",authenticationMiddleware, ...logoutUserController);
authRouter.get("/refresh-token", ...issueAccessTokenController);
authRouter.get("/me", authenticationMiddleware, ...getCurrentUserController);

export default authRouter;


