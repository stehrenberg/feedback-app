import React, { Component } from "react";
import Question from './Question'

class Questionnaire extends Component {

    render() {
        return (
            <div className="Questionnaire">
                <form>
                    <Question label="Who are you?"
                              placeholder="Type here"/>
                    <Question label="How are you?"
                              placeholder="Type here again!"/>
                </form>
            </div>

        );
    }
}

export default Questionnaire;