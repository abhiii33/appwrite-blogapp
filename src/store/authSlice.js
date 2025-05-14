import { createSlice } from "@reduxjs/toolkit";
 const auth = createSlice({
 name:"auth",
 initialState:{
     status:false,
     userData:null
 },
 reducers:{
     login:(state,action)=>{
        state.status=true
        state.userData = action.payload.userData
     },
     logout:(state)=>{
     state.status = false
     state.userData = null
     }
 }
})


export const {login , logout} = auth.actions

export default auth.reducer