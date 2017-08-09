import React from 'react';

import NumberInput from './answers/NumberInput';
import DateInput from './answers/DateInput';
import TextInput from './answers/TextInput';

const AnswerInput = ({ inputType, isReadOnly, onChange, name, placeholder, value }) => {

    let inputField;

    switch(inputType) {
        case 'number':
            inputField = <NumberInput name={ name }
                                      value={ value }
                                      handleChange={ onChange }
                                      isReadOnly={ isReadOnly }/>;
            break;

        case 'date':
            inputField = <DateInput name={ name }
                                    value={ value }
                                    handleChange={ (event, date) => onChange(name, date) }
                                    isReadOnly={ isReadOnly }/>;
            break;

        default:
            inputField = <TextInput inputType={ inputType }
                                    isReadOnly={ isReadOnly }
                                    handleChange={ onChange }
                                    name={ name }
                                    placeholder={ placeholder }
                                    value={ value } />;
            break;
    }

    return inputField;
}

export default AnswerInput;