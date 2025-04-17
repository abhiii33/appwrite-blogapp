import React,{useState} from 'react'
import {useForm} from "react-hook-form"
import authService, { Authservice } from '../appwrite/auth'
import {    Link, useNavigate } from 'react-router-dom'
import{ useDispatch } from 'react-redux'
import  {login} from "../store/authSlice"
import{Button ,Input,Logo} from "./index"
function Signup() {
    const[error,setError] = useState("")
    const navigate = useNavigate()
    const [register,handleSubmit] = useForm()
    const dispatch = useDispatch()
    const create = async(data)=>{
        setError("")
         try {
               const userData = await authService.createAccount(data)
               if(userData){
                    const userData = await authService.getCurrentUser()
                       dispatch(login(userData))
                       navigate("/")
               }
         } catch (error) {
             setError(error.message)
         }
    }
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} >
            <Input
             label="name"
             type="text"
             placeholder="enter full name"
             {...register("name",{
                required:true
             })}
            />

            <Input
             type="email"
             label="email"
              placeholder="enter your email"
              {...register("email",{
                required:true
              })}
             />
             <Input
             type="password"
             label="password"
             placeholder="passwrd"
             {...register("password",{
                require:true,
                pattern:{
                    value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:"Password must be 8 characters and contain at least one letter and one number"
                }
             })} />

             <Button type="submit"> Create Account </Button> 
        </form>
        </div>
        </div>
  )
}

export default Signup