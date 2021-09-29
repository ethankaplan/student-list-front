import React, { Component } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      firstName: '',
      lastName:'',
      email: '',
      rollno: ''
    }
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
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
      rollno: this.state.rollno
    };
    console.log(studentObject)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/students/create-student`, studentObject)
      .then(res => console.log(res.data));

    this.setState({ firstName: '',lastName:'', email: '', rollno: '' })
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
          <Form.Control type="text" name="rollno" value={this.state.rollno} onChange={e => this.changeHandler(e)} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}