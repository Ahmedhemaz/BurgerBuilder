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

// async
export const fetchOrders = () => {

    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
                dispatch(loadOrders({ response: response.data }))
            })
            .catch(error => dispatch(fetchOrdersError({ response: error })))
    }
}

