/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "no-alert": "off" */
import 'babel-polyfill';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Page from '../src/Page.jsx';
import store from '../src/store.js';

store.data = window.__DATA__;

const element = (
  <Router>
    <Page />
  </Router>
);
ReactDOM.hydrate(element, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
