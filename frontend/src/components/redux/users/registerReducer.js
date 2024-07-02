import {createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASEURL = `http://127.0.0.1:5000/api/v1`

const registerSlice = createSlice({
    name:'register',
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:null,
        error:null
    },
    reducers:{
        registerStart(state){
            state.loading = true
        },
        registerSuccess(state, action){
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload
        },
        registerFailure(state, action){
            state.loading = false,
            state.error = action.payload
        }
    }
})

export const {registerStart, registerFailure, registerSuccess} = registerSlice.actions;

export const registerUser = (credentails) => async(dispatch)=>{
    dispatch(registerStart());
    try{
        const response = await axios.post(`${BASEURL}/users/register`, credentails);
        console.log(response);
        dispatch(registerSuccess(response.data.data.user));
    } catch(error){
       
        dispatch(registerFailure(error.response.data.message));
     
    }
}

export default registerSlice.reducer;