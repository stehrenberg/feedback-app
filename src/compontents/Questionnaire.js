import React, {Component} from 'react';
import Question from './Question';

class Questionnaire extends Component {

    // TODO Destructuring?
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            isSaved: false,
            questions: this.props.questions,
        }

        this.handleSubmit.bind(this);
        this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let formData = "";

        localStorage.setItem(this.props.id, formData);
        this.setState({ isAnswered: true, isSaved: true });
    }

    handleChange(event) {
        let targetName = event.target.value;
        console.log(targetName);
    }

    render() {
        return (
            <div className="Questionnaire">
                <h2>Goals</h2>
                <p>
                    <strong>We would like to improve the quality of the services we supply continuously. We need our customers' help to achieve this, to help us align to his targets give us ideas of what competences to build and where to improve.</strong>
                </p>
                <form action="" method="POST" onSubmit={ this.handleSubmit }>
                    {
                        this.state.questions.map(
                            question => <Question key={ question.id } label={ question.text } onChange={ this.handleChange } {...question} />)
                    }
                    <button type="submit">Speichern</button>
                </form>
            </div>

        );
    }
}

export default Questionnaire;