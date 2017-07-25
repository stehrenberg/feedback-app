import React, {Component} from 'react';
import Question from './Question';

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
        }

        this.preloadCachedInputValues();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"]));
    }

    handleChange(name, value) {

        const questions = this.state.questions;
        const targetQuestion = questions.find((question) => question.id === name);
        targetQuestion.value = value;

        this.setState({ questions: questions });
        localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"]));
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
                            question => <Question key={ question.id }
                                                  name={ question.id }
                                                  label={ question.text }
                                                  value={ question.value }
                                                  onChange={ this.handleChange }
                                {...question} />)
                    }
                    <button type="submit">Speichern</button>
                </form>
            </div>

        );
    }

    preloadCachedInputValues() {
        const storedQuestions = JSON.parse(localStorage.getItem(this.props.id));
        if (storedQuestions !== null) {
            this.state.questions.forEach(question => {
                const storedQuestion = storedQuestions.find(storedQuestion => storedQuestion.id === question.id);
                question.value = storedQuestion.value;
            });
        }
    }
}

export default Questionnaire;