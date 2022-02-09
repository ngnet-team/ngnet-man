import { useContext, useEffect } from "react"
import { HttpContext } from "../contexts/httpContext";
import { AuthContext } from "../contexts/authContext";
import JSONPretty from 'react-json-pretty';


export function Response() {

    let { responseState } = useContext(HttpContext);
    let { updateUser } = useContext(AuthContext);

    useEffect(() => {
        updateUser();
    }, [responseState]);

    return (
        <div>
            <div>{responseState
                ? <div className="response">
                    <JSONPretty id="json-pretty" data={responseState}></JSONPretty>
                </div>
                : <div className="response">No Response</div>}
            </div>
        </div>
    )
}