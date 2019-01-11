import React from 'react';

import { AuthConsumer } from '../../context/AuthContext';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>

      <AuthConsumer>
        {({ login }) => <button onClick={login}>Login</button>}
      </AuthConsumer>
    </div>
  );
};

export default Login;
