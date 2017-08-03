import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';

class FormHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: this.loadFormData(),
        };

        this.findQuestion = this.findQuestion.bind(this);
    }

    render() {
        return (
            <div>
                <LogoHeader title="Past Questionnaires" />
                <ul className="forms">{
                    this.state.forms.map(
                        form => <li key={ form.id }>
                            <Link to={ `/feedback/${ form.id }` }>
                                <span>ID: { form.id } </span>
                                <span>NPS: { this.findQuestion(form, 'nps') } </span>
                                <span>Understanding: { this.findQuestion(form, 'understanding') } </span>
                                <span>Cooperation: { this.findQuestion(form, 'cooperation') } </span>
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="App-footer">
                    <RaisedButton className="nav-btn"
                                  primary={ true }
                                  label="Back to Menu"
                                  onClick={ this.props.history.goBack } />
                </div>
            </div>
        );
    }

    loadFormData() {
        let forms = [];
        let formIds = JSON.parse(localStorage.getItem("questionnaires")) || [];

        formIds.sort();
        formIds.forEach(formId => {
            const formData = JSON.parse(localStorage.getItem(formId)) || [];
            const form = {
                id: formId,
                data: formData,
            };
            forms.push(form);
        });

        return forms;
    }

    findQuestion(form, questionId) {
        const question = form.data.find(data => data.id === questionId);
        return !(!question) ? question.value : '---';
    }

}

export default FormHistory;