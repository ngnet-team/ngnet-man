import { useContext, useEffect } from "react"
import { HttpContext } from "../contexts/httpContext";
import { AuthContext } from "../contexts/authContext";
import * as authService from '../services/authService'


export function Response() {

    let { responseState } = useContext(HttpContext);
    let { updateUser } = useContext(AuthContext);

    if (responseState?.token) {
        authService.setToken(responseState.token);
    }

    let hasResponse;
    if (responseState) {
        hasResponse = Object.values(responseState)?.length > 0;
    }

    useEffect(() => {
        updateUser();
    }, [hasResponse]);


    return (
        <div>
            <div>{hasResponse
                ? <div className="response">
                    {Object.entries(responseState).map(([key, value], index) => (
                        <div key={index}>{key}: {typeof value == String ? value : 'obj'}</div>
                    ))}
                </div>
                : <div className="response">No Response</div>}
            </div>
        </div>
    )
}