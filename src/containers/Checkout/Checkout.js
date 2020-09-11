import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            chesse: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            console.log(param);
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients });
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/cehckout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.state.ingredients}
                    cancelCalled={this.cancelHandler}
                    continueCalled={this.continueHandler}
                />
            </div>
        )
    }
}

export default Checkout;