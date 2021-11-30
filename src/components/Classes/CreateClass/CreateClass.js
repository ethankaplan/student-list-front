import React, { Component } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import * as routes from '../../../constants/routes'

export default class CreateClass extends Component {

  constructor(props) {
    super(props)

    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    
    this.state = {
      teacher: '-1',
      title:'',
      teachList:[],
      classID:'',
      tLoad:true,
    }
  }

  componentDidMount(){
    this.teacherLister()    
    
      
  }

  teacherLister(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/teachers`)
    .then(res => {
      this.setState({
        teachList: res.data,
        tLoad:false
      });
    console.log(this.state.teachList)
    
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidUpdate(){
  
  }

  changeHandler = e => {
    this.setState({
        [e.target.name]: e.target.value  
    })
    console.log(this.state)
  };


  onSubmit(e) {
    e.preventDefault()
    if(this.state.teacher==-1||this.state.title==''){
      //reject
    }else{
      const classObject = {
        teacher: this.state.teacher,
        title: this.state.title,
      };
      console.log(classObject)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/class/create-class`, classObject)
        .then(res => this.setState({classID:res.data._id}))
        //.then(this.props.history.push(`/${routes.CLASS}/${this.state.classID}`));
    }
  }




  render() {

    return (<div>
      <div className="form-wrapper">
      
      <h2 className="d-flex justify-content-center">Add New Class</h2>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="ClassTitle">
        <Form.Label>Class Title</Form.Label>
              <Form.Control onChange={e => this.changeHandler(e)} name="title" placeholder="Title" value={this.state.title}/>
        </Form.Group>
                
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control
                    as="select"
                    onChange={e => {this.changeHandler(e)}}
                    name="teacher"
                    >
                    <option value ={-1} >-Select One-</option> 
                    {
                    this.state.teachList.map((teach, i)=>{  
                      return <option 
                      label={`${teach.lastName}, ${teach.firstName} - ${teach.rollNum}`}
                      value={teach._id}  
                    />

                    })}
                    
                    
                    
                    </Form.Control>
                    
                </Form.Group>

    

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Class
        </Button>
      </Form>
    </div></div>);
  }
}