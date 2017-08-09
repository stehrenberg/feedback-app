import React from 'react';

import NumberInput from './answers/NumberInput';
import DateInput from './answers/DateInput';
import TextInput from './answers/TextInput';

function AnswerInput({ inputType, isReadOnly, onChange, name, placeholder, value }) {

    let inputField;

    switch(inputType) {
        case 'number':
            inputField = <NumberInput  isReadOnly={ isReadOnly }/>;

        case 'date':
            inputField = <DateInput handleChange={ (event, date) => onChange(name, date) }/>;

        default:
            inputField = <TextInput inputType={ inputType }
                                    isReadOnly={ isReadOnly }
                                    onChange={ onChange }
                                    name={ name }
                                    placeholder={ placeholder }
                                    value={ value } />;
    }

    return inputField;
}

export default AnswerInput;