import React from 'react';
import { timingSafeEqual } from 'crypto';
import { navigate } from '@reach/router';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { isAuth: false };

  login = () => {
    setTimeout(() => {
      this.setState({ isAuth: true });
      navigate('/');
    }, 1000);
  };

  logout = () => {
    this.setState({ isAuth: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
