import React, { Component } from "react";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            answer: '',
        };

        this.isNumber.bind(this);

    }

    render() {
        let opts = {};

        if(this.isNumber()) {
            opts['min'] = '0';
            opts['max'] = '10';
        }

        return (
            <div className="Question">
                <label id={ this.props.id }>{ this.props.label }</label>
                <input
                    type={ this.props.inputType }
                    placeholder={ this.props.placeholder }
                    onChange={ this.answer.bind(this) }
                    {...opts} />
            </div>
        );
    }

    isNumber() {
        return this.props.inputType === 'number';
    }

    answer(event) {
        let inputValue = event.target.value;
        let newState = {
            isAnswered: true,
            answer: inputValue
        };

        this.setState(newState);
        if(this.props.persist) {
            this.saveAnswer(inputValue);
        }
    }

    saveAnswer(inputValue) {
        localStorage.setItem(this.props.id, inputValue);
    }

}

export default Question