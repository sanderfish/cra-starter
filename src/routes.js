import React from 'react';
import { Router, Link, Redirect } from '@reach/router';

import { AuthConsumer } from './context/AuthContext';

import MainLayout from './components/MainLayout';

import Login from './scenes/Login';
import Signup from './scenes/Signup';

import Dashboard from './scenes/Dashboard';

import NotFound from './scenes/NotFound';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) =>
      isAuth ? (
        <MainLayout>
          <Component {...rest} />
        </MainLayout>
      ) : (
        <Redirect from="" to="login" noThrow />
      )
    }
  </AuthConsumer>
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <MainLayout>
    <Component {...rest} />
  </MainLayout>
);

const routes = () => {
  return (
    <React.Fragment>
      <AuthConsumer>
        {({ isAuth, login, logout }) =>
          isAuth ? (
            <nav>
              <Link to="/">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </nav>
          ) : (
            <nav>
              <Link to="/login">Login</Link> <Link to="signup">Signup</Link>{' '}
              <button onClick={login}>login</button>
            </nav>
          )
        }
      </AuthConsumer>

      <Router>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />

        <ProtectedRoute path="/" component={Dashboard} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />

        <PublicRoute default component={NotFound} />
      </Router>
    </React.Fragment>
  );
};

export default routes;
