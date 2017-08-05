import React, {Component} from 'react';
import AnswerInput from '../components/AnswerInput';

class Question extends Component {

    render() {
        return (
            <div className="Question">
                <label id={ this.props.id }>{ this.props.label }</label>
                <AnswerInput {...this.props}/>
            </div>
        );
    }
}

export default Question;