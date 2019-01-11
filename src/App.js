import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Routes from './routes';
import { AuthProvider } from './context/AuthContext';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
