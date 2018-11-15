import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FindFlight from './components/FindFlight';

class App extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <code>Welcome to Flights</code>
            </p>
          </header>
        </div>
        <FindFlight/>
      </div>

    );
  }
}

export default App;
