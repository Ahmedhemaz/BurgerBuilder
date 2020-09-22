import isInputValid from './IsInputValid';

/**
 * 
 * @param {form from the state} form 
 * @param {*on change event of the input field} event 
 * @param {*key of the form input} inputIdentifier 
 */
const formInputChangeHandler = (form, event, inputIdentifier) => {
    /**
     * we need to change state with immutable way
     * 1- copy Form objects first level
     * 2- copy formElement object using inputIDentifier
     * 3- update formElement with target value
     * 4- set that updatedFromElement to updatedForm
     * 5- update Form state with setstate of updatedForm
     */
    const updatedForm = { ...form };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = isInputValid(updatedFormElement.validation, updatedFormElement.value);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let elementIdentifier in updatedForm) {
        formIsValid = updatedForm[elementIdentifier].valid && formIsValid;
    }
    return { updatedForm, formIsValid };
}

export default formInputChangeHandler;