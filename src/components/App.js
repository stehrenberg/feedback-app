import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createHashHistory from 'history/createHashHistory';
import PropTypes from 'prop-types';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import FeedbackForm from '../pages/feedback-form/FeedbackForm';
import FormHistory from '../pages/form-history/FormHistory';
import FormDetail from '../components/FormDetail';
import FilteredTodos from '../pages/open-todos/FilteredTodos';
import LoginForm from '../pages/login/LoginForm';
import AppMenu from '../components/app-menu/AppMenu';
import { setJWT } from '../actions';
import { apiCall } from '../util/utils';
import config from '../config/config.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: createHashHistory({ queryKey: false }),
        }
    }

    componentWillMount = () => {
        const storedProjectName = localStorage.getItem("projectName");
        const storedJWT = localStorage.getItem("sessionToken");
        const jwt = !(!storedJWT)? JSON.parse(storedJWT) : {};

        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'PUT';
        const dataTransformMethod = (jwt) => {
            this.props.dispatch(setJWT(jwt));
            localStorage.setItem("sessionToken", JSON.stringify(jwt));
            this.state.history.push(`/home/${ storedProjectName }`);
        };
        const errorHandler = (error) => console.log(error);
        const payload = { session_token: jwt.session_token };

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };

    render() {
        return (
                <MuiThemeProvider>
                    <HashRouter history={ this.state.history }>
                        <Switch>
                            <PrivateRoute exact path='/' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/home/:projectName' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <Redirect from ='/home/:projectName' to='/home' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/feedback' component={ FeedbackForm } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute path="/feedback/:formId" component={ FormDetail } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/form-history' component={ FormHistory } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/open-todos' component={ FilteredTodos } isAuthenticated={ this.checkAuthentication }/>
                            <Route exact path='/login' component={ LoginForm }/>
                        </Switch>
                    </HashRouter>
                </MuiThemeProvider>
        );
    }

    checkAuthentication = () => {
        return Object.keys(this.props.store.getState().jwt).length > 0;
    }
}

App.PropTypes = {
    store: PropTypes.object.isRequired,
};

export default connect()(App);