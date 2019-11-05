import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chart from 'chart.js'
import * as serviceWorker from './serviceWorker';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
