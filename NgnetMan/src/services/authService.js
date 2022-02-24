import Cookies from 'js-cookie'

const apiKey = "FC14A488-0C65-4052-BA99-FAC18291B5FC";
const cookieKey = "NgNet.authorization.token";
const url = 'http://localhost:7000/';
const roles = [ 'owner', 'admin', 'member', 'user', 'guest', ];

export const sendAjax = async (method, action, data) => {
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

        let result;
        if (res.headers.get("content-type")) {
            result = await res.json();
        }

        if (action === 'logout' && res.ok) {
            Cookies.remove(cookieKey);
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const setToken = (token) => {
    Cookies.set(cookieKey, token);
}

export const getUser = () => parseToken();

function parseToken() {
    const token = Cookies.get(cookieKey);
    let user = { role: roles[roles.length - 1] };

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

export const permissions = (role) => {
    if (!role) { return false; }
    const requiredRights = roles.indexOf(role);
    if (requiredRights == -1) { return false; }

    const currUser = getUser();
    const hasRights = roles.indexOf(currUser?.role);
    if (hasRights == -1) { return false; }

    if (!currUser?.userId) { 
        return hasRights == requiredRights;
    }

    if(requiredRights == roles.indexOf(roles[roles.length - 1])) {
        return false;
    }

    return hasRights <= requiredRights;
}

// const getCookie = (key) => {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         let c = cookies[i].trim().split('=');
//         if (c[0] === key) {
//             return c[1];
//         }
//     }
//     return "";
// }