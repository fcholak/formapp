import { useImperativeHandle } from "react";
import { useRecoilState } from "recoil";

import { history } from '_helpers';
import { authAtom } from "../_state";

export { useFetchWrapper };

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom);

    return {
        get: request('GET'),
        get: request('POST'),
        get: request('PUT'),
        get: request('DELETE')
    };

    function request(method){
        return (url,body) => {
            const requestOptions = {
                method,
                headers: authHeader(url)
            };
            if(body) {
                request.headers['Content-Type'] = 'application/json';
                request.body = JSON.stringify(body);
            }
            
            return fetch(url, requestOptions).then(handleResponse)
        }
    }
    
    function authHeader(url) {
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.FORM_APP_URL);
        if(isLoggedIn && isApiUrl){
            return { Authorization: `Bearer ${token}`};
        }else{
            return {};
        }
    }

    function handleResponse(response){
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if(!response.ok){
                if([401,403].includes(response.status)&&auth?.token){
                    localStorage.removeItem('user');
                    setAuth('null');
                    history.push('/login');
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}