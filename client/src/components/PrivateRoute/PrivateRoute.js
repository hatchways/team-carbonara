import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../auth';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          //check if authenticated, render component if true
          return <Component {...rest} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
