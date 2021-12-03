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

                    <NavDropdown title="Students" id="nav-dropdown">
                    <NavDropdown.Item ><Link to={routes.STUDENTLIST}>
                        Student List
                    </Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to={routes.CREATE}>
                        New Student
                    </Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Classes" id="nav-dropdown">
                        <NavDropdown.Item ><Link to={routes.CLASS}>Class List</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link to={routes.NEWCLASS}>New Class</Link></NavDropdown.Item>
                        
                    </NavDropdown>
                    <NavDropdown title="Users" id="nav-dropdown">
                        <NavDropdown.Item ><Link to={routes.USERLIST}>User List</Link></NavDropdown.Item>                       
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