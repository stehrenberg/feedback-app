import React, { Component } from 'react';
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

class App extends Component {

    componentWillMount = () => {
        const storedSessionToken = localStorage.getItem("sessionToken");
        const sessionToken = !(!storedSessionToken)? JSON.parse(storedSessionToken) : {};
        console.log(sessionToken);
    };

    render() {
        return (
                <MuiThemeProvider>
                    <HashRouter history={ createHashHistory({ queryKey: false }) }>
                        <Switch>
                            <PrivateRoute exact path='/' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/home/:projectName' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <Redirect from ='/home/:projectName' to='/home' component={ AppMenu } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/feedback' component={ FeedbackForm } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute exact path='/form-history' component={ FormHistory } isAuthenticated={ this.checkAuthentication }/>
                            <PrivateRoute path="/feedback/:formId" component={ FormDetail } isAuthenticated={ this.checkAuthentication }/>
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

export default App;