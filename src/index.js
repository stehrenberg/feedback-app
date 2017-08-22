import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FeedbackForm from './pages/feedback-form/FeedbackForm';
import FormHistory from "./pages/form-history/FormHistory";
import FormDetail from "./components/FormDetail";
import LoginForm from "./components/LoginForm";
import AppMenu from './components/app-menu/AppMenu';
import registerServiceWorker from './registerServiceWorker';

import './app.css';

const history = createHashHistory({
    queryKey: false,
});

const app = <MuiThemeProvider>
    <HashRouter history={ history }>
        <Switch>
            <Route exact path='/home' component={ AppMenu } />
            <Route extact path='/home/:projectName' component={ AppMenu } />
            <Redirect from ='/home/:projectName' to='/home' component={ AppMenu } />
            <Route exact path='/feedback' component={ FeedbackForm } />
            <Route exact path='/form-history' component={ FormHistory } />
            <Route path="/feedback/:formId" component={ FormDetail } />
            <Route exact path='/' component={ LoginForm } />
        </Switch>
    </HashRouter>
</MuiThemeProvider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
