import React from 'react';
import PropTypes from 'prop-types';

import NumberInput from './answers/NumberInput';
import DateInput from './answers/DateInput';
import TextInput from './answers/TextInput';
import TodoInput from './answers/TodoInput';

const AnswerInput = ({ inputType, isReadOnly, onChange, onClick, name, placeholder, value, surveyId }) => {
    let inputField;

    switch(inputType) {
        case 'number':
            inputField = <NumberInput name={ name }
                                      value={ value }
                                      handleChange={ onChange }
                                      onClick={ onClick }
                                      isReadOnly={ isReadOnly }/>;
            break;

        case 'date':
            inputField = <DateInput name={ name }
                                    value={ value }
                                    handleChange={ (event, date) => onChange(name, date) }
                                    isReadOnly={ isReadOnly }/>;
            break;

        case 'todo':
            inputField = <TodoInput surveyId={ surveyId } isReadOnly={ isReadOnly }/>;
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
};

AnswerInput.propTypes = {
    name: PropTypes.string.isRequired,
    surveyId: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf(['date', 'text', 'number', 'input', 'todo']).isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ]),
    placeholder: PropTypes.string,
};

export default AnswerInput;