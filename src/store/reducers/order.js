import * as actionTypes from '../actions/actionTypes';
const initialState = {
    orders: [],
    loading: false,
    error: false,
    errorMsg: null,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(action.payload)
            }
        case actionTypes.FETCH_ORDERS:
            return { ...state, loading: true }
        case actionTypes.LOAD_ORDERS:
            const fetchedOrders = [];
            for (let key in action.payload.response) {
                fetchedOrders.push({
                    ...action.payload.response[key],
                    id: key
                });
            }
            return {
                ...state,
                orders: [...fetchedOrders],
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        default:
            return { ...state }
    }
}

export default reducer;