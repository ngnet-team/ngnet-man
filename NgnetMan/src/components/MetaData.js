import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/authContext'

export function MetaData() {

    let { authState } = useContext(AuthContext);
    let isLogged = authState?.userId && authState?.username;

    useEffect(() => {
        isLogged = authState?.userId;
    }, [authState]);

    return (
        <div className="metadata">
            <div className='isLogged'>
                {isLogged
                    ? <div>
                        <div className='username'>Username: {authState?.username ? authState?.username : 'none'}</div>
                        <div className='role'>Role: {authState?.role ? authState?.role : 'none'}</div>
                    </div>
                    : <div>Guest</div>
                }
            </div>

        </div>
    )
}