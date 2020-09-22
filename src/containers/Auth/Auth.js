import React, { Component } from 'react';
import createFormField from '../../components/UI/Form/CreateFormField';
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import formInputChangeHandler from '../../components/UI/Form/FormInputChangeHandler';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actionsCreator from '../../store/actions/index';
class Auth extends Component {
    state = {
        loginForm: {
            email: createFormField('input', { placeholder: 'Your E-Mail', type: 'email' }, { required: true, isEmail: true }),
            password: createFormField('input', { placeholder: 'Your Password', type: 'password' }, { required: true, min: 8 }),
        },
        signUp: true
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const { updatedForm, formIsValid } = formInputChangeHandler(this.state.loginForm, event, inputIdentifier);
        this.setState({ loginForm: updatedForm, formIsValid })
    }

    authHandler = (event) => {
        event.preventDefault();
        const authData = {
            email: this.state.loginForm.email.value,
            password: this.state.loginForm.password.value,
            returnSecureToken: true
        }
        if (this.state.signUp) {
            this.props.onSignUp(authData)
        } else {
            this.props.onAuth(authData);
        }
    }

    switchAuthBtnHandler = () => {
        this.setState({ signUp: !this.state.signUp });
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (<form onSubmit={this.authHandler}>
            {formElementsArray.map(formElement => <Input
                key={formElement.id}
                elementtype={formElement.config.elementtype}
                elementconfig={formElement.config.elementconfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.shouldValidate}
                touched={formElement.config.touched} />)}
            <Button disabled={!this.state.formIsValid} btnType="Success">{this.state.signUp ? 'SignUp' : 'SignIn'}</Button>
        </form>)

        return (
            <div className={classes.AuthData}>
                {form}
                <Button clicked={this.switchAuthBtnHandler} btnType="Danger">
                    SWITCH TO {this.state.signUp ? 'SignIn' : 'SignUp'}
                </Button>
            </div>
        )
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onAuth: (authData) => dispatch(actionsCreator.authenticate(authData)),
        onSignUp: (signUpData) => dispatch(actionsCreator.signUp(signUpData))
    }
}

export default connect(null, mapStoreDispatchToProps)(Auth);