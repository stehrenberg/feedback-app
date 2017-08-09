import React from 'react';
import AnswerInput from '../components/AnswerInput';

const Question = (props) => (
    <div className="Question">
        <label id={ props.id }>{ props.label }</label>
        <AnswerInput {...props}/>
    </div>
);

export default Question;