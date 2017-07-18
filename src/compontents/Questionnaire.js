import React, {Component} from "react";
import Question from './Question'

class Questionnaire extends Component {

    render() {
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
                    <Question label="How well do we understand what your company actually needs from us?" inputType="number"/>
                    <Question label="How well do we cooperate?" inputType="number"/>
                    <Question label="Core Deliveries and Roles"/>
                    <Question label="What are the Must-Be's we have to deliver?"/>
                    <Question label="What should we deliver more of?"/>
                    <Question label="What should we avoid to do in the future?"/>
                    <Question label="What should we deliver additionally?"/>
                    <Question label="What competencies and abilities should we acquire?"/>
                    <h3>Net Promoter Score</h3>
                    <Question
                        label="How likely is it that you would recommend our company/product to a friend or colleague?"/>
                    <Question label="Tasks for the next iteration:"/>
                    <Question label="Next Meeting:" inputType="date"/>

                </form>
            </div>

        );
    }
}

export default Questionnaire;