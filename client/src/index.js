// import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

if (!global._babelPolyfill) {
 require('babel-polyfill');
}
ReactDOM.render("Hello, world", document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
