import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Table, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ClassStudentRow from "./ClassStudentRow";

class ViewClass extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      class: null,
      editStudents: false,
      editTitle: false,
      editTeacher: false,

      nonStudents: [],
      teachList: [],
      classTitle: "",
      classTeacher: {},
      classStudents: [{}],
    };
  }

  async teacherLister() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/teachers`)
      .then((res) => {
        this.setState({
          teachList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getClass() {
    await axios
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

  async getNotStudents() {
    await axios
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
      editStudents: true,
    });
  };

  remStudent = (student) => {
    let temp = this.state.nonStudents;
    temp.push(student);
    this.setState({
      classStudents: this.state.classStudents.filter(function (f) {
        return f !== student;
      }),
      nonStudents: temp,
      editStudents: true,
    });
  };

  saveStudents = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/class/${this.state.class._id}/update/students`,
        this.state.classStudents
      )
      .then((res) => {
        console.log(res);
        this.setState({
          editStudents: false,
        });
        this.getClass()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveTeacher = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/class/${this.state.class._id}/update/teacher`,
        { _id: this.state.classTeacher }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          editTeacher: false,
        });
        this.getClass()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getClass();
    this.getNotStudents();
    this.teacherLister();
  }

  componentDidUpdate() {}

  changeHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
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

  TeacherDrop() {
    return (
      <Form.Group controlId="formBasicSelect">
        <Form.Label className="d-flex justify-content-center">
          Change Teacher
        </Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => {
            this.changeHandler(e);
          }}
          value={this.state.classTeacher._id}
          name="classTeacher"
        >
          {this.state.teachList.map((teach, i) => {
            return (
              <option
                key={i}
                label={`${teach.lastName}, ${teach.firstName} - ${teach.rollNum}`}
                value={teach._id}
              />
            );
          })}
        </Form.Control>
        <Button
          className="d-flex justify-content-center"
          onClick={(e) => this.saveTeacher(e)}
        >
          Save Teacher
        </Button>
      </Form.Group>
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
            <Container>
              <Row className="d-flex justify-content-center">
                <h2>{this.state.class.title}</h2>
              </Row>
              <Row className="d-flex justify-content-center">Taught by </Row>
              <Row className="d-flex justify-content-center">
                {this.state.editTeacher ? (
                  this.TeacherDrop()
                ) : (
                  <Row className="d-flex justify-content-center">
                    <h3>
                      {this.state.class.teacher.lastName},
                      {this.state.class.teacher.firstName}
                    </h3>
                  </Row>
                )}
              </Row>
              <Row></Row>
              <Row className="d-flex justify-content-center">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      editTeacher: !this.state.editTeacher,
                    });
                  }}
                >
                  {this.state.editTeacher ? (
                    <>Cancel Change</>
                  ) : (
                    <>Edit Teacher</>
                  )}
                </Button>
              </Row>
              <p />
            </Container>
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
              {this.state.editStudents ? (
                <Row>
                  <Button
                    variant="secondary"
                    onClick={(e) => this.saveStudents(e)}
                  >
                    Save Students
                  </Button>
                </Row>
              ) : (
                <span />
              )}
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ViewClass);
