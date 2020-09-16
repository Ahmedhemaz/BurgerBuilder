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

class BurgerBuilder extends Component {

    state = {
        totalPrice: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // Promise.all([
        //     axios.get('https://my-react-burger-2e14e.firebaseio.com/ingredients.json'),
        //     axios.get('https://my-react-burger-2e14e.firebaseio.com/totalPrice.json')])
        //     .then(values => {
        //         this.setState({ ingredients: values[0].data, totalPrice: values[1].data })
        //     })
        //     .catch(() => this.setState({ error: true }));

    }

    // addIngredientsHandler(type) {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = newCount;
    //     const oldTotalPrice = this.state.totalPrice;
    //     const newTotalPrice = oldTotalPrice + INGREDIENTS_PRICING[type];
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    // }

    // removeIngredientHandler(type) {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount === 0) return;
    //     const newCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = newCount;
    //     const oldTotalPrice = this.state.totalPrice;
    //     const newTotalPrice = oldTotalPrice - INGREDIENTS_PRICING[type];
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    // }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler() {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler() {
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(`${i}`) + '=' + encodeURIComponent(this.props.ingredients[i]))
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    render() {
        const disableRemoveIngredientsInfo = { ...this.props.ingredients };
        let burger = null;
        let orderSummary = null
        if (!this.props.ingredients) burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <AddIngredientContext.Provider value={{
                        addIngredients: this.props.onAddIngredient,
                        removeIngredients: this.props.onRemoveIngredient,
                        disableRemoveIngredientsInfo: disableRemoveIngredientsInfo
                    }}>
                        <BuildControls
                            totalPrice={this.props.totalPrice}
                            ordered={() => this.purchaseHandler()}
                        />
                    </AddIngredientContext.Provider>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} />;
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

const mapStoreStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName } }),
        onRemoveIngredient: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName } }),
    }
}

export default connect(mapStoreStateToProps, mapStoreDispatchToProps)(withErrorHandler(BurgerBuilder, axios));