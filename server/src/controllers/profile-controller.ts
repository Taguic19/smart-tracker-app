import { factory } from "@/configs/create-factory";
import { createProfileSchema, updateProfileSchema } from "@/schema/profile-grouped-schema-types";
import { paramsSchema } from "@/schema/request-grouped-schema-types";
import { createProfileService, deleteProfileService, findProfileService, updateProfileService } from "@/services/profile-grouped-services";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

export const createProfileController = factory.createHandlers(zValidator("json",createProfileSchema), async (c) => {
     const profileData = c.req.valid("json");
     const createdProfile = await createProfileService(profileData);
     if(!createdProfile) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR,{message: "Failed to create Profile"});
     }
     return c.json({success: true, message: "Profile created successfully", profile: createdProfile});
});

export const deleteProfileController = factory.createHandlers(zValidator("param",paramsSchema), async (c) => {
    const {id} = c.req.valid("param");
    const deletedProfile = await deleteProfileService(id);
    if(!deletedProfile) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: "Failed to delete Profile"});
    }
});

export const getProfileController = factory.createHandlers(async (c) => {
    const {sub} = c.get("user");
    const profile = await findProfileService(sub);
    if(!profile) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR,{message: "Failed to retrieve Profile"});
    }
});

export const updateProfileController = factory.createHandlers(zValidator("json", updateProfileSchema ), async (c) => {
    const updateProfileData = c.req.valid("json");
    const {sub} = c.get("user");
    const sanitizedData = Object.fromEntries(Object.entries(updateProfileData).filter(([k,v]) => v !== undefined));
    const updatedProfile = await updateProfileService(sanitizedData,sub);
    if(!updatedProfile) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: "Failed to update Profile"});
    }
});

