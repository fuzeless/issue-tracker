/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "no-alert": "off" */
// import React from 'react';
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList.jsx';

const element = <IssueList />;
ReactDOM.render(element, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
