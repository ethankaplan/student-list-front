import React, { Component } from 'react';

import {Form, Button, Row, Col} from 'react-bootstrap'


export default class Register extends Component{
    state = {
        firstName: '',
        lastName:  '',
        email:     '',
        accType:   '',
        password:  ''
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
      };
    
    
    render(){
        return(
            <div>
                <Form className="reglog">
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
                    <Form.Control onChange={e => this.changeHandler(e)} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => this.changeHandler(e)} name="password" type="password" placeholder="Enter password" />
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