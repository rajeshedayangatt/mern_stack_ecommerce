import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
// import Footer from "../components/includes/footer";
import MainContent from "../components/checkout/maincontent";
// import Heading from "../components/checkout/heading";




class Checkout extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default Checkout;