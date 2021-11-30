import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import * as routes from '../../constants/routes'

export default class NavBar extends Component{
    state={
//        currentUser: {}

    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Container>

                <Navbar.Brand>
                    <Link to={routes.HOME} className="nav-link">
                    Teacher/Student Registry
                    </Link>
                </Navbar.Brand>
                
                <Nav className="justify-content-md-center">
                    <Nav>
                    <Link to={routes.CREATE} className="nav-link">
                        Create Student
                    </Link>
                    </Nav>

                    <Nav>
                    <Link to={routes.STUDENTLIST} className="nav-link">
                        Student List
                    </Link>
                    </Nav>

                    <NavDropdown title="Classes" id="nav-dropdown">
                        <NavDropdown.Item ><Link to={routes.CLASS}>View All</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to={routes.NEWCLASS}>New</Link></NavDropdown.Item>
                        
                    </NavDropdown>
                </Nav>
                
                {!this.props.logged?
                <Nav className="justify-content-end">
                    <Nav>
                    <Link to={routes.LOGIN} className="nav-link">
                        Login
                    </Link>
                    </Nav>

                    <Nav>
                    <Link to={routes.REGISTER} className="nav-link">
                        Register
                    </Link>
                    </Nav>
                </Nav>
                    :
                    //Logout
                    <Nav className="justify-content-end">
                        <Link onClick={this.props.logout}>Logout</Link>
                    </Nav>
                    }
                
                

                </Container>
            </Navbar>
        )
    }
}