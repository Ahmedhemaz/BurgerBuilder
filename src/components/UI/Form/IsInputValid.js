/**
 * check if the input field satisfay rules conditions
 * @param {* validation rules object} rules 
 * @param {* input value you want to be validated} value 
 */
const isInputValid = (rules, value) => {
    let isValid = false;
    if (rules.required) isValid = value.trim() !== '';
    if (rules.isEmail) isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    if (rules.min) isValid = value.length >= rules.min;
    return isValid;
}

export default isInputValid;