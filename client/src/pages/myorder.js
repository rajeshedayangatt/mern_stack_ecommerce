import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
// import Footer from "../components/includes/footer";
import MainContent from "../components/myorder/maincontent";
// import Heading from "../components/cart/heading";




class MyOrder extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default MyOrder;