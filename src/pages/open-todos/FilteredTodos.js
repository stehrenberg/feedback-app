import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'material-ui/List';
import PropTypes from 'prop-types';

import TodoItem from '../../components/todos/TodoItem';
import LogoHeader from '../../components/LogoHeader';
import MiniNavBar from '../../components/MiniNavBar';
import AlertBox from '../../components/AlertBox';
import {setTodoFilter} from '../../actions';
import {apiCall} from '../../util/utils';
import {config} from '../../config/config';

class FilteredTodos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlertBox: false,
        }
    }

    componentDidMount = () => {
        const todoFilter = this.decodeTodoFilter(this.props.match.params.filter);
        this.props.dispatch(setTodoFilter(todoFilter));
        this.setState({ showAlertBox: this.isEverythingDone(todoFilter)});
    };

    // TODO Move to TodoList Component after refactoring of FilteredTodos->render()
    componentWillUnmount = () => {
        if (!(!this.props.todos) && this.props.todos.length > 0) {
            const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
            const httpMethod = 'PATCH';
            const dataTransformMethod = () => {
            };
            const errorHandler = (error) => console.log(error);
            const payload = {
                "resource": this.props.todos.map((todo) => ({todo_id: todo.id, completed: todo.completed}))
            };

            apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
        }
    };

    render = () => {
        const {todos, todoFilter, history, showMiniNavBar} = this.props;

        return (
            <div>
                <LogoHeader title="ToDos" projectSwitchDisabled={ true } history={ history }/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="App-content">
                        <MiniNavBar history={ history } show={ showMiniNavBar }/>
                        <div className="Paperbox">
                            <List>
                                { this.getVisibleTodos(todos, todoFilter).map(
                                    (todo) => <TodoItem key={ todo.id }
                                                        todoType="miniCard" {...todo}/>)
                                }
                            </List>
                        </div>
                        <AlertBox
                            show={ this.state.showAlertBox }
                            dialogText={ "All done here. Great Job! 🎉" }
                            btnTexts={ ["Thanks!"] }
                            handleClose={ () => this.setState({ showAlertBox: false }) }
                        />
                    </div>
                </div>
            </div>
        );
    };

    decodeTodoFilter = (urlParam) => {
        let todoFilter;
        switch (urlParam) {
            case 'open':
                todoFilter = 'SHOW_OPEN';
                break;
            case 'completed':
                todoFilter = 'SHOW_COMPLETED';
                break;
            default:
                todoFilter = 'SHOW_ALL';
        }

        return todoFilter;
    };

    getVisibleTodos = (todos, filter) => {
        let visibleTodos;

        switch (filter) {
            case 'SHOW_COMPLETED':
                visibleTodos = todos.filter((todo) => todo.completed);
                break;
            case 'SHOW_OPEN':
                visibleTodos = todos.filter((todo) => !todo.completed);
                break;
            default:
                visibleTodos = todos;
        }

        return visibleTodos.reverse();
    };

    isEverythingDone = (todoFilter) => {
        return (this.getVisibleTodos(this.props.todos, 'SHOW_OPEN').length < 1 && todoFilter === 'SHOW_OPEN');
    }

}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        todoFilter: state.todoFilter,
        projectName: state.projectName,
        showMiniNavBar: state.showMiniNavBar,
    };
};

FilteredTodos.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    projectName: PropTypes.string.isRequired,
    todoFilter: PropTypes.string,
};

export default connect(mapStateToProps)(FilteredTodos);