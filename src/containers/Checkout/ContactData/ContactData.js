import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';
import { withRouter } from 'react-router-dom';
import createFormField from '../../../components/UI/Form/CreateFormField';
import { connect } from 'react-redux';
import * as actionsCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import formInputChangeHandler from '../../../components/UI/Form/FormInputChangeHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: createFormField('input', { placeholder: 'Your Name', type: 'text' }, { required: true }),
            street: createFormField('input', { placeholder: 'Street', type: 'text' }, { required: true }),
            zipCode: createFormField('input', { placeholder: 'ZIP Code', type: 'text' }, { required: true }),
            country: createFormField('input', { placeholder: 'Country', type: 'text' }, { required: true }),
            email: createFormField('input', { placeholder: 'Your E-Mail', type: 'email' }, { required: true }),
            deliveryMethod: createFormField('select', {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            }, { required: true }, true, false, false, 'fastest'),
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let elementIdentifier in this.state.orderForm) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        this.props.onPurchaseBurger(order);
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const { updatedForm, formIsValid } = formInputChangeHandler(this.state.orderForm, event, inputIdentifier);
        this.setState({ orderForm: updatedForm, formIsValid })

    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => <Input
                key={formElement.id}
                elementtype={formElement.config.elementtype}
                elementconfig={formElement.config.elementconfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.shouldValidate}
                touched={formElement.config.touched} />)}
            <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
        </form>)
        if (this.props.orderLoading) form = <Spinner />;
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                { form}
            </div>
        )
    }
}


const mapStoreStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        orderLoading: state.ordersState.loading
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (order) => dispatch(actionsCreator.purchaseBurger(order))
    }
}

export default connect(mapStoreStateToProps, mapStoreDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));