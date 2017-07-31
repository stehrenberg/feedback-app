import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import FeedbackForm from './pages/feedback-form/FeedbackForm';
import MenuPage from './pages/tile-menue/MenuPage';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const history = createHashHistory({
    queryKey: false,
});

const router = <BrowserRouter history={ history }>
    <Switch>
        <Route exact path='/' component={ MenuPage } />
        <Route exact path='/feedback' component={ FeedbackForm } />
    </Switch>
</BrowserRouter>;

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
