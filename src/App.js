import React, {Component} from "react";

import * as routes from './constants/routes'


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import CreateStudent from "./components/CreateStudent/create-student";
import Home from "./components/Home/home"
import EditStudent from "./components/EditStudent/edit-student";
import StudentList from "./components/StudentList/student-list";
import NavBar from "./components/NavBar/navbar"
import Login from "./components/RegLogin/Login"
import Register from "./components/RegLogin/Register"
import UserList from "./components/UserList/User-List"
import CreateClass from "./components/Classes/CreateClass/CreateClass";
import ViewClass from "./components/Classes/ViewClass/ViewClass"
import ClassList from "./components/Classes/ClassList/ClassList"

class App extends Component {
state = {
  currentUser:{},
  logged:false

}

doSetCurrentUser = user =>
  this.setState({
    currentUser: user,
    logged:true
  })

logout=()=>{
  this.setState({
    currentUser:{},
    logged:false
  })
  this.props.history.push(routes.HOME)
}



  render(){
    return (<Router>
      <div className="App">
        <header className="App-header">
          <NavBar logout={this.logout} logged={this.state.logged} currentUser={this.state.currentUser}/>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path={routes.HOME} render={()=><Home />} />
                  <Route path={routes.CREATE} render={()=><CreateStudent/>} />
                  <Route path={`${routes.EDITSTUDENT}/:id`} render={()=><EditStudent/>} />
                  <Route path={routes.STUDENTLIST} component={StudentList} />

                  <Route exact path={routes.LOGIN} render={() => <Login doSetCurrentUser={this.doSetCurrentUser}/>} />
                  <Route exact path={routes.REGISTER} component={Register}/>
                  <Route exact path={routes.NEWCLASS} component={CreateClass}/>
                  <Route exact path={routes.CLASS} component={ClassList}/>

                  <Route exact path={routes.USERLIST} component={UserList}/>
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