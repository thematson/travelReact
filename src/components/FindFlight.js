import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import  FlightCards from './FlightCards';

export default class FindFlight extends Component {
  constructor(props){
    super(props);

    this.getFormattedDate = (date) => {
      const year = date.getFullYear();

      let month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;

      let day = (1 + date.getDate()).toString();
      day = day.length > 1 ? day : '0' + day;

      return year + '-' + month + '-' + day;
    }

    const proxyurl = "https://cors-anywhere.herokuapp.com/";


    this.getFlightInfo = (event) => {
      event.preventDefault();
      this.findAirport(this.state.fromCity, 'fromAirport', this);
      this.findAirport(this.state.toCity, 'toAirport', this);
    }

    this.findAirport = (city, key) => {
      fetch(proxyurl + "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query="+city, {
        method: "GET",
        headers: {
          "X-Mashape-Key": process.env.REACT_APP_MASHAPE_API_KEY,
          "X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
      }).then(data => {
        return data.json();
      }, error => {
        throw error;
      }).then(jsonData => {
        this.setState({ [key]: jsonData.Places[0].PlaceId });
        console.log(this.state);
        if (this.state.toAirport.length > 0 && this.state.fromAirport.length > 0) {
          this.findFlight();
        }        
      })
    }

    this.findFlight = () => {
      let dateFrom;
      let dateTo;
      console.log(this.state.fromDate);
      if (this.state.fromDate === '') dateFrom = 'anytime';
      else {
        let df = new Date(this.state.fromDate);
        console.log(df);
        dateFrom = this.getFormattedDate(df);
        console.log(dateFrom);
      }
      if (this.state.toDate === '') dateTo = 'anytime';
      else {
        let dt = new Date(this.state.toDate);
        dateTo = this.getFormattedDate(dt);
      }
      console.log('Date From: ', dateFrom);
      console.log('Date To: ', dateTo);

      
      fetch(proxyurl + "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/" + this.state.fromAirport + "/" + this.state.toAirport + "/" + dateFrom + "/" + dateTo, {
        method: "GET",
        headers: {
          "X-Mashape-Key": process.env.REACT_APP_MASHAPE_API_KEY,
          "X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
      }).then(data => {
        return data.json();
      }, error => {
        throw error;
      }).then(jsonData => {
        console.log(jsonData);
        if (jsonData.ValidationErrors != null) this.setState({ flights: [] });
        else this.setState({ flights: jsonData.Quotes });      
      })
    }

    this.handleOnChange = (event) => {
      this.setState({[event.target.id]: event.target.value });
    }
  
    this.state = {
      fromCity: '',
      toCity: '',
      fromDate: '',
      toDate: '',
      fromAirport: '',
      toAirport: '',
      flights: [],
    }
    
  }
  render() {
    
    return (
      <div className="container">
        <Form>
          <FormGroup >
            <Label for="fromCity">Origin City</Label>
            <Input type="text" name="fromCity" id="fromCity" placeholder="Enter Origin" onChange={this.handleOnChange} />
          </FormGroup>
          <FormGroup >
            <Label for="toCity">Destination City</Label>
            <Input type="text" name="toCity" id="toCity" placeholder="Enter Destination" onChange={this.handleOnChange} />
          </FormGroup>
          <FormGroup >
            <Label for="fromDate">Departing Date (Leave blank for Anytime)</Label>
            <Input type="date" name="fromDate" id="fromDate" onChange={this.handleOnChange} />
          </FormGroup>
          <FormGroup >
            <Label for="toDate">Return Date (Leave blank for Anytime)</Label>
            <Input type="date" name="toDate" id="toDate" onChange={this.handleOnChange} />
          </FormGroup>
          <Button onClick={this.getFlightInfo}>Check Availability</Button>
        </Form>
        <br/>
        { this.state.flights.length > 0 ? <FlightCards concState={this.state} /> : null }
      </div>

    );
  }
}