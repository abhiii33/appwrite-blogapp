import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice({
 name:"auth",
 initialState:{
     status:false,
     userData:null
 },
 reducers:{
     login:(state,action)=>{
        state.status=true
        state.userData = action.payload
     },
     logout:(state,action)=>{
     state.status = false
     state.userData = null
     }
 }
})

export default auth.reducer

export const {login , logout} = auth.actions