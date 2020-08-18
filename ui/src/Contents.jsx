import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import routes from './routes.js';

export default function Contents() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const routesRender = routes.map((data) => <Route {...data} key={data.path} />);
  return (
    <Switch>
      <Redirect exact from="/" to="/issues" />
      {routesRender}
    </Switch>
  );
}
