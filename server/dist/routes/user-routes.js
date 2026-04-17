import { deleteUserByIdController, getAllUsersController, getUserByEmailController, getUserByIdController, updateEmailController, updatePasswordController } from "@/controllers/user-controller";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { Hono } from "hono";
let userRouter = new Hono()
    .get("/", authenticationMiddleware, ...getAllUsersController)
    .get("/email", authenticationMiddleware, ...getUserByEmailController)
    .put("/:id", authenticationMiddleware, ...updateEmailController)
    .get("/:id", authenticationMiddleware, ...getUserByIdController)
    .delete("/:id", authenticationMiddleware, ...deleteUserByIdController)
    .put("/:id/password", authenticationMiddleware, ...updatePasswordController);
export default userRouter;
