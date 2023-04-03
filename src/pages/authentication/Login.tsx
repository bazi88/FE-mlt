import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/authSlice";
import { logIn, logOut } from "../../features/tokenSlice";

import {
    useLoginUserMutation,
    useRegisterUserMutation,
  } from "../../services/authApi";
  
import "./index.css"

type FormLoginData = {
    email: string;
    password: string;
}

const Login = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        } as FormLoginData
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [
        loginUser,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError,
            status: isLoginStatus
        }
    ] = useLoginUserMutation();

    const onSubmit = async (data: FormLoginData) => {
        const { email, password } = data;
        if (email && password) {
            await loginUser({email, password})
        } else {
            toast.success("Please fill all input fields")
        }
    };

    useEffect(() => {
        if(isLoginSuccess) {
            toast.success("User Login Successfully")
            dispatch(
                logIn({ access_token: loginData.access_token})
            )
            navigate("/translate")
        }
    },[isLoginSuccess])

    return (
        <>
            <div className="h-screen font-sans login bg-cover">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-white font-medium text-center text-lg font-bold">LOGIN</p>
                                <div className="">
                                    <label className="block text-sm text-white" htmlFor="email">E-mail</label>
                                    <input {...register("email", { required: "Email Address is required" })} aria-invalid={errors.email ? "true" : "false"} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email" placeholder="Digite o e-mail" aria-label="email" />
                                    {errors.email && <p role="alert">{errors.email?.message}</p>}
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-sm text-white">Password</label>
                                    <input {...register("password", { required: "Password is required" })} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" id="password" placeholder="Digite a sua senha" arial-label="password" required />
                                </div>

                                <div className="mt-4 items-center flex justify-between">
                                    <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                        type="submit" >Login</button>
                                    <a className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                                        href="#">Forgot a password ?</a>
                                </div>
                                <div className="text-center">
                                    <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                                        Resgister a new accounts
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login