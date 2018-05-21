import React from 'react';
import ReactStars from 'react-stars';

const NumberInput = ({isReadOnly, handleChange, value, name,}) => {

    const optionalProps = isReadOnly ? {edit: false} : {};

    return <ReactStars
        name={ name }
        count={ 10 }
        value={ value }
        onChange={ (rating) => handleChange(name, rating) }
        half={ false }
        size={ 24 }
        color2={ '#ffc300' }
        {...optionalProps} />;
};

export default NumberInput;