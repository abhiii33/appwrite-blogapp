import React from 'react'
import {useDispatch} from 'react-redux'

import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
      authService.logout()
        .then(()=>dispatch(logout()))
    }
  return (
    <>
    <div>LogoutBtn</div>
    <button onClick={logoutHandler} className='bg-red-500 text-white px-4 py-2 rounded-md'>Logout</button>
    </>
  )
}

export default LogoutBtn