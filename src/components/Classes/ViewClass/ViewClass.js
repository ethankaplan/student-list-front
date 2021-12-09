import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Table, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ClassStudentRow from "./ClassStudentRow";

class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      class: null,
      classEdit: { title: false, teacher: false, students: false },

      nonStudents: [],
      teacherList: [],
      classTitle: "",
      classTeacher: {},
      classStudents: [{}],
    };
  }

  teacherLister() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/teachers`)
      .then((res) => {
        this.setState({
          teachList: res.data,
        });
        console.log(this.state.teachList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getClass() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/class/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          class: res.data,
          classTitle: res.data.title,
          classTeacher: res.data.teacher,
          classStudents: res.data.students,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getNotStudents() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/class/non/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({
          nonStudents: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addStudent = (student) => {
    let temp = this.state.classStudents;
    temp.push(student);
    this.setState({
      classStudents: temp,
      nonStudents: this.state.nonStudents.filter(function (f) {
        return f !== student;
      }),
    });
  };

  remStudent = (student) => {
    let temp = this.state.nonStudents;
    temp.push(student);
    this.setState({
      classStudents: this.state.classStudents.filter(function (f) {
        return f !== student;
      }),
      nonStudents: temp
    });
  };

  componentDidMount() {
    this.getClass();
    this.getNotStudents();
  }

  componentDidUpdate() {}

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  DataTable(studentType, inClass) {
    if (typeof studentType == "object") {
      return studentType.map((res, i) => {
        return (
          <ClassStudentRow
            obj={res}
            inClass={inClass}
            key={res._id}
            addStudent={this.addStudent}
            remStudent={this.remStudent}
          />
        );
      });
    }
  }

  ClassTable(inClass) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pin</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {inClass
            ? this.DataTable(this.state.classStudents, inClass)
            : this.DataTable(this.state.nonStudents, inClass)}
        </tbody>
      </Table>
    );
  }

  onSubmit(e) {}

  render() {
    return (
      <div>
        {this.state.class === null ? (
          <div>Loading</div>
        ) : (
          <div>
            <h2>{this.state.class.title}</h2>

            <h3>
              Taught by {this.state.class.teacher.lastName},{" "}
              {this.state.class.teacher.firstName}
            </h3>
            <Container>
              <Row>
                <Col>
                  <h4>Students Attending Class</h4>
                  {this.ClassTable(true)}
                </Col>
                <Col>
                  <h4>Students not in this class</h4>
                  {this.ClassTable(false)}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditStudent);
