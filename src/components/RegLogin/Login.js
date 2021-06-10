import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class Login extends Component{
    state={
        email:'',
        password:''
    }
    componentDidCatchMount(){
        console.log(this.props)
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
      };

      onSubmit(e) {
          
        e.preventDefault()
        console.log("button pushed")
        const logObject = {
          email: this.state.email,
          password:this.state.password
          
        };
        axios.post('http://localhost:4000/user/log-user', logObject)
        .then((res) => {
            console.log(res)
            if(res.data.success){

            this.props.doSetCurrentUser(res.data.user)
            this.props.history.push('/')
        }else{
            console.log("rejected")
        }
        }).catch((error) => {
            console.log(error)
            
        });
    
         
      }
    
    render(){
        return(
            <div>
                <Form className="reglog" onSubmit={e => this.onSubmit(e)} >
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
export default withRouter(Login)