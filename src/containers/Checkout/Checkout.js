import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summery = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summery = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummery
                        ingredients={this.props.ingredients}
                        cancelCalled={this.cancelHandler}
                        continueCalled={this.continueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </Fragment>
            )
        }
        return summery;
    }
}

const mapStoreStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.ordersState.purchased
    }
}


export default connect(mapStoreStateToProps)(Checkout);