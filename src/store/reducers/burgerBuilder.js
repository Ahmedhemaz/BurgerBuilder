import * as actionTypes from '../actions';
const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 1
    },
    totalPrice: 1.5
}

const INGREDIENTS_PRICING = {
    salad: 0.5,
    meat: 1.5,
    bacon: .7,
    cheese: 0.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

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