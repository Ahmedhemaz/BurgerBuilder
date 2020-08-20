import React from 'react';

const addIngredientContext = React.createContext({
    addIngredients: ()=>{},
    removeIngredients: ()=>{},
    disableRemoveIngredientsInfo: {}
});

export default addIngredientContext;
