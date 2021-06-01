import React, { Component } from 'react';

import {Form, Button, Row, Col} from 'react-bootstrap'


export default class Register extends Component{
    /*state = {
        firstName: '',
        lastName:  '',
        email:     '',
        accType:   '',
        password:  ''
    }
    */
    
    
    render(){
        return(
            <div>
                <Form className="reglog">
                    <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Row>
                        <Col>
                        <Form.Control placeholder="First name" />
                        </Col>
                        <Col>
                        <Form.Control placeholder="Last name" />
                        </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    
                    <fieldset>
                        <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Account Type
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                type="radio"
                                label="Administrator"
                                name="formHorizontalRadios"
                                id="Admin"
                                />
                                <Form.Check
                                type="radio"
                                label="Teacher"
                                name="formHorizontalRadios"
                                id="Teach"
                                />
                                <Form.Check
                                type="radio"
                                label="Student"
                                name="formHorizontalRadios"
                                id="Stud"
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