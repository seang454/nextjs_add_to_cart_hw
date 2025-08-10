

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setAccessToken } from "../features/authKeycloakSlice";

//proxy baseQuery handler 
//proxy is a middleware that allows us to handle requests through a proxy server
//this is useful for handling authentication and other tasks that require a server-side component   

//proxy baseQuery handler 
const proxyBaseQuery = fetchBaseQuery({
    baseUrl: 'api/proxy',
    prepareHeaders: (headers,{getState}) =>{
        const token = (getState() as RootState).auth.token;
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers; 
    }
})

// args: for the request details // api: for Redux api object // extraOptions: for additional
//baseQueryWithReAuth is a function that wraps the proxyBaseQuery to handle re-authentication
//if the request returns a 401 or 403 error, it will try to re-auth
//if the re-authentication is successful, it will retry the original request with the new token
//if the re-authentication fails, it will log the user out
//this is useful for handling authentication and other tasks that require a server-side component

// args: for the request details // api: for Redux api object // extraOptions: for additional
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    // check result of each query. if it's a 401, we'll try to re-authenticate
    let result = await proxyBaseQuery(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
        const res = await fetch("http://localhost:3000/api/refresh", {
            method: "GET",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            console.log("The data from refresh: ", data)
            api.dispatch(setAccessToken(data.accessToken));
            // re-run the query with the new token
            result = await proxyBaseQuery(args, api, extraOptions);
        } else {
            const res = await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
        } }  return result
    };


export const authKeycloakApi = createApi({
    reducerPath: "authKeycloakApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Cars'],
    endpoints: () => ({})
})
