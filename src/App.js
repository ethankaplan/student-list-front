import React, {Component} from "react";

import * as routes from './constants/routes'


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import CreateStudent from "./components/CreateStudent/create-student";
import Home from "./components/Home/home"
import EditStudent from "./components/EditStudent/edit-student";
import StudentList from "./components/StudentList/student-list";
import NavBar from "./components/NavBar/navbar"

class App extends Component {
state = {
  currentUser:{}

}



  render(){
    return (<Router>
      <div className="App">
        <header className="App-header">
          <NavBar/>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path={routes.HOME} component={Home} />
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