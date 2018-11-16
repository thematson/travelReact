import React, { Component } from 'react';
import { Button, Card, CardImg, CardBody, CardTitle,
		Input, Col, CardSubtitle, CardText, Row } from 'reactstrap';

export default class FindFlight extends Component {
	constructor(props){
		super(props);
		console.log(props);

		this.handleOnChange = (event) => {
			this.setState({ [event.target.id]: event.target.value });
		}

		this.saveFlight = (data) => {
			data.Details = JSON.stringify(data.Details);

			const proxyurl = "https://cors-anywhere.herokuapp.com/";

			fetch("http://localhost/4974/api/FlightAndHotels", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then((res) => res.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err))
		}

		this.choseFlight = (e, flightObj) => {
			e.preventDefault();
			console.log(flightObj);
			this.setState({ Details: flightObj }, () => { 
				console.log(this.state);
				this.saveFlight(this.state) });
			

		}

		this.state = {
			FName: null,
			LName: null,
			Email: null,
			Details: {}
		}
	}

	render(){
		return (
			<Row>
				{this.props.concState.flights.map(f => 
					<Col sm="6">
						<Card key={f.QuoteId}>
							<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
							<CardBody>
								<CardTitle>From ${f.MinPrice}</CardTitle>
								<CardSubtitle>{this.props.concState.fromCity}({this.props.concState.fromAirport}) - {this.props.concState.toCity}({this.props.concState.toAirport})</CardSubtitle>
								<Input type="text" name="FName" id="FName" placeholder="First Name" onChange={this.handleOnChange} />
								<Input type="text" name="LName" id="LName" placeholder="Last Name" onChange={this.handleOnChange} />
								<Input type="email" name="Email" id="Email" placeholder="Email" onChange={this.handleOnChange} />
								<Button value={f} onClick={(e)=>this.choseFlight(e, f)}>Chose</Button>
							</CardBody>
						</Card>
					</Col>				
				)}
			</Row>
		)
	}	
}