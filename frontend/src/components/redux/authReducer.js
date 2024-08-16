import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASEURL = import.meta.env.VITE_BACKEND_URL;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:"",
    allUsers:[],
    onlineUsers:[],
    loadingLogin: false,
    loadingReg: false,
    loadingLogout: false,
  },
  reducers: {
    loginStart(state) {
      state.loadingLogin = true;
      
    },
    loginFailure(state){
      state.loadingLogin=false;
    },
    registerStart(state) {
      state.loadingReg = true;
    },
    registerSuccess(state) {
      state.loadingReg = false;
    },
    registerFailure(state){
      state.loadingReg=false;
    },
    updatedUser(state, action) {
      state.user = action.payload
    },
    logoutUser(state){
      state.user = ""
    },
    setOnlineUser(state,action){
      state.onlineUsers = action.payload
    },
    setAllUsers(state, action){
      state.allUsers = action.payload
    }
  },
});
export const {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  updatedUser,
  registerFailure,
  loginFailure,
  logoutUser,
  setOnlineUser,
  setAllUsers
} = authSlice.actions;
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASEURL}/users/login`, credentials, {
      withCredentials: true,
    });

    dispatch(updatedUser(res.data.data));
    window.localStorage.setItem("token", res.data.token);

    return { success: true };
  } catch (error) {
    const err = error?.response?.data?.message? error.response.data.message : error.message;
      dispatch(loginFailure())
    return { success: false, error: err };
  }
};

export const registerUser = (credentails) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${BASEURL}/users/register`, credentails, {
      withCredentials: true,
    });

  dispatch(updatedUser(res.data.data));
  window.localStorage.setItem("token", res.data.token);
    return { success: true };
  } catch (error) {
    const err = error?.response?.data?.message? error.response.data.message : error.message;
      dispatch(registerFailure())
    return { success: false, error: err };
  }
};

export const updateUser = (credentails) => async (dispatch) => {
  
  try {
    const res = await axios.post(
      `${BASEURL}/users/updateMe`,
      credentails,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(updatedUser(res.data.data));
    
    return {success:true}
  } catch (error) {
    
    const err = error?.response?.data?.message ? error.response.data.message : error.message;

    return { success: false, error: err };
  }
};
export const fetchUser = () => async (dispatch) => {
  
  try {
    const res = await axios.get(
      `${BASEURL}/users/me`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(updatedUser(res.data.user));
    return {success:true}
  } catch (error) {
    
    const err = error?.response?.data?.message ? error.response.data.message : error.message;

    return { success: false, error: err };
  }
};

export const fetchAll = ()=>async(dispatch)=>{
  const token = window.localStorage.getItem("token");
  try{
    const response = await axios.get(`${BASEURL}/users/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    dispatch(setAllUsers(response.data.users));
    return { success: true};
  }catch(error){
    const err = error?.response?.data?.message
    ? error.response.data.message
    : error.message;
  return { success: false, error: err };
  }
}


export default authSlice.reducer;
