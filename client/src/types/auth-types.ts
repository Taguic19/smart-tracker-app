import type { LoginUser } from "../schema/user-grouped-schema-types";




export interface SignedUser {
    id: string;
    email: string;
    role: "USER" | "ADMIN"
}


export interface AuthContextType {
    user: SignedUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: LoginUser) => Promise<SignedUser>;
    logout: () => Promise<void>;
}

export interface LoginResponse {
    user: SignedUser;
    accessToken: string;
}

export interface LogoutReponse {
    success: boolean;
    message: true;
}