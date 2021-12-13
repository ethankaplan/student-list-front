import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div className="text-center" style={{ margin: "0 8vw 0 8vw" }}>
          Welcome to the teacher and student organization thing.
          <p />
          The goal of this project is to register students to the system, assign
          teachers to them, and have them be viewable in different ways,
          depending on the type of account accessing the info.
        </div>
        <p />
        <div>
          This is a tool built by me,{" "}
          <a href="https://github.com/ethankaplan" target="_blank">Ethan Kaplan.</a>
          <p />
          The front end code is{" "}
          <a href="https://github.com/ethankaplan/student-list-front" target="_blank">
            linked here.
          </a>{" "}
          And the backend code is{" "}
          <a href="https://github.com/ethankaplan/student-list-back" target="_blank">
            linked here.
          </a>
          <p />
          If you're looking at this from my resume, hello! I hope you like this
          and think{" "}
          <i>
            "wow, this dude is ready for an entry level position on the team I'm
            hiring for"
          </i>
        </div>
        <p />
        <div>
          <h4>Basic walkthrough</h4>
          <ul>
            <li>
              You can register, making a new Administrator or Teacher at the
              registration page.
            </li>
            <li> Students can be made, edited, or deleted.</li>
            <li>
              Classes bring the teachers and students together.
              <ul>
                {" "}
                <li>Creating one just requires a title and a teacher</li>
                <li>
                  Going to the edit page, from the class list directory, will
                  allow you to add/remove students, change the teacher or title
                </li>
                <li> Deleting the class is done from the class list.</li>
              </ul>
            </li>
          </ul>
        </div>
      </Container>
    );
  }
}
