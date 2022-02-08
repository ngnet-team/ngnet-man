import { createContext, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState(authService.getUser());

    const updateUser = () => { 
        setAuthState(authService.getUser());
    }

    return (
        <AuthContext.Provider value={{ updateUser, authState }}>
            {children}
        </AuthContext.Provider>
    )
};