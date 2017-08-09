import React from 'react';
import ReactStars from 'react-stars';
import DatePicker from 'material-ui/DatePicker';
import NumberInput from 'answers/NumberInput';

function AnswerInput(props) {

    const type = props.inputType;
    let inputField;
    let optionalProps = {};
    const isReadOnly = props.isReadOnly;

    switch(type) {
        case 'number':
            optionalProps = isReadOnly? { edit: false } : {};
            return <NumberInput  isReadOnly="{blabla"/>

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