import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }
    getTable(){
        this.props.getTable();
    }

    deleteStudent() {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/students/delete-student/` + this.props.obj._id)
            .then((res) => {
                
                console.log('Student successfully deleted!')
                console.log(res)
                this.getTable();
                
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        
        return (
            <tr>
                
                <td>{this.props.obj.lastName}, {this.props.obj.firstName}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollno}</td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id} >
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}