import { useContext, useState } from 'react'
import Select from 'react-select'
import { HttpContext } from '../contexts/httpContext';
import * as authService from '../services/authService'

export function Request() {

    const actions = [
        { value: 'register', label: 'Register' },
        { value: 'login', label: 'Login' },
        { value: 'profile', label: 'Profile' },
        { value: 'logout', label: 'Logout' }
    ];

    let [actionState, setActionState] = useState(actions);
    let [paramState, setParamState] = useState();
    let { setResponse } = useContext(HttpContext);

    const bodyParams = {
        register: [
            { value: 'email', label: 'Email' },
            { value: 'username', label: 'Username' },
            { value: 'password', label: 'Password' },
            { value: 'repeatPassword', label: 'RepeatPassword' }
        ],
        login: [
            { value: 'username', label: 'Username' },
            { value: 'password', label: 'Password' }
        ],
    };

    function sendRequest(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let data;

        if (bodyParams[paramState]) {
            data = bodyParams[paramState].reduce((acc, curr) => {
                let key = curr.value;
                acc[key] = formData.get(curr.value);
                return acc;
            }, {});
        }
        
        authService[paramState](data).then(res => {
            setResponse(res);
        });
    };

    function getAction(e) {
        setParamState(e.value);
    }

    return (
        <div className="request">
            <form onSubmit={sendRequest}>
                <div className="action">
                    <label>Action</label>
                    <Select onChange={getAction} options={actionState} />
                </div>
                <div className="params">
                    {/* <div>No Params</div> */}
                    {bodyParams[paramState]?.map((param) => (
                        <div className="param" key={param.value}>
                            <label>{param.label}</label>
                            <input name={param.value} />
                        </div>
                    ))}
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}