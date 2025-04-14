import React from 'react'
import {useState,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
const App = () => {
  //  const{userData} = useSelector(store)
const[loading,setLoading] = useState(true)
const dispatch =  useDispatch()
useEffect(() => {
      authService.getCurrentUser()
     
      .then((userData)=>{ 
        if(userData)
        dispatch(login({userData}))
      else
        dispatch(logout())
      })
    .finally(() => setLoading(false))
}, [])


return !loading ?  (
  <div className='min-h-screen flex flex-wrap items-center justify-center bg-gray-400'>
    <div className='w-full block self-center'>
      <Header />
      <main>
      TODO:  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) : null

    }
export default App
