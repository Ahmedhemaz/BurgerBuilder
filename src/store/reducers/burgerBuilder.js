import * as actionTypes from '../actions/actionTypes';
const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    loading: true
}

const INGREDIENTS_PRICING = {
    salad: 0.5,
    meat: 1.5,
    bacon: .7,
    cheese: 0.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.response,
                loading: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                error: true,
                loading: false
            }

        case actionTypes.SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload.response,
                loading: false
            }

        case actionTypes.FETCH_TOTAL_PRICE_FAILURE:
            return {
                ...state,
                error: true,
                loading: false
            }

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.payload.ingredientName]
            }

        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.payload.ingredientName] === 0) return state;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICING[action.payload.ingredientName]
            }

        default:
            return state;
    }
}

export default reducer;