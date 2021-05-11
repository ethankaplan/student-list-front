import React, {Component} from "react";
import Nav from "react-bootstrap/Nav";
import * as routes from './constants/routes'

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import CreateStudent from "./components/CreateStudent/create-student.component";
import EditStudent from "./components/EditStudent/edit-student.component";
import StudentList from "./components/StudentList/student-list.component";

class App extends Component {
state = {
  currentUser:{}

}



  render(){
    return (<Router>
      <div className="App">
        <header className="App-header">
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
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path={routes.HOME} component={CreateStudent} />
                  <Route path={routes.CREATE} component={CreateStudent} />
                  <Route path={`${routes.EDITSTUDENT}/:id`} component={EditStudent} />
                  <Route path={routes.STUDENTLIST} component={StudentList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>);
  }
}

export default withRouter(App);