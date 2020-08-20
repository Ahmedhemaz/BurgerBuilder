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
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 0,
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

    removeIngredientHandler(type) {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) return;
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENTS_PRICING[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
    }

    render(){
        const disableRemoveIngredientsInfo = {...this.state.ingredients};
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <AddIngredientContext.Provider value = {{
                    addIngredients: (type)=> this.addIngredientsHandler(type),
                    removeIngredients: (type)=> this.removeIngredientHandler(type),
                    disableRemoveIngredientsInfo: disableRemoveIngredientsInfo}}>
                    <BuildControls totalPrice = {this.state.totalPrice}/>
                </AddIngredientContext.Provider>
            </Aux>
        )
    }
}

export default BurgerBuilder;