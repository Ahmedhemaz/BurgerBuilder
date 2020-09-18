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
import * as actionsCreator from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
        this.props.onInitTotalPrice();
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler() {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler() {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disableRemoveIngredientsInfo = { ...this.props.ingredients };
        let burger = null;
        let orderSummary = null
        if (!this.props.ingredients) burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />
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
        if (this.props.loading) orderSummary = <Spinner />
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
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.burgerBuilder.loading,
        error: state.burgerBuilder.error
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionsCreator.initIngredients()),
        onInitTotalPrice: () => dispatch(actionsCreator.initTotalPrice()),
        onAddIngredient: (ingredientName) => dispatch(actionsCreator.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actionsCreator.removeIngredient(ingredientName)),
        onPurchaseInit: () => dispatch(actionsCreator.purchaseBurgerInit())
    }
}

export default connect(mapStoreStateToProps, mapStoreDispatchToProps)(withErrorHandler(BurgerBuilder, axios));