import React from 'react';

const TextInput = ({isReadOnly, onChange, value, name, inputType, placeholder}) => {

    const optionalProps = isReadOnly? { disabled: true } : {};

    return <input
        name={ name }
        type={ inputType }
        placeholder={ placeholder }
        value={ value }
        onChange={ (event) => onChange(name, event.target.value) }
        {...optionalProps} />;
};

export default TextInput;