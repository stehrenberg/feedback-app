import React from 'react';
import ReactStars from 'react-stars';

const NumberInput = ({isReadOnly, handleChange, onClick, value, name,}) => {

    const optionalProps = isReadOnly ? {edit: false} : {};

    return <ReactStars
        name={ name }
        count={ 10 }
        value={ value }
        onChange={ (rating) => handleChange(name, rating, onClick) }
        half={ false }
        size={ 24 }
        color2={ '#ffc300' }
        {...optionalProps} />;
};

export default NumberInput;