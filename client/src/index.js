import React from 'react';
import ReactDOM from 'react-dom';
import './style/custom.scss';
// import "bootstrap/dist/css/bootstrap.min.css";

import Planner from './Planner';
import * as serviceWorker from './serviceWorker';

if (!global._babelPolyfill) {
 require('babel-polyfill');
}
ReactDOM.render(<Planner />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
