import { createSlice } from "@reduxjs/toolkit";
import tokenAuth from "../config/authToken";

const dataUser = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
    authenticated: token ? true : false,
    isLoading: false,
    user: dataUser ? JSON.parse(dataUser) : "",
    token: token ? token : "",
    error: false,
    message: "",
    successRegister: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },

        setSuccessRegister: (state) => {
            state.successRegister = true;
        },
        setLoginFailed: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.message = action.payload.messageError;
        },
        setAuthUser: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.message = "";
            state.authenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;

            // Pasar al LocalStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));

            //Update Token
            tokenAuth(action.payload.token);
        },
        logout: (state) => {
            state.isLoading = false;
            state.authenticated = false;
            state.error = false;
            state.message = ""
            state.user = ""
            state.token = ""

            // Eliminar datos de LocalStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

    }
})

export const { 
    startLoading,
    setSuccessRegister,
    setLoginFailed,
    setAuthUser,
    logout
 } = userSlice.actions;