import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducer'
import 'typeface-roboto';
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import DateFnsAdapter from "@date-io/date-fns";





const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiPickersUtilsProvider utils={DateFnsAdapter}>
                <App />
            </MuiPickersUtilsProvider>
        </Router>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
