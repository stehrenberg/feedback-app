import React, { Component } from "react";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answered: false,
        }

        this.isNumber.bind(this);
    }

    render() {
        let numberMinMax = 'min="0" max="10"';
        let opts = {};

        if(this.isNumber()) {
            opts['min'] = '0';
            opts['max'] = '10';
        }

        return (
            <div className="Question">
                <label className={ this.props.name }>{ this.props.label }</label>
                <input type={this.props.inputType} placeholder={ this.props.placeholder } {...opts}/>
            </div>
        );
    }

    isNumber() {
        return this.props.inputType === 'number';
    }

}

export default Question