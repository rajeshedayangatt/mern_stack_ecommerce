import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
// import Footer from "../components/includes/footer";
// import Sidebar from "../components/product_list/sidebar";
import MainContent from "../components/product_list/maincontent";
// import Heading from "../components/product_list/heading";




class Home extends Component {

        render() {
            return(

               
                <Fragment >
                    <Header />
                    <MainContent />
                </Fragment>
                
              
                
            );
        }

}

export default Home;