import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';

const DateInput = ({name, value, handleChange, isReadOnly}) => {

    const optionalProps = isReadOnly? { disabled: true, hintText: value } : { hintText: "Pick a date" };

    return (<DatePicker
        id={ name }
        value={ !(!value)? new Date(value) : null }
        onChange={ handleChange }
        {...optionalProps}/>);
};

DateInput.PropTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};

export default DateInput;