import React, {Component} from 'react';
import ReactStars from 'react-stars';

class Question extends Component {

    constructor(props) {
        super(props);

        this.isNumber = this.isNumber.bind(this);
    }

    render() {
        return (
            <div className="Question">
                <label id={ this.props.id }>{ this.props.label }</label>
                { this.getAppropriateInputField() }
            </div>
        );
    }

    getAppropriateInputField() {
        let ratingInput = <ReactStars
            name={ this.props.name }
            count={ 10 }
            onChange={ (event) => {} }
            half={ 'false' }
            size={ 24 }
            color2={ '#ffc300' }/>;
        let textInput = <input
            name={ this.props.name }
            type={ this.props.inputType }
            placeholder={ this.props.placeholder }
            value={ this.props.value }
            onChange={ (event) => this.props.onChange(event) } />;

        return this.isNumber() ? ratingInput : textInput;
    }

    isNumber() {
        return this.props.inputType === 'number';
    }

}

export default Question