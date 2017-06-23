import React, { Component } from "react";

class Question extends Component {

    constructor(props) {
        super(props);

        this.name = props.name;
        this.label = props.label;
        this.placeholder = props.placeholder;

        this.state = {
            answered: false,
        }
    }

    render() {
        return (
            <div className="Question">
                <label className={ this.name }>{ this.label }</label>
                <input type="text" placeholder={ this.label } />
                <button disabled={ this.state.answered }>Click me!</button>
            </div>
        );
    }

}

export default Question