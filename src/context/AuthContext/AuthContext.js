import React from 'react';
import update from 'immutability-helper';
import { navigate } from '@reach/router';

const verifyAuth = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve({
        user: { _id: 123, name: 'Alex Knost' },
        token: '1234ab',
      });
    }, 1000),
  );

const login = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve({
        auth: true,
        user: { _id: 123, name: 'Alex Knost' },
        token: '1234ab',
      });
    }, 1000),
  );

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    return {};
  }
};

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: !!localStorage.getItem('auth_token'),
    user: getUserFromLocalStorage(),
  };

  componentDidMount() {
    this.verifyAuth();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuth } = this.state;

    if (!prevState.isAuth && isAuth) {
      this.verifyAuth();
    }
  }

  verifyAuth = async () => {
    const { isAuth } = this.state;
    const token = this.getToken();

    if (isAuth && token) {
      try {
        const response = await verifyAuth(token);

        if (response.error) {
          throw new Error(response.error);
        }

        this.setLogged(response);
      } catch (err) {
        this.logout();
        window.location.href = '/';
      }
    }
  };

  setLogged = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    token && this.setToken(token);

    this.setState({
      isAuth: true,
      user,
    });
  };

  login = async data => {
    try {
      const response = await login(data);

      if (!response.auth) {
        throw new Error(response.error);
      }

      this.setLogged(response);

      navigate('/');
    } catch (err) {
      window.alert(err);

      return {
        error: err.message,
        isAuth: false,
      };
    }
  };

  logout = () => {
    localStorage.clear('user');
    localStorage.clear('auth_token');

    this.setState({ isAuth: false, user: {} });
  };

  setToken = token => localStorage.setItem('auth_token', token);

  getToken = () => localStorage.getItem('auth_token');

  setUserContext = user => {
    const newState = update(this.state, {
      user: {
        $merge: user,
      },
    });

    this.setState(newState);
  };

  render() {
    const { isAuth, user } = this.state;

    return (
      <AuthContext.Provider
        value={{
          isAuth,
          login: this.login,
          logout: this.logout,
          user,
          token: this.getToken(),
          setUserContext: this.setUserContext,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
