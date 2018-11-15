import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class FindFlight extends Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <div className="container">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="choosecity" className="mr-sm-2">Origin City</Label>
            <Input type="text" name="v" id="chooseCity" placeholder="Enter Origin" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="tocity" className="mr-sm-2">Destination City</Label>
            <Input type="text" name="tocity" id="tocity" placeholder="Enter Destination" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="depDate" className="mr-sm-2">Departing Date</Label>
            <Input type="date" name="depDate" id="depDate" defaultValue={new Date()} />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="retDate" className="mr-sm-2">Return Date</Label>
            <Input type="date" name="retDate" id="retDate" defaultValue={new Date()} />
          </FormGroup>
          <Button>Check Availability</Button>
        </Form>
      </div>

    );
  }
}