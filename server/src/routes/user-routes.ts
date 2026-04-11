import { deleteUserByIdController, getAllUsersController, getUserByEmailController, getUserByIdController, updateEmailController, updatePasswordController } from "@/controllers/user-controller";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { Hono } from "hono";


const userRouter = new Hono({strict: false}).basePath("/v1/user");

userRouter.get("/", authenticationMiddleware, ...getAllUsersController);
userRouter.get("/email",authenticationMiddleware, ...getUserByEmailController);
userRouter.put("/:id", authenticationMiddleware, ...updateEmailController);
userRouter.get("/:id", authenticationMiddleware, ...getUserByIdController);
userRouter.delete("/:id", authenticationMiddleware, ...deleteUserByIdController);
userRouter.put("/:id/password", authenticationMiddleware, ...updatePasswordController);

export default userRouter;