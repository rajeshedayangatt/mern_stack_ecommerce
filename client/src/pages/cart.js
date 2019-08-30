import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
// import Footer from "../components/includes/footer";
import MainContent from "../components/cart/maincontent";
// import Heading from "../components/cart/heading";




class ProductDetails extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default ProductDetails;