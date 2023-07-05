import api from "../http"
import axios, {AxiosError} from "axios";
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/authResponse"

import { Error } from "../models/authResponse";
import {userSlice} from "../store/reducers/userSlise";
import { AppDispatch } from "../store/store";

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch): Promise<AxiosResponse<AuthResponse> | null> => {
    try {
        dispatch(userSlice.actions.setLoading(true))
        const response = await api.post<AuthResponse>('/user/login', {email, password})
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(userSlice.actions.loginSuccess(response?.data))
        return response
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const err: Error={
                status: 0,
                message: "",
            } 
            if (e.response?.status !== undefined && e.response.data) {
                err.status = e.response.status
                err.message = e.response.data.message
            }
            dispatch(userSlice.actions.setError(err))
        }
        return null
    }
}

export const registerUser = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/user/register', {email, password})
}

export const logoutUser = () => async (dispatch: AppDispatch): Promise<AxiosResponse<AuthResponse>> => {
    dispatch(userSlice.actions.setLoading(true))
    const response = await api.get('/user/logout')
    dispatch(userSlice.actions.logoutSuccess(null))
    return response
}

export const checkAuth = () => async (dispatch: AppDispatch): Promise<AxiosResponse<AuthResponse> | null>  => {
    try {
        const response = await api.get('/user/refresh', {withCredentials: true})
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(userSlice.actions.loginSuccess(response?.data))
        return response
    } catch(e) {
        if (axios.isAxiosError(e)) {
            console.log(e.message);
        }       
        return null
    }
}