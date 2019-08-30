import React ,{ Fragment } from 'react';
import Header from "../components/includes/header";
import { Link } from "react-router-dom";
const OrderSuccess = () => {


	return (


               
                <Fragment >
                    <Header />
                    	<div className="container">

					<div className="jumbotron text-xs-center">
					  <h1 className="display-3">Thank You For The Purchase!</h1>
					  <p className="lead"> Your Order Has Been Received. </p>
					  <hr />
					  <p>
					    Having trouble? <Link to="/">Contact us</Link>
					  </p>
					  <p className="lead">
					  <Link to="/" className="btn btn-primary btn-sm">Continue to homepage</Link>
					  </p>
					</div>

			</div>

                </Fragment>
                

	)
}

export default OrderSuccess;