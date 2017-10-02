import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png';
import HistoryIcon from '../../assets/history_icon.png';
import OpenTodosIcon from '../../assets/open_todos_icon.png';
import CompletedTodosIcon from '../../assets/completed_todos_icon.png';

import TileMenu from '../../components/TileMenu';
import LogoHeader from '../../components/LogoHeader';
import { loadTodos } from '../../actions';
import { apiCall, normalizeProjectName } from '../../util/utils';
import { config } from '../../config/config';
import './appMenu.css';

class AppMenu extends React.Component {

    render() {
        const tileData = [
            {
                img: AddQuestionnaireIcon,
                title: "New Survey",
                link: "/feedback"
            },
            {
                img: HistoryIcon,
                title: "Past Surveys",
                link: "/form-history"
            },
            {
                img: OpenTodosIcon,
                title: "Open Todos",
                link: "/todos/open"
            },
            {
                img: CompletedTodosIcon,
                title: "Completed Todos",
                link: "/todos/completed"
            },
        ];

        return (
            <div>
                <LogoHeader title="Overview" />
                <TileMenu className="TileMenu"
                          tileData={ tileData }
                          cols={ 2 }
                          rows={ 2 } />
            </div>
        );
    }

    componentDidMount() {
        this.loadTodosFromBackend();
    };

    loadTodosFromBackend = () => {
        const projectName = normalizeProjectName(this.props.projectName);
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos_${projectName}`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map((todo) => {
            return {
                todoId: todo.todo_id.toString(),
                surveyId: todo.survey_id.toString(),
                text: todo.text,
                completed: todo.completed,
                createdAt: Moment(todo.created_at),
            };
        });

        const errorHandler = (error) => console.log(error);
        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then((todosAsArray) => this.props.dispatch(loadTodos(todosAsArray)));
    }
};

const mapStateToProps = (state) => ({ projectName: state.projectName });

export default connect(mapStateToProps)(AppMenu);