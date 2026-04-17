import {useForm, type SubmitHandler} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginUser } from "../schema/user-grouped-schema-types";
import {useToast} from "@inspectph/react-toast-sileo";
import {zodResolver} from "@hookform/resolvers/zod"
import { useAuthContext } from "../context/auth";
import { AxiosError } from "axios";
import { TsNode } from '@thesvg/react';
import { Spinner } from "../utils/spinner";
import { useState } from "react";

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {success, error} = useToast();
    const navigate = useNavigate();
    const {login} = useAuthContext();
    const {register, formState, reset, handleSubmit} = useForm<LoginUser>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    });


    const mappedRedirects: Record<string, string> = {
        USER: "/user-page",
        ADMIN: "/admin-page"
    }
    
    const signinUser: SubmitHandler<LoginUser>  = async (userData) => {
       try{ 
        setLoading(true);
        const user = await login(userData);
        success({title: "Logged in successfully", position: "top-center"});
        setLoading(false);
        reset();
         navigate(mappedRedirects[user.role]);
        }
       catch(err) {
        error({title: err instanceof AxiosError? err.response?.data.message : "Something went wrong while signing in.", position: "top-center"});
       }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-200">
            <form onSubmit={handleSubmit(signinUser)} className="bg-white p-10 rounded-lg">
               <TsNode className="h-12 w-12 mx-auto mb-2" />
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="johndoe@gmail.com" {...register("email")} className={`rounded-md w-sm py-1.5 pl-1 ${formState.errors.email ? "border-red-600" : " border-black"} border`} />
                {formState.errors.email && <span className="text-red-700">{formState.errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter your password" {...register("password")} className={`rounded-md w-sm py-1.5 pl-1 ${formState.errors.password ? "border-red-600" : " border-black"} border`} />
                {formState.errors.password && <span className="text-red-700">{formState.errors.password.message}</span>}
            </div>
           <button className="w-full rounded-md bg-blue-600 my-2 py-1.5 text-white cursor-pointer">
            {loading? <Spinner /> : "Signin"}
           </button>
            <p className="text-center">Don't have an account? <Link to="/register" className="font-medium text-blue-600">Register Now</Link></p>
            </form>
        </div>
    )

    }

    

export default LoginPage;

