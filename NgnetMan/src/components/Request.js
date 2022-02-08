import { useContext, useState } from 'react'
import Select from 'react-select'
import { HttpContext } from '../contexts/httpContext';
import * as authService from '../services/authService'
import common from '../common/common.json'

export function Request() {

    const actions = common.actions;
    const bodyParams = common.params;

    let [action, setAction] = useState();
    let [address, setAddress] = useState(undefined);
    let { setResponse } = useContext(HttpContext);

    function sendRequest(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let data;

        if (common.params[action]) {
            data = common.params[action].reduce((acc, curr) => {
                let key = curr.value;
                if (key == 'age') {
                    let value = formData.get(curr.value);
                    if (value === "") {
                        value = 0;
                    }
                    else {
                        value = parseInt(value);
                    }
                    acc[key] = value
                    return acc;
                }
                else if (key == 'address') {
                    acc[key] = formData.get(curr.value);
                    return acc;
                }

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

    function toggleAddressHandler(param) {
        if(param != undefined ){
           
                setAddress(
                    param.nasted?.map((param) => (
                        <>
                            <label>{param.label}</label>
                            <input type='text' className='nasted-input' name={param.value} />
                        </>
                    ))
                );
        }
        else {
            setAddress(undefined);
        }
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
                            {
                                param.value === 'address'
                                    ? <>
                                        <input type='text' onClick={toggleAddressHandler(param)}></input>
                                        {address}
                                    </>
                                    : <input type={param.value === 'age' ? 'number' : 'text'} name={param.value} />
                            }
                        </div>
                    ))}
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}