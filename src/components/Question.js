import React, {Component} from 'react';
import ReactStars from 'react-stars';
import DatePicker from 'material-ui/DatePicker';

class Question extends Component {

    render() {
        return (
            <div className="Question">
                <label id={ this.props.id }>{ this.props.label }</label>
                { this.getAppropriateInputField(this.props.inputType) }
            </div>
        );
    }

    getAppropriateInputField(type) {
        let inputField;
        let optionalProps = {};
        const isReadOnly = this.props.isReadOnly;

        switch(type) {
            case 'number':
                optionalProps = isReadOnly? { edit: false } : {};
                inputField = <ReactStars
                    name={ this.props.name }
                    count={ 10 }
                    value={ this.props.value }
                    onChange={ (rating) => this.props.onChange(this.props.name, rating) }
                    half={ 'false' }
                    size={ 24 }
                    color2={ '#ffc300' }
                    {...optionalProps} />;
                    break;

            case 'date':
                optionalProps = isReadOnly? { disabled: true, hintText: this.props.value } : { hintText: "Pick a date" };
                const handleChange = (event, date) => this.props.onChange(this.props.name, date);
                inputField = <DatePicker
                    id={ this.props.name }
                    value={ !(!this.props.value)? new Date(this.props.value) : null }
                    onChange={ handleChange }
                    {...optionalProps}/>
                break;

            default:
                optionalProps = isReadOnly? { disabled: true } : {};
                inputField = <input
                    name={ this.props.name }
                    type={ this.props.inputType }
                    placeholder={ this.props.placeholder }
                    value={ this.props.value }
                    onChange={ (event) => this.props.onChange(this.props.name, event.target.value) }
                    {...optionalProps} />;
                    break;
        }

        return inputField;
    }
}

export default Question