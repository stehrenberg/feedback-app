import React, { Component } from "react";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            answer: '',
        };

        this.isNumber.bind(this);
        this.answer.bind(this);
    }

    render() {
        let opts = {};

        if(this.isNumber()) {
            opts['min'] = '0';
            opts['max'] = '10';
        }

        return (
            <div className="Question">
                <label className={ this.props.className }>{ this.props.label }</label>
                <input
                    type={ this.props.inputType }
                    placeholder={ this.props.placeholder }
                    onChange={ this.answer }
                    {...opts} />
            </div>
        );
    }

    isNumber() {
        return this.props.inputType === 'number';
    }

    answer = (event) => {
        let inputValue = event.target.value;
        console.log(this.props.className, inputValue);

        let newState = {
            isAnswered: true,
            answer: inputValue
        };

        this.setState(newState);
        localStorage.setItem(this.props.className, inputValue);
    }

}

export default Question