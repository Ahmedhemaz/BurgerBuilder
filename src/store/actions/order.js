import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const loadOrders = (payload) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload
    }
}

export const fetchOrdersError = (payload) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        payload
    }
}

export const fetchOrders = () => {

    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
                dispatch(loadOrders({ response: response.data }))
            })
            .catch(error => dispatch(fetchOrdersError({ response: error })))
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurgerSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload
    }
}

export const purchaseBurgerFailure = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        payload
    }
}

export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', order)
            .then(response => {
                dispatch(purchaseBurgerSuccess({ id: response.data.name, order }))
            })
            .catch(error => dispatch(purchaseBurgerFailure({ response: error })));
    }
}
