import React, {Component} from 'react';
import ReactStars from 'react-stars';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            answer: '',
        };

        this.isNumber.bind(this);

        if (this.props.preload) {
            this.loadCachedValue();
        }
    }

    // handleChange(event) {
    //     let inputValue = event.target.value;
    //
    //     this.setState({isAnswered: true, answer: inputValue});
    //     this.saveAnswer(inputValue);
    // }

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
            count={ 10 }
            onChange={ () => {} }
            half={ 'false' }
            size={ 24 }
            color2={ '#ffc300' }/>;
        let textInput = <input
            type={ this.props.inputType }
            placeholder={ this.props.placeholder }
            value={ this.state.answer }
            onChange={ (event) => this.props.onChange(event) } />;

        return this.isNumber() ? ratingInput : textInput;
    }

    // Helperstuff

    loadCachedValue() {
        let cachedValue = localStorage.getItem(this.props.id);

        if (!(!cachedValue)) {
            this.state = {isAnswered: true, answer: cachedValue};
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