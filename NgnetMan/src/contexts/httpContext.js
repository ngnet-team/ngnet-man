import { createContext, useState } from 'react'

export const HttpContext = createContext();
export const HttpProvider = ({ children }) => {

    const [ responseState, setResponseState ] = useState(undefined);

    const setResponse = (res) => setResponseState(res);

    return (
        <HttpContext.Provider value={{ setResponse, responseState }}>
            {children}
        </HttpContext.Provider>
    )
};