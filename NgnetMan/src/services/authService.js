import Cookies from 'js-cookie'

const cookieKey = "NgNet.authorization.token";
const url = 'http://localhost:7000/';


export const register = async (data) => {
    try {
        let res = await fetch(`${url}${parseToken().role}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let result = await res.json();
        if (res.ok) {
            //attach result
        }
        return result;
    } catch (error) {
        //attach error
    }

}

export const login = async (data) => {
    try {
        let res = await fetch(`${url}${parseToken().role}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let result = await res.json();

        if (res.ok && res.token) {
            //attach result
        }
        return result;
    } catch (error) {
        console.log(error)
    }

}

export const profile = async () => {
    try {
        let res = await fetch(`${url}${parseToken().role}/profile`, {
            method: 'GET',
            // credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Cookies.get(cookieKey),
            }
        });

        let result = await res.json();

        if (res.ok) {
            //attach result
        }
        return result;
    } catch (error) {
        //attach error
    }
}

export const logout = async () => {
    try {
        let res = await fetch(`${url}${parseToken().role}/logout`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + Cookies.get(cookieKey),
            }
        });

        let data = await res.json();
        
        if (res.ok) {
            Cookies.remove(cookieKey);
        }
        return data;
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