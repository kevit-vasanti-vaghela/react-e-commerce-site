import { redirect } from "react-router-dom";


export function getAuthToken() {
    const auth = localStorage.getItem('auth');
    return auth;
}

export function tokenLoader() {
    return getAuthToken()
}

export function checkAuthLoader() {
    const auth = getAuthToken();

    if(!auth) {
        return redirect('/signup');
    }
}

