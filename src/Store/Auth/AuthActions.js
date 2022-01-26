import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../../Helpers/fecth";
import { types } from "../../Types";
import { eventActiveCleaning } from "../Calendar/EventActions";

export const startLogin = (email, password) => {
    return async ( dispatch ) => {
        const resp = await fetchWithoutToken( 'auth/login', { email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( 'auth/', { name, email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = ( user ) => ({
    type: types.AuthLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( eventActiveCleaning() );
        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.AuthLoguot
});

export const startChecking = () => {
    return async( dispatch ) => {
        const resp = await fetchWithToken( 'auth/reToken', 'POST' );
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        }
        else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.AuthCheckingFinish
});