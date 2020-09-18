import * as actionTypes from '../actions/actionTypes';
const initialState = {
    orders: [],
    loading: true,
    error: false,
    errorMsg: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
            console.log('HEREEEEEEEEEEEEEEEE');
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