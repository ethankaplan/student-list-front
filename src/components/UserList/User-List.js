import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';


export default class UserList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
    
  }

  getTable = e =>{
    axios.get(`${process.env.BACKEND_URL}/user/`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  componentDidUpdate() {
    this.getTable();
  }


  componentDidMount() {
    this.getTable();
    console.log("there")
    console.log(this.state.users)
  }

  DataTable() {
    return this.state.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
              
            <th>Name</th>
            <th>Acc Type</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}