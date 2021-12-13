import React, { Component } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';
import ClassTableRow from './ClassTableRow';


export default class ClassList extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      classes: [],
      refresh:true,
    };
    
  }

  getTable = e =>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/class`)
      .then(res => {
        console.log(res.data)
        this.setState({
          classes: res.data,
          refresh:false
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  componentDidUpdate() {

  }


  componentDidMount() {
    this.getTable();

  }

  DataTable() {
    return this.state.classes.map((res, i) => {
      return <ClassTableRow obj={res} key={i} getTable={this.getTable}/>;
    });
  }


  render() {
    return (<div className="table-wrapper">
        
      <Table striped bordered hover>
        <thead>
          <tr>
              
            <th>Title</th>
            <th>Teacher</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}