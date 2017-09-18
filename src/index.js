import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import feedbackApp from './reducers';
import './app.css';

const store = createStore(feedbackApp);
const app = <Provider store={ store }>
    <App store={ store }/>
</Provider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();


