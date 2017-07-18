import React, {Component} from "react";
import Question from './Question'
import questions from '../questionTexts'

class Questionnaire extends Component {

    Questionnaire() {
        this.state = {
            isAnswered: false,
        }
    }


    render() {
        const QUESTIONS = questions;

        return (
            <div className="Questionnaire">
                <h2>Goals</h2>
                <p>
                    We would like to improve the quality of the services we supply continuously. We need our
                    customers' help to achieve this,
                    to help us align to his targets give us ideas of what competences to build and where to
                    improve.
                </p>
                <form>
                    <Question id="understanding" label={ QUESTIONS.UNDERSTANDING } inputType="number" persist="false" />
                    <Question id="cooperation" label={ QUESTIONS.COOPERATION } inputType="number" persist="false" />
                    <Question id="deliveriesAndRoles" label={ QUESTIONS.DELIVERIES_AND_ROLES } persist="true" />
                    <Question id="mustBes" label={ QUESTIONS.MUST_BES } persist="true" />
                    <Question id="deliverMore" label={ QUESTIONS.DELIVER_MORE } persist="true" />
                    <Question id="avoid" label={ QUESTIONS.AVOID } />
                    <Question id="deliverAdditionally" label={ QUESTIONS.DELIVER_ADDITIONALLY } persist="true" />
                    <Question id="acquire" label={ QUESTIONS.ACQUIRE } persist="true" />
                    <h3>Net Promoter Score</h3>
                    <Question id="nps" label={ QUESTIONS.NPS } persist="false" />
                    <Question id="tasks" label={ QUESTIONS.TASKS } persist="false" />
                    <Question id="nextMeeting" label={ QUESTIONS.NEXT_MEETING } inputType="date" persist="false"/>

                </form>
            </div>

        );
    }
}

export default Questionnaire;