import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FindFlight from './components/FindFlight';

class App extends Component {
  componentDidMount = (data) => {
    const url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/EN/?query=Orlando"
    fetch(url, {
      method: "GET",
      headers: {
        "X-Mashape-Key": process.env.REACT_APP_MASHAPE_API_KEY,
        "X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
      }
    }).then(function(response) {
      //response.status     //=> number 100–599
      //response.statusText //=> String
      //response.headers    //=> Headers
      //response.url        //=> String
    
      // return response.text()
      console.log(response.text());
      
    }, function(error) {
      throw error.message //=> String
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <FindFlight/>
      </div>
    );
  }
}

export default App;
