import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FeedbackForm from './pages/feedback-form/FeedbackForm';
import FormHistory from "./pages/form-history/FormHistory";
import FormDetailPage from "./pages/form-history/FormDetailPage";
import MenuPage from './pages/main-menu/MenuPage';
import registerServiceWorker from './registerServiceWorker';

import './theme.css';

const history = createHashHistory({
    queryKey: false,
});

const app = <MuiThemeProvider>
        <BrowserRouter history={ history }>
            <Switch>
                <Route exact path='/' component={ MenuPage } />
                <Route exact path='/feedback' component={ FeedbackForm } />
                <Route exact path='/form-history' component={ FormHistory } />
                <Route path="/feedback/:formId" component={ FormDetailPage } />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
