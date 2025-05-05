import { Analytic } from "@/types/Analytics.type"
import axios from "axios"


export const signInWithEmailPassword = async (email: string, password: string) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_SHORTD_SERVICE}/user/login`, JSON.stringify({
            email,
            password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}

export const signUpWithEmailPassword = async (email: string, password: string) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_SHORTD_SERVICE}/user/signup`, JSON.stringify({
            email,
            password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}

export const getUserDetails = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_SHORTD_SERVICE}/user/details`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}


export const shortenUrl = async (url: string) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_SHORTD_SERVICE}/create`, JSON.stringify({
            url
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}

export const getAllShortd = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_SHORTD_SERVICE}/myshortd`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}


export const deleteShortd = async (sid: string) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_SHORTD_SERVICE}/delete/${sid}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}

export const getAnalytics = async (sid: string) : Promise<Analytic> => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_SHORTD_SERVICE}/analyze/${sid}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return data
    } catch (error: any) {
        let msg = error?.response?.data?.message
        throw new Error(msg || "Something went wrong")
    }
}
