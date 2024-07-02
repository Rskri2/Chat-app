import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./users/registerReducer";
import loginReducer from './users/loginReducer';
const store = configureStore({
    reducer:{
        register:registerReducer,
        login:loginReducer
    }
});

export default store;