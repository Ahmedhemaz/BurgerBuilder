import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {


    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.props.ingredients}
                    cancelCalled={this.cancelHandler}
                    continueCalled={this.continueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStoreStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStoreStateToProps)(Checkout);