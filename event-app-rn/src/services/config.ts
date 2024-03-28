import axios from "axios";
import * as SecureStore from 'expo-secure-store'

export const BASE_URL = "http://localhost:1337/"
const TIME_OUT = 30000
export const TASKMATE_TOKEN_NAME = "taskmate_user_token"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key,value)
    } catch (error) {
        console.error("Error in saveToken:", error)
        throw error
    }
}

axiosInstance.interceptors.request.use(async (req) =>{
    try {
        const access_token = await SecureStore.getItemAsync(TASKMATE_TOKEN_NAME)
        if (access_token) {
            req.headers.Authorization = access_token
        }
        return req
    } catch (error){
        console.error("Error in request interceptor:", error)
        return req
    }
})

export const fetcher = async (url:string) => {
    try {
        const response = await axiosInstance.get(url)
        return response.data
    } catch (error) {
        console.error("Error in fetcher:", error)
        throw error
    }
}

export default axiosInstance
