import React, { Component } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      firstName: '',
      lastName:'',
      email: '',
      rollNum: ''
    }
  }
  changeHandler = e => {
    this.setState({
        [e.target.name]: e.target.value  
    })
  };

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      rollNum: this.state.rollNum
    };
    console.log(studentObject)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/students/create-student`, studentObject)
      .then(res => console.log(res.data));

    this.setState({ firstName: '',lastName:'', email: '', rollNum: '' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
        <Form.Label>Name</Form.Label>
        <Row>
            <Col>
              <Form.Control onChange={e => this.changeHandler(e)} name="firstName" placeholder="First name" value={this.state.firstName}/>
            </Col>
            <Col>
              <Form.Control onChange={e => this.changeHandler(e)} name="lastName" placeholder="Last name" value={this.state.lastName} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={this.state.email} onChange={e => this.changeHandler(e)} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" name="rollNum" value={this.state.rollNum} onChange={e => this.changeHandler(e)} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}