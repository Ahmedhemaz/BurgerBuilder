import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state) => {
    return updateObject(state, { loading: true, error: null });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
        loading: false
    });
}

const authFailure = (state, action) => {
    return updateObject(state, { loading: false, error: action.payload.error.message });
}

const signUpStart = (state) => {
    return updateObject(state, { loading: true, error: null });
}

const signUpSuccess = (state, action) => {
    return updateObject(state, {
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
        loading: false
    });
}

const signUpFailure = (state, action) => {
    return updateObject(state, { loading: false, error: action.payload.error.message });
}

const logout = (state) => {
    return updateObject(state, { token: null, userId: null, loading: false, error: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILURE: return authFailure(state, action);
        case actionTypes.SIGNUP_START: return signUpStart(state);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state, action);
        case actionTypes.SIGNUP_FAILURE: return signUpFailure(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state);
        default: return state
    }
}
export default reducer;