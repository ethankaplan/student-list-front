import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class Login extends Component{
    state={
        email:'',
        password:'',
        msg:''
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
            
        })
      };
      componentDidMount(){
        document.title = "Login"
      }
      onSubmit(e) {
          
        e.preventDefault()
        console.log("button pushed")
        const logObject = {
          email: this.state.email,
          password:this.state.password
          
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/log-user`, logObject)
        .then((res) => {
            if(res.data.success){

                this.props.doSetCurrentUser(res.data.user)
                this.props.history.push('/')
        }else{
            this.setState({msg:res.data.msg})
        }
        }).catch((error) => {
            this.setState({msg:"Error somewhere"})
            
        });
    
         
      }
    
    render(){
        return(
            <div>
                <h2 className="d-flex justify-content-center">Login</h2>
                <Form className="form-wrapper " onSubmit={e => this.onSubmit(e)} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required onChange={e => this.changeHandler(e)} name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={e => this.changeHandler(e)} name="password" type="password" placeholder="Password" />
                </Form.Group>
                
                <Form.Label>{this.state.msg}</Form.Label><br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>

            </div>
        )
    }

}
export default withRouter(Login)