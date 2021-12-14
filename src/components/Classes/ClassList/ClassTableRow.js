import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button }  from 'react-bootstrap';
import * as routes from '../../../constants/routes'

export default class ClassTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteClass = this.deleteClass.bind(this);
        
        this.state={
            teacher:{firstName:"Teacher Missing",lastName:"Please Update"}
        }
    }
    
    componentDidMount(){
        if(this.props.obj.teacher!=null){
            this.setState({
                teacher:this.props.obj.teacher
            })
        }
    }

    deleteClass() {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/class/delete-class/` + this.props.obj._id)
            .then((res) => {
                
                console.log('Class successfully deleted!')
                console.log(res)
                this.getTable();
                
            }).catch((error) => {
                console.log(error)
            })
    }

    getTable(){
        this.props.getTable();
    }

    

    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.state.teacher.lastName}, {this.state.teacher.firstName}</td>
                <td>
                    <Link className="edit-link" to={routes.CLASS+ "/" + this.props.obj._id} >
                        View/Edit
                    </Link>
                    <Button onClick={this.deleteClass} size="sm" variant="danger">Delete</Button>
                </td>
                
                
            </tr>
        );
    }
}