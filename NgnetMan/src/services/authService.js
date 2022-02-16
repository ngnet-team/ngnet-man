import Cookies from 'js-cookie'

const apiKey = "FC14A488-0C65-4052-BA99-FAC18291B5FC";
const cookieKey = "NgNet.authorization.token";
const url = 'http://localhost:7000/';

export const sendAjax = async(method, action, data) => {
    const token = Cookies.get(cookieKey);

    try {
        let res = await fetch(`${url}${parseToken().role}/${action}`, {
            method: `${method}`,
            headers: {
                'content-type': 'application/json',
                'authorization': token ? 'Bearer ' + token : '',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(data)
        });

        let result = await res.json();

        if (action === 'logout' && res.ok) {
            Cookies.remove(cookieKey);
        }

        return result;
    } catch (error) {
        //attach error
    }
}

export const setToken = (token) => {
    Cookies.set(cookieKey, token);
}

export const getUser = () => parseToken();

function parseToken() {
    const token = Cookies.get(cookieKey);
    let user = { role: 'auth' };

    if (!token) {
        return user;
    }

    try {
        const parsedToken = JSON.parse(atob(token.split('.')[1]));
        return { 
          userId: parsedToken.nameid, 
          username: parsedToken.unique_name, 
          role: parsedToken.role.toLowerCase(), 
        }
    } catch (error) {
        return user;
    }
}