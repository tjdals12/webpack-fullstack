import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reduction.scss';
import { Provider } from 'react-redux';
import configure from 'store';
import App from './App';

const store = configure();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
