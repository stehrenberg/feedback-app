import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

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
const unsubscribe = store.subscribe(() => console.log(store.getState()));

console.log(store.getState());

const checkAuth = () => {
    console.log("checkAuth triggered");
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const app = <Provider store={ store }>
    <MuiThemeProvider>
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
    </MuiThemeProvider>
</Provider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();


