import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
import MainContent from "../components/login/maincontent";




class Login extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default Login;