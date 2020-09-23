import * as actionTypes from './actionTypes';
import { API_KEY } from '../../apiKey';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    }
}

export const authFailure = (payload) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        payload
    }
}
export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signUpSuccess = (payload) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        payload
    }
}

export const signUpFailure = (payload) => {
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}


export const signUp = (signUpData) => {
    return dispatch => {
        dispatch(signUpStart());
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, signUpData)
            .then(response => {
                dispatch(signUpSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(signUpFailure(error.response.data))
            })
    }
}

export const authenticate = (authData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData)
            .then(response => {
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFailure(error.response.data))
            })
    }
}

export const setAuthRedirectPath = (payload) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload
    }
}
