import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

// import ChartContainer from './ChartContainer';
import Planner from './Planner';
import * as serviceWorker from './serviceWorker';

if (!global._babelPolyfill) {
 require('babel-polyfill');
}
// ReactDOM.render(<ChartContainer />, document.getElementById('root'));
ReactDOM.render(<Planner />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
