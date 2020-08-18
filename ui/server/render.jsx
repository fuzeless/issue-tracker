import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Page from '../src/Page.jsx';
import template from './template.js';
import store from '../src/store.js';
import About from '../src/About.jsx';

async function render(req, res) {
  const data = await About.fetchAbout();
  store.data = data;
  const element = (
    <StaticRouter location={req.url} context={{}}>
      <Page />
    </StaticRouter>
  );
  const body = ReactDOMServer.renderToString(element);
  console.log(body);
  res.send(template(body, data));
}

export default render;
