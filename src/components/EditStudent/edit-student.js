import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      nameP:'',
      email: '',
      emailP:'',
      rollno: '',
      rollnoP:''
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/students/edit-student/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
          nameP: res.data.name,
          emailP: res.data.email,
          rollnoP: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/students/update-student/` + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Container><Row className="justify-content-md-center">Editing Student: {this.state.nameP}</Row>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Email">
        <Row><Col><Form.Label>Email</Form.Label></Col><Col className="d-flex justify-content-end">Currently: {this.state.emailP}</Col></Row>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
        <Row><Col><Form.Label>Roll Number</Form.Label></Col><Col className="d-flex justify-content-end">Currently: {this.state.rollnoP}</Col></Row>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form></Container>
    </div>);
  }
}

export default withRouter(EditStudent)