import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import createHashHistory from 'history/createHashHistory';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import PrivateRoute from './PrivateRoute';
import FeedbackForm from '../pages/feedback-form/FeedbackForm';
import FormHistory from '../pages/form-history/FormHistory';
import FormDetail from '../components/FormDetail';
import FilteredTodos from '../pages/open-todos/FilteredTodos';
import LoginForm from '../pages/login/LoginForm';
import AppMenu from '../pages/app-menu/AppMenu';
import { setJWT, addKudosPoints, toggleSnackbar } from '../actions';
import { apiCall } from '../util/utils';
import { config } from '../config/config';
import profile from '../config/profile';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: createHashHistory({ queryKey: false }),
        }
    }

    componentWillMount = () => {

        // validate JWT if exists
        const storedJWT = localStorage.getItem("sessionToken");
        const jwt = !(!storedJWT) ? JSON.parse(storedJWT) : {};

        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'PUT';
        const dataTransformMethod = (jwt) => {
            this.props.dispatch(setJWT(jwt));
            localStorage.setItem("sessionToken", JSON.stringify(jwt));
            this.state.history.push("/home/");
        };
        const payload = { session_token: jwt.session_token };

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, undefined, payload);
    };

    componentDidMount = () => {
        this.props.dispatch(addKudosPoints(profile.kudoPoints));
    };

    render() {
        const points = 12;

        return (
            <MuiThemeProvider theme={ this.createAppTheme() }>
                <DocumentTitle title="Cooperation Feedback Questionnaire">
                    <HashRouter history={ this.state.history }>
                        <Switch classes="">
                            <PrivateRoute exact path='/' component={ AppMenu }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/home/' component={ AppMenu }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/feedback' component={ FeedbackForm }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute path="/feedback/:formId" component={ FormDetail }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/form-history' component={ FormHistory }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/todos/:filter' component={ FilteredTodos }
                                          isAuthenticated={ this.checkAuthentication }/>
                            <Route exact path='/login' component={ LoginForm }/>
                        </Switch>
                    </HashRouter>
                </DocumentTitle>
            </MuiThemeProvider>
        );
    }

    checkAuthentication = () => Object.keys(this.props.store.getState().jwt).length > 0;

    createAppTheme = () => {
        return createMuiTheme({
            palette: {
                primary: {
                    light: '#ffb14b',
                    main: '#ea7400',
                    dark: '#b75d00',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#00e6ff',
                    main: '#00BCD4',
                    dark: '#00505f',
                    contrastText: '#000',
                },
                grey: {
                    light: '#c9c9c9',
                    main: '#88878B',
                    dark: '#3c3c3c',
                    contastText: '#ffffff'
                }
            },
        });
    };
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default connect()(App);