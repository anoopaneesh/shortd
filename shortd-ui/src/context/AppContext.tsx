import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IAppContext, User } from "../types";
import { getUserDetails, signInWithEmailPassword, signUpWithEmailPassword } from "@/services/shortdService";


const AppContext = createContext({} as IAppContext)
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const fetchUserData = async () => {
        try {
            setLoading(true)
            const user = await getUserDetails()
            setUser(user)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true)
            const data = await signInWithEmailPassword(email, password)
            localStorage.setItem(ACCESS_TOKEN, data.access_token)
            localStorage.setItem(REFRESH_TOKEN, data.refresh_token)
            await fetchUserData()
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true)
            const data = await signUpWithEmailPassword(email, password)
            localStorage.setItem(ACCESS_TOKEN, data.access_token)
            localStorage.setItem(REFRESH_TOKEN, data.refresh_token)
            await fetchUserData()
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const updateCredits = (n: number) => {
        setUser((user) => {
            if (user != null) {
                const newUser = { ...user }
                newUser.credits += n
                return newUser;
            }
            return null;
        })
    }
    const signOut = () => {
        setUser(null)
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)

    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return <AppContext.Provider value={{ loading, user, signIn, signUp, updateCredits, signOut }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider

export const useAppData = () => useContext(AppContext)