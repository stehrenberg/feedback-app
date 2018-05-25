import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import dotenv from 'dotenv';

import App from './components/App';
import feedbackApp from './reducers';
import './app.css';

dotenv.config();
const store = createStore(feedbackApp);
const theme = createMuiTheme({
    overrides: {
        palette: {
            primary: {
                light: '#ffb14b',
                main: '#ea7400',
                dark: '#b75d00',
            },
            secondary: {
                light: '#00e6ff',
                main: '#00BCD4',
                dark: '#00505f',
            },
            grey: {
                light: '#c9c9c9',
                main: '#88878B',
                dark: '#3c3c3c',
            }
        }
    }
});

const app = <Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
        <App store={ store }/>
    </MuiThemeProvider>
</Provider>;

injectTapEventPlugin();
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

