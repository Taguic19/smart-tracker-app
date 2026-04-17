import { Hono } from "hono";
import { type Env } from "@/types/env";
import { authenticationMiddleware } from "@/middlewares/auth-middleware";
import { createProfileController, deleteProfileController, getProfileController, updateProfileController } from "@/controllers/profile-controller";

const profileRouter = new Hono().basePath("/v1/profile");

profileRouter.post("/", authenticationMiddleware, ...createProfileController);
profileRouter.get("/", authenticationMiddleware, ...getProfileController);
profileRouter.delete("/", authenticationMiddleware, ...deleteProfileController);
profileRouter.put("/", authenticationMiddleware, ...updateProfileController);

export default profileRouter;