import React, { Component } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import '../app.css';

const ClickableTableRow = (props) => {
    return (
        <TableRow onClick={ () => props.onClick }>
            { props.rowData.map(cell => (<TableRowColumn>{ cell.cellData } </TableRowColumn>)) }
        </TableRow>
    );
}

export default class SurveyDataTable extends Component {
    render() {
        const { onEvent, formData } = this.props;
        const understanding_id = 1;
        const cooperation_id = 2;
        const nps_id = 9;

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="App-content">
                <div className="Questionnaire">
                    <Table className="forms">
                        <TableHeader displaySelectAll={ false }>
                            <TableRow>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>NPS</TableHeaderColumn>
                                <TableHeaderColumn>Cooperation</TableHeaderColumn>
                                <TableHeaderColumn>Understanding</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={ false } showRowHover={ true }>
                            { /* this.props.history.push(`/feedback/${ form.surveyId }`) */}
                            { formData.map(
                                form => {
                                    return (
                                        <ClickableTableRow
                                            key={ form.surveyId }
                                            onClick={ ()=>console.log("cluck!")/*(item) => this.props.history.push(`/feedback/${ form.surveyId }`)*/ }
                                            rowData={[
                                                { cellData: Moment(form.surveyId, "YYYYMMDD").format("DD-MM-YYYY") },
                                                { cellData: this.findQuestion(form.data, nps_id) },
                                                { cellData: this.findQuestion(form.data, cooperation_id) },
                                                { cellData: this.findQuestion(form.data, understanding_id) }
                                            ]}/>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            </div>
        );
    }

    findQuestion = (formData, questionId) => {
        const question = formData.find(data => data.questionId === questionId);
        return !(!question) ? question.questionValue : '---';
    }
};
