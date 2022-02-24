import { useContext, useState } from 'react'
import Select from 'react-select'
import { HttpContext } from '../contexts/httpContext';
import * as authService from '../services/authService'
import common from '../common/common.json'

export function Request() {

    const actions = common.actions.filter(x => authService.permissions(x.role));
    const params = common.params;

    let [action, setAction] = useState();
    let { setResponse } = useContext(HttpContext);

    function sendRequest(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let data;

        if (params[action]) {
            data = params[action].reduce((acc, curr) => {
                let key;
                let value;

                if (Array.isArray(curr.value)) {
                    let nasted = {};
                    for (let i = 0; i < curr.value.length; i++) {
                        nasted[curr.value[i].value] = formData.get(curr.value[i].value);
                    }

                    key = curr.label;
                    value = nasted;
                }
                else {
                    key = curr.value;
                    value = formData.get(curr.value);
                }

                acc[key] = value ? value : null;
                return acc;
            }, {});
        }

        const method = actions.find(x => x.value === action)?.method;
        if (!method) { return; }

        authService.sendAjax(method, action, data).then(res => {
            if (res?.token) {
                authService.setToken(res.token);
            }// TODO: must be set from server
            setResponse(res);
        });
    };

    function getAction(e) {
        setAction(e.currentTarget.value);
    }

    function toggleHandler(param) {
        let isDisplayed = param.currentTarget.parentNode.children[2].classList.contains('display')

        if (isDisplayed) {
            param.currentTarget.parentNode.children[2].classList.remove('display');
        }
        else {
            param.currentTarget.parentNode.children[2].classList.add('display')
        }
    }

    return (
        <div className="request">
            <form onSubmit={sendRequest}>
                <div className="pairs">
                    <label>Action</label>
                    <select onChange={getAction}>
                        {
                            actions.map(x => (
                                <option key={x.value} value={x.value}>{x.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="params">
                    {/* <div>No Params</div> */}
                    {params[action]?.map((param, index) => (
                        <div className="pairs" key={index}>
                            <label>{param.label}</label>
                            {
                                Array.isArray(param.value)
                                    ? <>
                                        <span className='expandNastedPlus' onClick={toggleHandler}>+</span>
                                        <div className='display'>
                                            {param.value.map((nasted, index) => (
                                                <div key={index} className="nasted-param">
                                                    <label>{nasted.label}</label>
                                                    <input type='text' className='nasted-input' name={nasted.value} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                    : <input name={param.value} />
                            }
                        </div>
                    ))}
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}