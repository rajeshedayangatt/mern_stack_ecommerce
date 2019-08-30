import React , { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getTotalCartCount } from "../../actions/cartActions";
import DropDown from "./dropdown";

class Header extends Component {

    constructor(){

        super();
        this.state  = {
            cart : 0,
            isUserLogined : false,
            count : 0
        }
        this.successCallback = this.successCallback.bind(this);
    }
    componentDidMount() {

       this.props.getTotalCartCount(this.successCallback);


    }
    successCallback() {
        this.setState({

            count : this.props.cartcount.cart_count
        });
    }


    render() {
       

        return(

                    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
                        <div className="container">
                            <Link className="navbar-brand" to="/">Simple Ecommerce</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-end pull-right" id="navbarsExampleDefault">
                                <ul className="navbar-nav m-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    
                                  
                    
                                   
                                     <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                    </li>
                                   
                                </ul>

                                <form className="form-inline my-2 my-lg-0">
                            
                                <DropDown />

                             <Link className="nav-link" className="btn btn-success btn-sm ml-3" to="/cart">
                             <i className="fa fa-shopping-cart"></i> cart
                                        <span className="badge badge-light">{this.state.count}</span>
                                   </Link>
                                </form>
                            </div>
                        </div>
                    </nav>

        );

        }

    }


const mapStateToProps = (state) => ({
    cartcount : state.cart,
    customerlogin : state.customerLogin

});
export default connect(mapStateToProps,{ getTotalCartCount})(withRouter(Header));