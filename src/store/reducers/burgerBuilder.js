import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    loading: true,
    building: false
}

const INGREDIENTS_PRICING = {
    salad: 0.5,
    meat: 1.5,
    bacon: .7,
    cheese: 0.5
}

const reorderFetchedIngredients = (action) => {
    return {
        salad: action.payload.response.salad,
        bacon: action.payload.response.bacon,
        cheese: action.payload.response.cheese,
        meat: action.payload.response.meat,
    }
}

const addIngredientUpdatedState = (state, action) => {
    const updatedIngredient = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICING[action.payload.ingredientName],
        building: true
    });
    return updatedState;
}

const removeIngredientUpdatedState = (state, action) => {
    if (state.ingredients[action.payload.ingredientName] === 0) return state;
    const updatedIngredient = { [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICING[action.payload.ingredientName],
        building: true
    });
    return updatedState;
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: return updateObject(state, { ingredients: reorderFetchedIngredients(action), loading: false, building: false })
        case actionTypes.FETCH_INGREDIENTS_FAILURE: return updateObject(state, { error: true, loading: false })
        case actionTypes.SET_TOTAL_PRICE: return updateObject(state, { totalPrice: action.payload.response, loading: false })
        case actionTypes.FETCH_TOTAL_PRICE_FAILURE: return updateObject(state, { error: true, loading: false })
        case actionTypes.ADD_INGREDIENT: return updateObject(state, addIngredientUpdatedState(state, action))
        case actionTypes.REMOVE_INGREDIENT: return updateObject(state, removeIngredientUpdatedState(state, action))
        default: return state;
    }
}

export default reducer;