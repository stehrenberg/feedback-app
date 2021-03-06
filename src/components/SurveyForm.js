import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

const SurveyForm = (props) => {
    return (
        <form action="" method="" onSubmit={ (event) => props.onSubmit(event) }>
            {
                props.questions.map((question) => {
                    return (
                        <Question key={ question.shortText }
                                  name={ question.shortText }
                                  label={ question.text }
                                  value={ question.value }
                                  onChange={ props.onChange }
                                  onClick={ !(!props.onClick) ? props.onClick : () => {} }
                                  isReadOnly={ props.isReadOnly }
                                  surveyId={ props.surveyId } {...question} />
                    );
                })
            }
        </form>
    );
};

SurveyForm.propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    surveyId: PropTypes.string.isRequired,
};

export default SurveyForm;