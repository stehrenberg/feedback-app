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
                    <Question className="understanding" label={ QUESTIONS.UNDERSTANDING } inputType="number"/>
                    <Question label={ QUESTIONS.COOPERATION } inputType="number"/>
                    <Question label={ QUESTIONS.DELIVERIES_AND_ROLES }/>
                    <Question label={ QUESTIONS.MUST_BES } />
                    <Question label={ QUESTIONS.DELIVER_MORE } />
                    <Question label={ QUESTIONS.AVOID } />
                    <Question label={ QUESTIONS.DELIVER_ADDITIONALLY } />
                    <Question label={ QUESTIONS.ACQUIRE } />
                    <h3>Net Promoter Score</h3>
                    <Question
                        label={ QUESTIONS.NPS } />
                    <Question label={ QUESTIONS.TASKS } />
                    <Question label={ QUESTIONS.NEXT_MEETING } inputType="date"/>

                </form>
            </div>

        );
    }
}

export default Questionnaire;