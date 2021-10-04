import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class EditStudent extends Component {

  constructor(props) {
    super(props)
    
    this.changeHandler = this.changeHandler.bind(this)

    // State
    this.state = {
      firstName: '',
      firstConst:'',
      lastName: '',
      lastConst:'',
      email: '',
      emailConst:'',
      rollNum: '',
      rollNumConst:''
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/students/edit-student/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          rollNum: res.data.rollNum,
          //these are not meant to change
          firstConst: res.data.firstName,
          lastConst: res.data.lastName,
          emailConst: res.data.email,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  changeHandler = e => {
    this.setState({
        [e.target.name]: e.target.value  
    })
  };

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollNum: this.state.rollNum
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
      <h2 className="d-flex justify-content-center">Editing {this.student.firstConst} {this.student.lastConst}</h2>
      <Container>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Name">
        <Form.Label>Name</Form.Label>
        <Row>
            <Col className="d-flex justify-content-end">
              {this.state.firstConst}
            </Col>
            <Col className="d-flex justify-content-end">
              {this.state.lastConst}
            </Col>
          </Row>
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
        <Row><Col><Form.Label>Email</Form.Label></Col><Col className="d-flex justify-content-end">{this.state.emailConst}</Col></Row>
          <Form.Control type="email" value={this.state.email} name="email" onChange={e => this.changeHandler(e)} />
        </Form.Group>

        <Form.Group controlId="Name">
        <Row><Col><Form.Label>Roll Number</Form.Label></Col></Row>
          <Form.Control disabled type="text" value={this.state.rollNum} name="rollNum" />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form></Container>
    </div>);
  }
}

export default withRouter(EditStudent)