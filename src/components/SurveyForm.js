import React from 'react';

import Question from './Question';
import SaveBtn from './buttons/SaveBtn';
import TodoList from './todos/TodoList';

const SurveyForm = (props) => {
    return (
        <form action="" method="" onSubmit={ (event) => props.onSubmit(event) }>
        {   props.questions.map(
            question => <Question key={ question.shortText }
                                  name={ question.shortText }
                                  label={ question.text }
                                  value={ question.value }
                                  onChange={ props.onChange }
                                  isReadOnly={ props.isReadOnly }
                {...question} />)
        }
        <TodoList todos={ props.todos }/>
        { props.isReadOnly ? null : <div className="save-btn"><SaveBtn /></div> }
    </form>
    );
};

export default SurveyForm;