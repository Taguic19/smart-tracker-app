import type { CreateUser } from "../schema/user-grouped-schema-types";
import { createUserSchema } from "../schema/user-grouped-schema-types";
import {useForm, type SubmitHandler} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {TsNode} from "@thesvg/react";
import { useToast } from "@inspectph/react-toast-sileo";
import { createUserApi } from "../api/user";
import { AxiosError } from "axios";
import { Spinner } from "../utils/spinner";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
     const {handleSubmit, register, formState, reset} = useForm<CreateUser>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(createUserSchema)
    });

    const {success, error} = useToast();

    const {mutate, isPending} = useMutation({
        mutationFn: createUserApi,
       onSuccess(data) {
           success({title: data.message, position: "top-center"});
           reset();
           
       },
       onError(err) {
           error({title: err instanceof AxiosError? err.response?.data.message : "Failed to create user", position: "top-center"});
       },
    });

   
    const signupUser: SubmitHandler<CreateUser> = async (userData) => {
        if(userData.password !== userData.confirmPassword) {
            error({title: "Password dont match", position: "top-center"});
            return;
        }
        mutate({email: userData.email, password: userData.password});
    }

  


    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-200">
                   <form onSubmit={handleSubmit(signupUser)} className="bg-white p-10 rounded-lg">
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
                    <div className="flex flex-col gap-1 mb-2">
                       <label htmlFor="password">Confirm Password</label>
                       <input type="password" placeholder="Re-enter your password" {...register("confirmPassword")} className={`rounded-md w-sm py-1.5 pl-1 ${formState.errors.password ? "border-red-600" : " border-black"} border`} />
                       {formState.errors.password && <span className="text-red-700">{formState.errors.password.message}</span>}
                   </div>
                  <button className="w-full rounded-md bg-blue-600 my-2 py-1.5 text-white cursor-pointer" disabled={isPending}>
                    {isPending? <Spinner /> : "Signup"}
                  </button>
                   <p className="text-center">Already have an account? <Link to="/" className="font-medium text-blue-600">Signin Now</Link></p>
                   </form>
               </div>
    )
}



export default RegisterPage;