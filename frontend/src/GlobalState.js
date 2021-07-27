import React,{createContext,useEffect,useState} from "react";
import ProductsAPI from "./API/ProductsAPI";
import UserAPI from "./API/UserAPI";
import axios from 'axios'
import CategoriesAPI from "./API/CategoriesAPI";

export const GlobalState = createContext()

export const DataProvider =({children})=>{
    const [token,setToken]=useState(false)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })
    useEffect(() => {
        const refreshToken = async () => {
            const res = axiosInstance.get('/user/refresh_token')
            setToken(res.data.accessToken)

            setTimeout(() => {
                refreshToken()
            }, 15000);
        }
        refreshToken()
    }, [axiosInstance]);

    const state={
        token:[token,setToken],
        productsAPI:ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI:CategoriesAPI()
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        
        </GlobalState.Provider>
    )
}