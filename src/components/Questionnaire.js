import React, {Component} from 'react';
import Question from './Question';
import SaveBtn from '../components/SaveBtn'

class Questionnaire extends Component {

    getInitialState() {
        return {
            questions: this.props.questions
        };
    }

    componentDidMount() {
        this.preloadCachedInputValues();
    }

/*    constructor(props) {
        super(props);


        //are these really necessary?
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }*/

    handleSubmit(event) {
        event.preventDefault();

        if(!this.props.isReadOnly) {

            let questionnaires = JSON.parse(localStorage.getItem("questionnaires")) || [];
            let newQuestionnaire = this.props.id;

            if (!questionnaires.includes(newQuestionnaire)) {
                questionnaires.push(newQuestionnaire);
            }

            localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"]));
            localStorage.setItem("questionnaires", JSON.stringify(questionnaires));
        }
    }

    handleChange(name, value) {

        const questions = this.state.questions;                                         //O(1)
        const targetQuestion = questions.find((question) => question.id === name);      //O(n)
        targetQuestion.value = value;                                                   //O(1)

        this.setState({ questions: questions });                                        //async
        localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"])); //sync
    }

    render() {
        {/* this all could be split into container / component(s) */}
        return (
            <div className="Questionnaire">
                {/* this could also be a dummy component */}
                <h2>Goals</h2>
                <p>
                    <strong>We would like to improve the quality of the services we supply continuously. We need our customers' help to achieve this, to help us align to his targets give us ideas of what competences to build and where to improve.</strong>
                </p>
                {/* this must be its own container */}
                <form action="" method="POST" onSubmit={ this.handleSubmit }>
                    {
                        this.state.questions.map(
                            question => <Question key={ question.id }
                                                  name={ question.id }
                                                  label={ question.text }
                                                  value={ question.value }
                                                  {/* do not write this. here */}
                                                  onChange={ this.handleChange }
                                                  isReadOnly={ this.props.isReadOnly }
                                {...question} />)
                    }
                    { this.props.isReadOnly ? null : <div className="save-btn"><SaveBtn /></div> }
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