import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import * as routes from "../../../constants/routes";

export default class ClassStudentRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: this.props.obj,
    };
  }

  deleteClass() {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/class/delete-class/` +
          this.props.obj._id
      )
      .then((res) => {
        console.log("Class successfully deleted!");
        console.log(res);
        this.getTable();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTable() {
    this.props.getTable();
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.lastName}, {this.props.obj.firstName}
        </td>
        <td>{this.props.obj.rollNum}</td>
        <td>
          {this.props.inClass ? (
            <Button
              variant="danger"
              onClick={(e) => {
                e.preventDefault();
                this.props.remStudent(this.state.student);
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={(e) => {
                e.preventDefault();
                this.props.addStudent(this.state.student);
              }}
            >
              Add
            </Button>
          )}
        </td>
      </tr>
    );
  }
}
