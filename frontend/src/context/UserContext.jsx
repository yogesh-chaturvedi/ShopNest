import axios from "axios";
import { useEffect, createContext, useState } from "react";


export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const BASE_URL = import.meta.env.VITE_API_URL

    async function verifyUser() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/auth/verify`,
                withCredentials: true
            })
            const { success, message, error, User } = response.data

            if (success) {
                setUser(User)
            }

        }
        catch (error) {
            console.log("there is an error", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])


    const value = { verifyUser, user, setUser, loading, setLoading }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;