import React, { Component } from 'react';

import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import * as routes from '../../constants/routes'

import Navbar from "react-bootstrap/Navbar";

export default class NavBar extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Container>

                <Navbar.Brand>
                    <Link to={routes.CREATE} className="nav-link">
                    React MERN Stack App
                    </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end">
                    <Nav>
                    <Link to={routes.CREATE} className="nav-link">
                        Create Student
                    </Link>
                    </Nav>

                    {/* <Nav>
                    <Link to={"/edit-student/:id"} className="nav-link">
                        Edit Student
                    </Link>
                    </Nav> */}

                    <Nav>
                    <Link to={routes.STUDENTLIST} className="nav-link">
                        Student List
                    </Link>
                    </Nav>
                </Nav>

                </Container>
            </Navbar>
        )
    }
}