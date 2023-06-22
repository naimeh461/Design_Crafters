import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://design-crafters-server.vercel.app',
});
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

      // axios get the token and send request
      axiosSecure.interceptors.request.use((request) => {
        const token = localStorage.getItem('access-token');
        if(token){
          request.headers.Authorization = `Bearer ${token}`
        }
        return request;
      })

      //it token is value the get the response
      axiosSecure.interceptors.response.use((response) => response,
      async (error) => {
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
      )


    },[logOut, navigate])
    return [axiosSecure];
};

export default useAxiosSecure;