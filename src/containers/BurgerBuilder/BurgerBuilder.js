import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import AddIngredientContext from '../../context/addIngredient-context';
import BackDropContext from '../../context/backDrop-context';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasing:false,
        loading: false
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

    purchaseHandler() {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler() {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler() {
        // alert('GO TO VALHALA');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ahmed',
                address: {
                    street: 'VALHALA',
                    zipCode: '53425',
                    country: 'el samala7at'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({loading:false, purchasing: false}))
            .catch(error => this.setState({loading: false, purchasing: false}));
    }

    render(){
        const disableRemoveIngredientsInfo = {...this.state.ingredients};
        let orderSummary = <OrderSummary ingredients = {this.state.ingredients} totalPrice = {this.state.totalPrice}/>;
        if(this.state.loading) orderSummary = <Spinner/>
        return (
            <Aux>
                { /**display modal on Order now click */
                 this.state.purchasing?
                 <BackDropContext.Provider value = {{
                     close: ()=> this.purchaseCancelHandler(),
                     continue: ()=> this.purchaseContinueHandler()}}>
                    <Modal show = {this.state.purchasing}>
                       {orderSummary}
                    </Modal>
                 </BackDropContext.Provider>
                  : null 
                }
                <Burger ingredients={this.state.ingredients} />
                <AddIngredientContext.Provider value = {{
                    addIngredients: (type)=> this.addIngredientsHandler(type),
                    removeIngredients: (type)=> this.removeIngredientHandler(type),
                    disableRemoveIngredientsInfo: disableRemoveIngredientsInfo}}>
                    <BuildControls 
                        totalPrice = {this.state.totalPrice}
                        ordered = {()=> this.purchaseHandler()}
                    />
                </AddIngredientContext.Provider>
            </Aux>
        )
    }
}

export default BurgerBuilder;