import React from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({isReadOnly, handleChange, value, name, inputType, placeholder}) => {

    const optionalProps = isReadOnly? { disabled: true } : {};

    return <TextField
        name={ name }
        type={ inputType }
        value={ value }
        hintText={ placeholder }
        hintStyle={{ fontSize: 14 }}
        multiLine={ true }
        underlineFocusStyle={{ borderColor: '#ea7400' }}
        onChange={ (event) => handleChange(name, event.target.value) }
        rows={ 1 }
        fullWidth={ true }
        {...optionalProps}/>;
};

export default TextInput;