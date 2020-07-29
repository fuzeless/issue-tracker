/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "no-alert": "off" */
// import React from 'react';
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);
ReactDOM.render(element, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
