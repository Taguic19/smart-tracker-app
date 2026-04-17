import { api } from "../configs/axios";
import type { IUser, LoginUser } from "../schema/user-grouped-schema-types";
import type { CreateUserResponse, GetAllUsersResponse } from "../types/api-response";


export const createUserApi = async (userData: LoginUser) => {
    try {
   const {data} = await api.post<CreateUserResponse>("/auth/signup", userData);
    return data;
    } catch (err) {
        throw err;
    }
}

export const getAllUsersApi = async (pageNumber: number, pageSize:number) => {
        try { 
        const {data} = await api.get<GetAllUsersResponse>(`http://localhost:3000/api/v1/user?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return data;
        } catch (err) {
            throw err;
        }
    
}
