import { User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'

type UserContextType = {
    userInfo: User | null
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>
}

interface IAuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<UserContextType>({} as UserContextType)

const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [userInfo, setUserInfo] = useState<User | null>(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setUserInfo(user)
        })
    }, [])
    return <AuthContext.Provider value={{ userInfo, setUserInfo }}>{children}</AuthContext.Provider>
}

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext)
    if (typeof context === 'undefined') {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export default AuthProvider
