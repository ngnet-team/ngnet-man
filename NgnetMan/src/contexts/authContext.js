import { createContext, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const user = authService.getUser();

    const [authState, setAuthState] = useState(user);

    const updateUser = () => { 
        setAuthState(authService.getUser());
    }

    return (
        <AuthContext.Provider value={{ updateUser, authState }}>
            {children}
        </AuthContext.Provider>
    )
};