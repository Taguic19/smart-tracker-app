import { createContext, useContext, type ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import type { AuthContextType, SignedUser,LoginResponse, LogoutReponse } from "../types/auth-types";
import type { LoginUser } from "../schema/user-grouped-schema-types";
import { api } from "../configs/axios";

const AuthContext = createContext<AuthContextType | null>(null);


type AuthProviderProp = {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthProviderProp) => {

    const [user, setUser] = useState<SignedUser | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const token = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");
        if(token && savedUser) {
            try {
            setUser(JSON.parse(savedUser) as SignedUser)

            } catch {
              localStorage.clear();  
            }
        }
        setLoading(false);
    },[]);

    const login = useCallback(async (userData: LoginUser) => {

       try{
        const {data} = await api.post<LoginResponse>("/auth/login", userData);
        const {user, accessToken} = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return user;
       }
       catch(err){
        throw err;
       }
        
    },[]); 

    const logout = useCallback(async () => {
        try {
        const res = await api.post<LogoutReponse>("/auth/logout");
        if(!res.data.success) {
            throw new Error("Failed to logout");
        }
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        } catch (error) {
            throw error;
        }


    },[]);

    const values: AuthContextType = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("Component out of reach");
    }
    return ctx;
}




