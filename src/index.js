import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Switch } from 'react-router';
import createHashHistory from 'history/createHashHistory';

import FeedbackForm from './pages/feedback-form/FeedbackForm';
import MenuPage from './pages/tile-menue/MenuPage';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createHashHistory({
    queryKey: false,
});

const router = <Router history={ history }>
    <Switch>
        <Route path='/menu' component={ MenuPage } />
        <Route path='/feedback' component={ FeedbackForm } />
    </Switch>
</Router>;

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
