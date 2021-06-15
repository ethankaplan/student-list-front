import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        axios.delete('http://localhost:4000/user/delete-user/' + this.props.obj._id)
            .then((res) => {
                
                console.log('User successfully deleted!')
                console.log(res)
                
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.firstName} {this.props.obj.lastName}</td>
                <td>{this.props.obj.accType}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollNum}</td>
                
                <td>
                    <Button onClick={this.deleteUser} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}