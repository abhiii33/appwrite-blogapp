import React, {useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import{login as Authlogin} from "../store/authSlice"
import{Button ,Input,Logo} from "./index"
import{useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import{useForm} from "react-hook-form"
 const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{register,handlesubmit} = useForm()
    const [error,setError] = useState(null)
    const login = async(data)=>{
        try {
            setError("")
            const session = await authService.login(data)
            if(session){
                const userData= await authService.getCurrentUser()
                if(userData){
                    dispatch(Authlogin({userData}))
                    navigate
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
     <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
        )}  
        <form
            onSubmit={handlesubmit(login)}
            className="mt-8"
        >              
                <div className=''>
     <Input 
      label="Email"
      placeholder="Enter your email"
      type="email"
      {...register("email",{
        required:true,
        validate:{
            matchpattern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
      }})}

     />
     <Input 
     label="password"
     type="password"
     placeholder="enter pass "
     {...register("password",{
        required:true,
        pattern:{
            value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:"Password must be 8 characters and contain at least one letter and one number"
        }
     })} />
     <Button
         type="button"
         
      />
                </div>
         </form>
        </div>
        </div>
  )
}

export default Login