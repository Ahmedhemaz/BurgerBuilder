import React, { Component } from 'react';
import createFormField from '../../components/UI/Form/CreateFormField';
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import formInputChangeHandler from '../../components/UI/Form/FormInputChangeHandler';
import classes from './Auth.module.css';
class Auth extends Component {
    state = {
        loginForm: {
            email: createFormField('input', { placeholder: 'Your E-Mail', type: 'email' }, { required: true, isEmail: true }),
            password: createFormField('input', { placeholder: 'Your Password', type: 'password' }, { required: true, min: 8 }),
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const { updatedForm, formIsValid } = formInputChangeHandler(this.state.loginForm, event, inputIdentifier);
        this.setState({ loginForm: updatedForm, formIsValid })
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
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
            <Button disabled={!this.state.formIsValid} btnType="Success">Login</Button>
        </form>)

        return (
            <div className={classes.AuthData}>
                {form}
            </div>
        )
    }
}

export default Auth;