import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createHashHistory from 'history/createHashHistory';
import PropTypes from 'prop-types';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import FeedbackForm from '../pages/feedback-form/FeedbackForm';
import FormHistory from "../pages/form-history/FormHistory";
import FormDetail from "../components/FormDetail";
import LoginForm from "../pages/login/LoginForm";
import AppMenu from '../components/app-menu/AppMenu';

const App = ({ store }) => {
    const checkAuthentication = () => Object.keys(store.getState().jwt).length > 0;

    return (
            <MuiThemeProvider>
                <HashRouter history={ createHashHistory({ queryKey: false }) }>
                    <Switch>
                        <PrivateRoute exact path='/' component={ AppMenu } isAuthenticated={ checkAuthentication }/>
                        <PrivateRoute exact path='/home/:projectName' component={ AppMenu } isAuthenticated={ checkAuthentication }/>
                        <Redirect from ='/home/:projectName' to='/home' component={ AppMenu } isAuthenticated={ checkAuthentication }/>
                        <PrivateRoute exact path='/feedback' component={ FeedbackForm } isAuthenticated={ checkAuthentication }/>
                        <PrivateRoute exact path='/form-history' component={ FormHistory } isAuthenticated={ checkAuthentication }/>
                        <PrivateRoute path="/feedback/:formId" component={ FormDetail } isAuthenticated={ checkAuthentication }/>
                        <Route exact path='/login' component={ LoginForm }/>
                    </Switch>
                </HashRouter>
            </MuiThemeProvider>
    );
};

App.PropTypes = {
    store: PropTypes.object.isRequired,
};

export default App;