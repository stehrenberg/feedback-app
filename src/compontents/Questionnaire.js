import React, {Component} from 'react';
import Question from './Question';

class Questionnaire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            isSaved: false,
            questions: this.props.content,
        }s
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.id, this);
        this.setState({ isAnswered: true, isSaved: true });
    }

    render() {
        return (
            <div className="Questionnaire">
                <h2>Goals</h2>
                <p><strong>We would like to improve the quality of the services we supply continuously. We need our
                    customers' help to achieve this,
                    to help us align to his targets give us ideas of what competences to build and where to
                        improve.</strong></p>
                <form action="" method="POST" onSubmit={ this.handleSubmit.bind(this) }>
                    <Question id="understanding" label={ this.state.questions.UNDERSTANDING } inputType="number" persist="false" />
                    <Question id="cooperation" label={ this.state.questions.COOPERATION } inputType="number" persist="false" />
                    <Question id="deliveriesAndRoles" label={ this.state.questions.DELIVERIES_AND_ROLES } persist="true" />
                    <Question id="mustBes" label={ this.state.questions.MUST_BES } persist="true" />
                    <Question id="deliverMore" label={ this.state.questions.DELIVER_MORE } persist="true" />
                    <Question id="avoid" label={ this.state.questions.AVOID } />
                    <Question id="deliverAdditionally" label={ this.state.questions.DELIVER_ADDITIONALLY } persist="true" />
                    <Question id="acquire" label={ this.state.questions.ACQUIRE } persist="true" />
                    <h3>Net Promoter Score</h3>
                    <Question id="nps" label={ this.state.questions.NPS } inputType="number" persist="false" />
                    <Question id="tasks" label={ this.state.questions.TASKS } persist="false" />
                    <Question id="nextMeeting" label={ this.state.questions.NEXT_MEETING } inputType="date" persist="false"/>
                    <button type="submit">Speichern</button>
                </form>
            </div>

        );
    }
}

export default Questionnaire;