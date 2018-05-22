import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png';
import HistoryIcon from '../../assets/history_icon.png';
import OpenTodosIcon from '../../assets/open_todos_icon.png';
import CompletedTodosIcon from '../../assets/completed_todos_icon.png';

import TileMenu from '../../components/TileMenu';
import LogoHeader from '../../components/LogoHeader';
import ProjectSelectDialog from '../../components/ProjectSelectDialog';
import { loadTodos, loadProjects, setProject } from '../../actions';
import { apiCall, normalizeProjectName } from '../../util/utils';
import { config } from '../../config/config';
import './appMenu.css';

class AppMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showProjectSelectDialog: false,
        };
    }

    componentDidMount() {

        if(!this.props.projectName) {
            const projectName = this.getProjectName();
            if(projectName) {
                this.props.dispatch(setProject(projectName));
                localStorage.setItem("projectName", projectName);
            } else {
                this.setState({ showProjectSelectDialog: true, isLoading: true });
                this.loadProjectsFromBackend().then(() => this.setState({ isLoading: false }));
            }
        }
    }

    componentDidUpdate({ projectName }) {
         if (projectName !== this.props.projectName) {
         this.loadAppData();
         }
    }

    render() {
        const todoCount = this.props.todos.length;
        const openTodoCount = this.props.todos.filter(todo => !todo.completed).length;

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
                link: "/todos/open",
                count: openTodoCount,
            },
            {
                img: CompletedTodosIcon,
                title: "Completed Todos",
                link: "/todos/completed",
                count: todoCount - openTodoCount,
            },
        ];

        return (
            <div>
                <LogoHeader title="Overview for" history={ this.props.history }/>
                { this.state.isLoading && <RefreshIndicator
                    size={ 50 }
                    left={ 70 }
                    top={ 0 }
                    loadingColor="#FF9800"
                    status="loading"
                    style={{
                        transform: 'none',
                        display: 'inline-block',
                        position: 'fixed',
                        background: 'none',
                        boxShadow: 'none',
                        right: 10,
                        top: 100,
                        left: 'initial',
                      }}/>
                }
                <TileMenu className="TileMenu"
                          tileData={ tileData }
                          cols={ 2 }
                          rows={ 2 }/>
                <ProjectSelectDialog
                    projectList={ this.props.projects }
                    onClose={ this.handleDialogClose }
                    open={ this.state.showProjectSelectDialog }
                />
            </div>
        );
    }

    getProjectName = () => this.props.projectName.length > 0 ?
            this.props.projectName
            : localStorage.getItem("projectName");

    loadAppData = () => {
        this.setState({
            isLoading: true,
        });

        return Promise.all([
            this.loadTodosFromBackend(),
            this.loadProjectsFromBackend()
        ])
            .then(() => this.setState({ isLoading: false }));
    };

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

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod)
            .then((todosAsArray) => this.props.dispatch(loadTodos(todosAsArray)));
    };

    loadProjectsFromBackend = () => {
        const customerEmail = this.props.customerEmail;
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/customer_projects?filter=customer_email%3D'${customerEmail}'`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map(record => parseInt(record.project_id, 10));

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod)
            .then((projectIds) => {
                if (projectIds.length > 0) {
                    this.loadProjectNamesFromIdList(projectIds);
                }
            });
    };

    loadProjectNamesFromIdList = (projectIds) => {
        const concatenatedIds = projectIds.reduce((a, b) => `${a}%2C%20${b}`);
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/projects?ids=${concatenatedIds}`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => data.resource.map(obj => obj.project_name);

        apiCall(apiEndpoint, httpMethod, dataTransformMethod)
            .then(projectNamesAsArray => this.props.dispatch(loadProjects(projectNamesAsArray)));
    };

    handleDialogClose = projectName => {
        this.setState({ showProjectSelectDialog: false });
        this.props.dispatch(setProject(projectName));
        localStorage.setItem("projectName", projectName);
    };
}

AppMenu.propTypes = {
    projectName: PropTypes.string,
    customerEmail: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.string),
    todos: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
    projectName: state.projectName,
    customerEmail: state.jwt.email,
    projects: state.projects,
    todos: state.todos,
});


export default connect(mapStateToProps)(AppMenu);