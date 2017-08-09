import React from 'react';

const TextInput = ({isReadOnly, handleChange, value, name, inputType, placeholder}) => {

    const optionalProps = isReadOnly? { disabled: true } : {};

    return <input
        name={ name }
        type={ inputType }
        placeholder={ placeholder }
        value={ value }
        onChange={ (event) => handleChange(name, event.target.value) }
        {...optionalProps} />;
};

export default TextInput;