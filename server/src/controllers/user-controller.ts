import { emailSchema, paginationSchema, paramsSchema, passwordSchema, type Variables } from "@/schema/request-grouped-schema-types";
import { deleteUserByIdService, findUserByEmailService, findUserByIdService, findUsersService, updatePasswordService, updateUserEmailService } from "@/services/user-grouped-services";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";


const factory = createFactory<{Variables: Variables}>();

export const getAllUsersController = factory.createHandlers(zValidator("query", paginationSchema), async (c) => {
    const {pageNumber, pageSize} = c.req.valid("query");
    const {users, totalCount} = await findUsersService(pageNumber,pageSize);
    
    return c.json({
        users,
        totalCount,
        sucess: true
    });
});

export const getUserByIdController = factory.createHandlers(zValidator("param", paramsSchema), async (c) => {
    const {id} = c.req.valid("param");
    const user = await findUserByIdService(id);
    if(!user) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {message: `User with Id:${id} was not found`});
    }
    return c.json({user});
});

export const getUserByEmailController = factory.createHandlers(zValidator("json", emailSchema), async (c) => {
    const {email} = c.req.valid("json");
    const user = await findUserByEmailService(email);
     if(!user) {
        throw new HTTPException(StatusCodes.NOT_FOUND, {message: `User with Id:${email} was not found`});
    }
    return c.json({user});
});

export const updateEmailController = factory.createHandlers(zValidator("json", emailSchema), async (c) => {
    const {email} = c.req.valid("json");    
    const {sub} = c.get("user");

    const updatedUser = await updateUserEmailService(sub, email);
    if(!updatedUser) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: "Failed to update email"});
    }

    return c.json({success: true, message: `Email updated successfully`, newEmail: email});
});

export const deleteUserByIdController = factory.createHandlers(zValidator("param",paramsSchema), async (c) => {
    const {id} = c.req.valid("param");
    const deletedUser = await deleteUserByIdService(id);
    if(!deletedUser) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: `Failed to delete user with Id: ${id}`});
    }

    return c.json({success: true, message: `User with Id: ${id} deleted successfully`,deletedUser});
});

export const updatePasswordController = factory.createHandlers(zValidator("json", passwordSchema), async (c) => {
    const {password} = c.req.valid("json");
    const {sub} = c.get("user");
    const updatedUser = await updatePasswordService(sub, password);
    if(!updatedUser) {
        throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, {message: `Failed to update password`});
    }

    return c.json({success: true,message: `Password updated for userId: ${sub}`, updatedUser});
});


