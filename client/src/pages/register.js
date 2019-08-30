import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
import MainContent from "../components/register/maincontent";




class Register extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default Register;