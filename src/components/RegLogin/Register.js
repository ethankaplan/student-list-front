import React, { Component } from 'react';
import axios from 'axios';

import {Form, Button, Row, Col} from 'react-bootstrap'


export default class Register extends Component{
    state = {
        firstName: '',
        lastName:  '',
        email:     '',
        accType:   '',
        password:  '',
        error: ''
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
      };
    
      onSubmit(e) {
          
        e.preventDefault()

        console.log("button pushed")
        
        const accObject = {
          firstName: this.state.firstName,
          lastName:this.state.lastName,
          email: this.state.email,
          accType:this.state.accType,
          password:this.state.password
        };
        axios.post(`${process.env.BACKEND_URL}/user/create-user`, accObject)
        .then((res) => {
            console.log(res.data)
            this.props.history.push('/')
        }).catch((error) => {
            console.log(error)
            
        });
    
          //this.props.history.push('/')
      }
    
    render(){
        return(
            <div>
                <Form className="reglog" onSubmit={e => this.onSubmit(e)}>
                    <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Row>
                        <Col>
                        <Form.Control onChange={e => this.changeHandler(e)} name="firstName" placeholder="First name" />
                        </Col>
                        <Col>
                        <Form.Control onChange={e => this.changeHandler(e)} name="lastName" placeholder="Last name" />
                        </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => this.changeHandler(e)} name="email" type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => this.changeHandler(e)} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <fieldset>
                        <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Account Type
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                onChange={e => this.changeHandler(e)}
                                type="radio"
                                label="Administrator"
                                name="accType"
                                id="Admin"
                                value="Admin"
                                />
                                <Form.Check
                                onChange={e => this.changeHandler(e)}
                                type="radio"
                                label="Teacher"
                                name="accType"
                                id="Teach"
                                value="Teach"
                                />
                                <Form.Check
                                onChange={e => this.changeHandler(e)}
                                type="radio"
                                label="Student"
                                name="accType"
                                id="Stud"
                                value="Stud"
                                />
                            </Col>
                        </Form.Group>
                </fieldset>

                          
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }

}