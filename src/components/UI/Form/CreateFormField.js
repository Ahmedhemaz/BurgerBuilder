import ProtoTypes from 'prop-types';
const createFormField = (elementtype, elementconfig, validation, valid = false, shouldValidate = true, touched = false, value = '') => {
    return {
        elementtype,
        elementconfig,
        value,
        validation,
        valid,
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
