import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const BASEURL = `http://127.0.0.1:5000/api/v1`;

const loginSlice = createSlice({
    name:'login',
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:null,
        error:null,
        title:null
    },
    reducers:{
        loginStart(state){
            state.loading=true
        },
        loginSuccess(state, action){
            state.loading=false,
            state.isAuthenticated = true,
            state.user=action.payload.user
        },
        loginFailure(state, action){
            state.loading = false,
            state.error = action.payload
        }
    }
})
export const {loginStart, loginFailure, loginSuccess} = loginSlice.actions;
export const loginUser = (credentials) => async (dispatch)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post(`${BASEURL}/users/login`, credentials);
        dispatch(loginSuccess(res.data));
        console.log(res);
    } catch(error){
        console.log(error)
        console.log(error.response.data.message)
        dispatch(loginFailure(error.response.data.message));
    }
}

export default loginSlice.reducer;