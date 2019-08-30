import React, { Component ,Fragment } from 'react';
import Header from "../components/includes/header";
// import Footer from "../components/includes/footer";
// import Sidebar from "../components/product_details/sidebar";
import MainContent from "../components/product_details/maincontent";
// import Heading from "../components/product_details/heading";




class ProductDetails extends Component {
	constructor({ match }) {
		super();
		this.state = {
			productid : match.params.product
		}
	}

        render() {

        	
            return(

               
                <Fragment >
                    <Header />
                    <MainContent  product={this.state.productid} />
                </Fragment>
                
              
                
            );
        }

}

export default ProductDetails;