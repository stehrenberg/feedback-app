import React from 'react';
import ReactStars from 'react-stars';

const NumberInput = ({isReadOnly, onChange, value, name,}) => {

    const optionalProps = isReadOnly ? {edit: false} : {};

    return <ReactStars
        name={name}
        count={10}
        value={value}
        onChange={(rating) => onChange(name, rating)}
        half={'false'}
        size={24}
        color2={'#ffc300'}
        {...optionalProps} />;
};

export default NumberInput;