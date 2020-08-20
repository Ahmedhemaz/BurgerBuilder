import React,{ Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import AddIngredientContext from '../../context/addIngredient-context';

const INGREDIENTS_PRICING = {
    salad: 0.5,
    meat: 1.5,
    bacon: .7,
    cheese: 0.5
}
class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2,
        },
        totalPrice: 1,
    }

    addIngredientsHandler(type) {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + INGREDIENTS_PRICING[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <AddIngredientContext.Provider value = {{addIngredients: (type)=> this.addIngredientsHandler(type)}}>
                    <BuildControls/>
                </AddIngredientContext.Provider>
            </Aux>
        )
    }
}

export default BurgerBuilder;