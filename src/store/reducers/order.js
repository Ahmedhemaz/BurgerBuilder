import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    orders: [],
    loading: false,
    error: false,
    errorMsg: null,
    purchased: false
}
const purchaseSuccessState = (state, action) => {
    return {
        loading: false,
        purchased: true,
        orders: state.orders.concat(action.payload)
    }
}

const fetchedOrdersState = (action) => {
    const fetchedOrders = [];
    for (let key in action.payload.response) {
        fetchedOrders.push({
            ...action.payload.response[key],
            id: key
        });
    }
    return {
        orders: [...fetchedOrders],
        loading: false
    }
}

const fetchOrderFailureState = (action) => {
    return {
        loading: false,
        error: true,
        errorMsg: action.payload.response
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return updateObject(state, { purchased: false })
        case actionTypes.PURCHASE_BURGER_START: return updateObject(state, { loading: true })
        case actionTypes.PURCHASE_BURGER_SUCCESS: return updateObject(state, purchaseSuccessState(state, action))
        case actionTypes.FETCH_ORDERS: return updateObject(state, { loading: true })
        case actionTypes.LOAD_ORDERS: return updateObject(state, fetchedOrdersState(action))
        case actionTypes.FETCH_ORDERS_FAILURE: return updateObject(state, fetchOrderFailureState(action))
        default: return { ...state }
    }
}

export default reducer;