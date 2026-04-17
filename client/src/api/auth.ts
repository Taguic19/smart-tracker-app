import type { LoginUser } from "../schema/user-grouped-schema-types"
import {type LoginResponse } from "../types/api-response";

const BASE_URL = "http://localhost:3000/api/v1";

export const loginApi = async (userData: LoginUser) => {
    try{
       const res = await fetch(`${BASE_URL}/auth/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include"
       });
       if(!res.ok && res.status === 401) {
        throw new Error("Invalid Email or Password");
       } 
       return res.json() as Promise<LoginResponse>;
    }
    catch(err){
        throw err;
    }
}