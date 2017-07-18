import React, { Component } from "react";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            answer: '',
        };

        this.isNumber.bind(this);

        if(this.props.persist) {
            this.loadCachedValue();
        }

    }

    handleChange(event) {
        let inputValue = event.target.value;

        this.setState({ isAnswered: true, answer: inputValue });
        if(this.props.persist) {
            this.saveAnswer(inputValue);
        }
    }

    render() {
        let opts = {};

        if(this.isNumber()) {
            opts['min'] = '0';
            opts['max'] = '10';
        }

        if(this.state.isAnswered) {
            opts['value'] = this.state.answer;
        }

        return (
            <div className="Question">
                <label id={ this.props.id }>{ this.props.label }</label>
                <input
                    type={ this.props.inputType }
                    placeholder={ this.props.placeholder }
                    onChange={ this.handleChange.bind(this) }
                    {...opts} />
            </div>
        );
    }

    // Helperstuff

    loadCachedValue() {
        let cachedValue = localStorage.getItem(this.props.id);

        if(!(!cachedValue)) {
            this.state = { isAnswered: true, answer: cachedValue };
            console.log(this.state);
        }
    }

    saveAnswer(inputValue) {
        localStorage.setItem(this.props.id, inputValue);
    }

    isNumber() {
        return this.props.inputType === 'number';
    }

}

export default Question