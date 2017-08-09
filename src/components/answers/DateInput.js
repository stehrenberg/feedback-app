import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DateInput = ({name, value, handleChange, isReadOnly}) => {

    const optionalProps = isReadOnly? { disabled: true, hintText: value } : { hintText: "Pick a date" };

    return (<DatePicker
        id={ name }
        value={ !(!value)? new Date(value) : null }
        onChange={ handleChange }
        {...optionalProps}/>);
};

export default DateInput;