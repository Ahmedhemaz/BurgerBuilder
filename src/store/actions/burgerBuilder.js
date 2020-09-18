import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName }
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName }
    }
}

export const setIngredients = (payload) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload
    }
}

export const fetchIngredientsFailure = (payload) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILURE,
        payload
    }
}

export const setTotalPrice = (payload) => {
    return {
        type: actionTypes.SET_TOTAL_PRICE,
        payload
    }
}

export const fetchTotalPriceFailure = (payload) => {
    return {
        type: actionTypes.FETCH_TOTAL_PRICE_FAILURE,
        payload
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-react-burger-2e14e.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients({ response: response.data }))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailure({ response: error.message }))
            })
    }
}
export const initTotalPrice = () => {
    return dispatch => {
        axios.get('https://my-react-burger-2e14e.firebaseio.com/totalPrice.json')
            .then(response => {
                dispatch(setTotalPrice({ response: response.data }))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailure({ response: error.message }))
            })
    }
}