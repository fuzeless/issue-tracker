import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Page from '../src/Page.jsx';
import template from './template.js';
import graphQLFetch from '../src/graphql_fetch.js';
import store from '../src/store.js';

async function render(req, res) {
  const query = 'query { about }';
  const data = await graphQLFetch(query);
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
