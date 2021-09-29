import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: [],
      refresh:true
    };
    
  }

  getTable = e =>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/students/`)
      .then(res => {
        this.setState({
          students: res.data,
          refresh:false
        });
      })
      .catch((error) => {
        console.log(error);
      })
    
  }
  
  componentDidUpdate() {
    if(this.state.refresh){
    this.getTable();
    }
  }


  componentDidMount() {
    this.getTable();
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} getTable={this.getTable}/>;
    });
  }


  render() {

    return ( 
    <div className="table-wrapper">
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
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