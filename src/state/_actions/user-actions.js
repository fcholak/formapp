import { useRecoilState, useResetRecoilState, useSetRecoilState  } from "recoil";

import { history, useFetchWrapper } from '../_helpers';
import { authAtom, usersAtom, usersAtom } from '../_state';

function useUserActions(){
    const baseUrl = `${process.env.REACT_APP_API_ULR}/users`;
    
    const setAuth = useSetRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);

    return {
        login,
        logout,
        getAll
    }
}
    function login(username, password){ 
        return fetchWrapper.post(`${baseUrl}/authenticate`,{username, password})
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    setAuth(user);

                    const { from } = history.location.state || { from: { pathname: '/'}};
                    history.push(from);
                });
            }

    function logout(){
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setUsers);
    }