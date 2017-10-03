import React, { Component } from 'react';
import Moment from 'moment';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import '../app.css';

export default class SurveyDataTable extends Component {
    render() {
        const understanding_id = 1;
        const cooperation_id = 2;
        const nps_id = 9;
        const { formData, history } = this.props;

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="App-content">
                <div className="Paperbox">
                    <Table className="forms">
                        <TableHeader className="TableHeader" displaySelectAll={ false }>
                            <TableRow className="TableRow">
                                <TableHeaderColumn className="TableHeaderColumn">Date</TableHeaderColumn>
                                <TableHeaderColumn className="TableHeaderColumn">NPS</TableHeaderColumn>
                                <TableHeaderColumn className="TableHeaderColumn">Cooperation</TableHeaderColumn>
                                <TableHeaderColumn className="TableHeaderColumn">Understanding</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={ false } showRowHover={ true }>
                            { formData.map(
                                form => {
                                    return (
                                        <ClickableTableRow
                                            key={ form.surveyId }
                                            name={ form.surveyId }
                                            history={ history }
                                            rowData={[
                                                { cellData: Moment(form.surveyId, "YYYYMMDD").format("DD-MM-YYYY") },
                                                { cellData: this.findQuestion(form.data, nps_id) },
                                                { cellData: this.findQuestion(form.data, cooperation_id) },
                                                { cellData: this.findQuestion(form.data, understanding_id) }
                                            ]}
                                        />
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

const ClickableTableRow = ({ name, history, rowData }) => {
    return (
        <TableRow key={ name } onClick={ () => history.push(`/feedback/${ name }`) } className="ClickableTableRow" hoverable={ true }>
            { rowData.map(cell => (<TableRowColumn key={ `${ name }-${ cell }` } className="TableRowColumn">{ cell.cellData } </TableRowColumn>)) }
        </TableRow>
    );
};

