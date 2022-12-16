import axiosClient from "../config/axios";
import { startLoading, setSuccessRegister, setLoginFailed, setAuthUser } from "./userSlice";


export const login = data => {
    return async(dispatch, getState) => {
        dispatch( startLoading() );

        try {
            const response = await axiosClient.post('/api/user/login/', data);
            dispatch( setAuthUser({ user: response.data.user, token: response.data.token }) )
        } catch (error) {
            const msgError = error.response.data.error[0];
            dispatch( setLoginFailed({ messageError: msgError }) );
        }
    }
}