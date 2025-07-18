import React from 'react'
import {useState,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import  { currentuser } from './appwrite/auth'
import {login,logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
const App = () => {
  
const[loading,setLoading] = useState(true)
const dispatch =  useDispatch()
useEffect(() => {

 currentuser().then((userData)=>{ 
        if(userData)
        dispatch(login({userData}))
      else
        dispatch(logout())
      })
    .finally(() => setLoading(false))
}, [])


return !loading?  (
  <div className='min-h-screen flex  items-center justify-center bg-gray-400'>
    <div className=''>
      <Header />
      <main>
      todo: <Outlet />
      </main>
      <Footer />
    </div>
  </div>
):(
  <div className='flex items-center justify-center h-screen'>
  <h1>Loading</h1>
  </div>
)

    }
export default App
