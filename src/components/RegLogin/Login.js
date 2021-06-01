import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class Login extends Component{
    state={
        email:'',
        password:''
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
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => this.changeHandler(e)} name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => this.changeHandler(e)} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>

            </div>
        )
    }

}