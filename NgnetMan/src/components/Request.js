import { useContext, useState } from 'react'
import Select from 'react-select'
import { HttpContext } from '../contexts/httpContext';
import * as authService from '../services/authService'
import common from '../common/common.json'

export function Request() {

    const actions = common.actions;
    const bodyParams = common.params;

    let [action, setAction] = useState();
    let { setResponse } = useContext(HttpContext);

    function sendRequest(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let data;

        if (common.params[action]) {
            data = common.params[action].reduce((acc, curr) => {
                let key = curr.value;
                acc[key] = formData.get(curr.value);
                return acc;
            }, {});
        }

        authService[action](data).then(res => {
            setResponse(res);
        });
    };

    function getAction(e) {
        setAction(e.value);
    }

    return (
        <div className="request">
            <form onSubmit={sendRequest}>
                <div className="action">
                    <label>Action</label>
                    <Select onChange={getAction} options={common.actions} />
                </div>
                <div className="params">
                    {/* <div>No Params</div> */}
                    {common.params[action]?.map((param) => (
                        <div className="param" key={param.value}>
                            <label>{param.label}</label>
                            <input type={param.value === 'age' ? 'number' : 'text' } name={param.value} />
                        </div>
                    ))}
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}