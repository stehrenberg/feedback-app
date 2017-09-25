import React from 'react';

const TextInput = ({isReadOnly, handleChange, value, name, inputType, placeholder}) => {

    const optionalProps = isReadOnly? { disabled: true } : {};

    return <textarea
        name={ name }
        type={ inputType }
        value={ value }
        placeholder={ placeholder }
        onChange={ (event) => handleChange(name, event.target.value) }
        rows={ 3 }
        {...optionalProps}/>;
};

export default TextInput;