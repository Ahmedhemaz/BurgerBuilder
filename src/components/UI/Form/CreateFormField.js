import ProtoTypes from 'prop-types';
const createFormField = (elementtype, elementconfig, validation, shouldValidate = true, touched = false, value = '') => {
    return {
        elementtype,
        elementconfig,
        value,
        validation,
        valid: false,
        shouldValidate,
        touched
    }
}

createFormField.prototype = {
    elementtype: ProtoTypes.string.isRequired,
    elementconfig: ProtoTypes.object.isRequired,
    value: ProtoTypes.string,
    validation: ProtoTypes.object.isRequired,
    shoouldValidate: ProtoTypes.bool
}
export default createFormField;
