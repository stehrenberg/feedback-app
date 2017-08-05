import React from 'react';
import ReactStars from 'react-stars';
import DatePicker from 'material-ui/DatePicker';

function AnswerInput(props) {

    const type = props.inputType;
    let inputField;
    let optionalProps = {};
    const isReadOnly = props.isReadOnly;

    switch(type) {
        case 'number':
            optionalProps = isReadOnly? { edit: false } : {};
            inputField = <ReactStars
                name={ props.name }
                count={ 10 }
                value={ props.value }
                onChange={ (rating) => props.onChange(props.name, rating) }
                half={ 'false' }
                size={ 24 }
                color2={ '#ffc300' }
                {...optionalProps} />;
            break;

        case 'date':
            optionalProps = isReadOnly? { disabled: true, hintText: props.value } : { hintText: "Pick a date" };
            const handleChange = (event, date) => props.onChange(props.name, date);
            inputField = <DatePicker
                id={ props.name }
                value={ !(!props.value)? new Date(props.value) : null }
                onChange={ handleChange }
                {...optionalProps}/>
            break;

        default:
            optionalProps = isReadOnly? { disabled: true } : {};
            inputField = <input
                name={ props.name }
                type={ props.inputType }
                placeholder={ props.placeholder }
                value={ props.value }
                onChange={ (event) => props.onChange(props.name, event.target.value) }
                {...optionalProps} />;
            break;
    }

    return inputField;
}

export default AnswerInput;