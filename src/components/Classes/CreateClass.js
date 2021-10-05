import React, { Component } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';

export default class CreateClass extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      teacher: '',
      title:'',
      teachList:[],
      classID:''
    }
  }

  componentDidMount(){
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-teachers`)
  }

  changeHandler = e => {
    this.setState({
        [e.target.name]: e.target.value  
    })
  };


  onSubmit(e) {
    e.preventDefault()

    const classObject = {
      teacher: this.state.teacher,
      title: this.state.title,
    };
    console.log(studentObject)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/classes/create-class`, classObject)
      .then(res => this.setState({classID:res.data._id}))
      .then(this.props.history.push(`/class/${this.state.classID}`));
  }


  render() {
    return (<div className="form-wrapper">
      <h2 className="d-flex justify-content-center">Add New Student</h2>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="ClassTitle">
        <Form.Label>Class Title</Form.Label>
              <Form.Control onChange={e => this.changeHandler(e)} name="title" placeholder="Title" value={this.state.title}/>
        </Form.Group>
                
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control
                    as="select"
                    value={''}
                    onChange={e => {
                        console.log("e.target.value", e.target.value);
                        this.changeHandler(e)
                    }}
                    >
                    <option name="teacher" value="DICTUM">Dictamen</option>
                    <option name="teacher" value="CONSTANCY">Constancia</option>
                    <option name="teacher" value="COMPLEMENT">Complemento</option>
                    </Form.Control>
                </Form.Group>

        <Form.Group controlId="Name">
          <Row><Col><Form.Label>Roll Number</Form.Label></Col>
          <Col className="d-flex justify-content-end"><Button size='sm' variant="info" onClick={this.generate}> Generate </Button></Col></Row>
          <Form.Control type="text" disabled name="rollNum" value={this.state.rollNum} onChange={e => this.changeHandler(e)} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}