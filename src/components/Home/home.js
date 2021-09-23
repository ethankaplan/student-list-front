import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Home extends Component {
    render(
        
    ){
        return(
            
            <Container>
                {console.log(process.env)}
                <div className="text-center" style={{margin:'0 8vw 0 8vw'}}>
                Welcome to the teacher and student organization thing.<p/>
                The goal of this project is to register students to the system, assign teachers to them, and have them be viewable in different ways, depending on the type of account accessing the info.
                </div>

            </Container>
        )
    }


}