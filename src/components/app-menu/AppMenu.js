import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png';
import HistoryIcon from '../../assets/history_icon.png';
import OpenTodosIcon from '../../assets/open_todos_icon.png';
import CompletedTodosIcon from '../../assets/completed_todos_icon.png';

import TileMenu from '../../components/TileMenu';
import LogoHeader from '../../components/LogoHeader';
import { loadTodos, loadProjects } from '../../actions';
import { apiCall, normalizeProjectName } from '../../util/utils';
import { config } from '../../config/config';
import './appMenu.css';

class AppMenu extends React.Component {

    componentDidMount() {
        this.loadTodosFromBackend();
        this.loadProjectsFromBackend();
    };

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
                <LogoHeader title="Overview for" />
                <TileMenu className="TileMenu"
                          tileData={ tileData }
                          cols={ 2 }
                          rows={ 2 } />
            </div>
        );
    }

    loadTodosFromBackend = () => {
        const projectName = normalizeProjectName(this.props.projectName);
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos_${projectName}`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map((todo) => {
            return {
                id: todo.todo_id.toString(),
                surveyId: todo.survey_id.toString(),
                text: todo.text,
                completed: todo.completed,
                createdAt: Moment(todo.created_at),
            };
        });

        const errorHandler = (error) => console.log(error);
        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then((todosAsArray) => this.props.dispatch(loadTodos(todosAsArray)));
    };

    loadProjectsFromBackend = () => {
        const customerEmail = this.props.customerEmail;
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/customer_projects?filter=customer_email%3D'${customerEmail}'`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map(obj => parseInt(obj.project_id, 10));

        const errorHandler = (error) => console.log(error);
        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then((projectIds) => {
                if(projectIds.length > 0) {
                    this.loadProjectNamesFromIdList(projectIds);
                }
            });
    };

    loadProjectNamesFromIdList = (projectIds) => {
        const concatenatedIds = projectIds.reduce((a, b) => `${a}%2C%20${b}`);
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/projects?ids=${concatenatedIds}`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map(obj => obj.project_name);

        const errorHandler = (error) => console.log(error);
        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then(projectNamesAsArray => this.props.dispatch(loadProjects(projectNamesAsArray)));
    };
}

const mapStateToProps = (state) => ({
    projectName: state.projectName,
    customerEmail: state.jwt.email,
    projects: state.projects,
    todos: state.todos,
});

export default connect(mapStateToProps)(AppMenu);