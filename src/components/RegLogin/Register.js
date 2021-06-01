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
                    <Form.Label>Name</Form.Label>
                    <Row>
                        <Col>
                        <Form.Control placeholder="First name" />
                        </Col>
                        <Col>
                        <Form.Control placeholder="Last name" />
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }

}