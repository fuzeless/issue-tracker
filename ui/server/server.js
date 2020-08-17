import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import SourceMapSupport from 'source-map-support';
import render from './render.jsx';

const app = express();
const fileServerMiddleware = express.static('public');
dotenv.config();
SourceMapSupport.install();

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}
if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Dev middleware added, enabling HMR');
  /* eslint-disable global-require */
  /* eslint-disable import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js')[0];

  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(fileServerMiddleware);

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  const env = { UI_API_ENDPOINT: process.env.UI_API_ENDPOINT }
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('/about', (req, res, next) => {
  render(req, res, next);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

const PORT = process.env.UI_SERVER_PORT || 8000;
app.listen(PORT, () => {
  console.log(`UI listening on port ${PORT}!`);
});

if (module.hot) {
  module.hot.accept('./render.jsx');
}
