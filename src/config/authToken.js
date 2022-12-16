import axiosClient from "./axios";

const tokenAuth = token => {
    if(token) {
        axiosClient.defaults.headers.common['Authorization'] =  `Token ${token}`;
    }else{
        delete axiosClient.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;