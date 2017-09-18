import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import PrivateRoute from './components/PrivateRoute';
import FeedbackForm from './pages/feedback-form/FeedbackForm';
import FormHistory from "./pages/form-history/FormHistory";
import FormDetail from "./components/FormDetail";
import LoginForm from "./pages/login/LoginForm";
import AppMenu from './components/app-menu/AppMenu';
import registerServiceWorker from './registerServiceWorker';
import feedbackApp from './reducers';
import './app.css';

const history = createHashHistory({
    queryKey: false,
});
const store = createStore(feedbackApp);
store.subscribe(() => console.log(store.getState()));

const isAuthenticated = () => {
    return Object.keys(store.getState().jwt).length > 0;
};

const app = <Provider store={ store }>
    <MuiThemeProvider>
        <HashRouter history={ history }>
            <Switch>
                <PrivateRoute exact path='/' component={ AppMenu } isAuthenticated={ isAuthenticated }/>
                <PrivateRoute exact path='/home/:projectName' component={ AppMenu } isAuthenticated={ isAuthenticated }/>
                <Redirect from ='/home/:projectName' to='/home' component={ AppMenu } isAuthenticated={ isAuthenticated }/>
                <PrivateRoute exact path='/feedback' component={ FeedbackForm } isAuthenticated={ isAuthenticated }/>
                <PrivateRoute exact path='/form-history' component={ FormHistory } isAuthenticated={ isAuthenticated }/>
                <PrivateRoute path="/feedback/:formId" component={ FormDetail } isAuthenticated={ isAuthenticated }/>
                <Route exact path='/login' component={ LoginForm }/>
            </Switch>
        </HashRouter>
    </MuiThemeProvider>
</Provider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();


