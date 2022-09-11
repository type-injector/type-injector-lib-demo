import React from 'react';
// @ts-ignore-error
import './App.css';
import AuthorizedScope from './AuthorizedScope';
import IntegrationVariants from './IntegrationVariants';
// @ts-ignore-error
import logo from './logo.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <IntegrationVariants></IntegrationVariants>
        </header>
        <AuthorizedScope>
          <IntegrationVariants></IntegrationVariants>
        </AuthorizedScope>
      </div>
    );
  }
}

export default App;
