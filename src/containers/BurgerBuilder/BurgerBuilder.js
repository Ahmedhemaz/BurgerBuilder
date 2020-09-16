import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import AddIngredientContext from '../../context/addIngredient-context';
import BackDropContext from '../../context/backDrop-context';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENTS_PRICING = {
    salad: 0.5,
    meat: 1.5,
    bacon: .7,
    cheese: 0.5
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        Promise.all([
            axios.get('https://my-react-burger-2e14e.firebaseio.com/ingredients.json'),
            axios.get('https://my-react-burger-2e14e.firebaseio.com/totalPrice.json')])
            .then(values => {
                this.setState({ ingredients: values[0].data, totalPrice: values[1].data })
            })
            .catch(() => this.setState({ error: true }));

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
        this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    }

    removeIngredientHandler(type) {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENTS_PRICING[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler() {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler() {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(`${i}`) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableRemoveIngredientsInfo = { ...this.state.ingredients };
        let burger = null;
        let orderSummary = null
        if (!this.state.ingredients) burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <AddIngredientContext.Provider value={{
                        addIngredients: (type) => this.addIngredientsHandler(type),
                        removeIngredients: (type) => this.removeIngredientHandler(type),
                        disableRemoveIngredientsInfo: disableRemoveIngredientsInfo
                    }}>
                        <BuildControls
                            totalPrice={this.state.totalPrice}
                            ordered={() => this.purchaseHandler()}
                        />
                    </AddIngredientContext.Provider>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />;
        };
        if (this.state.loading) orderSummary = <Spinner />
        return (
            <Aux>
                { /**display modal on Order now click */
                    this.state.purchasing ?
                        <BackDropContext.Provider value={{
                            close: () => this.purchaseCancelHandler(),
                            continue: () => this.purchaseContinueHandler()
                        }}>
                            <Modal show={this.state.purchasing}>
                                {orderSummary}
                            </Modal>
                        </BackDropContext.Provider>
                        : null
                }
                {burger}

            </Aux>
        )
    }
}

mapStoreStateToProps = state => {
    return {
        burgerBuilder: state.burgerBuilder
    }
}

mapStoreDispatchToProps = dispatch => {
    return {
        addIngredient: () => dispatch({ type: actionTypes.ADD_INGREDIENT }),
        removeIngredient: () => dispatch({ type: actionTypes.REMOVE_INGREDIENT })
    }
}

export default connect()(withErrorHandler(BurgerBuilder, axios));