import React , { Component } from "react";
import Review from "./reviews.js";
import { connect } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { postCartProduct } from "../../actions/cartActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect ,  withRouter  } from "react-router-dom";


const review = [  {
                id : 1,
                review : "Lorem ipsum dolor sit amet, consec fugit sadelectus,aliquam. Placeat, quis perferendis.",
                reviewed_on : "January 01,2018",
                reviewed_by : "Rajesh",
                review_rate : "2"

            },
            {
                id : 2,
                review : "Lorem ipsum dolor sit amet, consec fugit sadelectus,aliquam. Placeat, quis perferendis.",
                reviewed_on : "January 03,2018",
                reviewed_by : "Jithesh",
                review_rate : "4"

            },
            {
                id : 3,
                review : "Lorem ipsum dolor sit amet, consec fugit sadelectus,aliquam. Placeat, quis perferendis.",
                reviewed_on : "January 02,2018",
                reviewed_by : "Jayan",
                review_rate : "3"
            },];


class MainContent extends Component {
    

    constructor () {
        super();
        this.state = {
            reviews : [],
            quantity : 1,
            inCart : false
        }

        this.handleCart = this.handleCart.bind(this);
        this.productCartCheck = this.productCartCheck.bind(this);
        this.successCallback = this.successCallback.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
    }   
    componentDidMount() {

            this.productCartCheck();

     
            this.props.getProduct(this.props.id);

            this.setState({reviews : review });

    }

    productCartCheck() {
             //check this file already in cart

            axios.post("/api/cart/check",
                        { "prodcutid" : this.props.id } ,
                        { 
                            headers: { 'x-auth-token': localStorage.getItem("token")
                        }}

                        ).then((result) => {

                            if(result.data.message == "exist") {

                                this.setState({ inCart : true })
                            }

                            console.log(this.state);

                        })
                        .catch((err) => {

                            console.log(err)
                        })
    }

    handleCart(e) {
        document.getElementById("cart_btn").disabled = true;
        document.getElementById("buy_btn").disabled = true;
        var cart = {
            productname  : this.props.product.product.product_name,
            productid : this.props.id,
            quantity : this.state.quantity,
            image :   "/static/product/"+this.props.product.product.product_image,
            price : this.props.product.product.product_selling_price
        }
        this.props.postCartProduct(cart,this.successCallback,this.errorCallback);


        e.preventDefault();

    }

    successCallback() {

        alert("Successfully added to cart");
        this.setState({
            inCart : true
        });
        this.props.history.push("/cart");
 document.getElementById("cart_btn").disabled = false;
        document.getElementById("buy_btn").disabled = false;
    }

    errorCallback() {
         document.getElementById("cart_btn").disabled = false;
        document.getElementById("buy_btn").disabled = false;
        alert("Faied to  added to cart");
    }

    handleQuantity(type){

        if(type == "increment") {

                this.setState({
                    quantity : this.state.quantity + 1
                });
        }
        if(this.state.quantity > 1) {

            if(type == "decrement") {

                this.setState({
                    quantity : this.state.quantity - 1
                });
            }

        }


    }

    render() {
                    let image_url  = "/static/product/"+this.props.product.product.product_image

        return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <a href="#" data-toggle="modal" data-target="#productModal">
                                        <img className="img-fluid" src={image_url} />
                                        <p className="text-center">Zoom</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 add_to_cart_block">
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                <h3 className="price text-primary" >{this.props.product.product.product_name}</h3>
                                    <p className="price"><strong> &#8377; {this.props.product.product.product_selling_price}</strong></p>
                                    <p className="price_discounted"><strong> &#8377; {this.props.product.product.product_actual_price}</strong></p>
                                    <form method="get" action="cart.html">
                                        <div className="form-group">
                                            <label htmlFor="colors">Color</label>
                                            <select className="custom-select" id="colors">
                                                <option value="">Select</option>
                                                <option value="1">Blue</option>
                                                <option value="2">Red</option>
                                                <option value="3">Green</option>
                                            </select>
                                        </div>
                                      

                                        {
                                            this.state.inCart ? (
                                        <Link to="/cart" className="btn btn-success btn-lg btn-block text-uppercase"
                                       
                                        >
                                            <i className="fa fa-shopping-cart"></i> Got To Cart
                                        </Link>
                                            ) : (

                                        <a href="#" id="cart_btn" className="btn btn-success btn-lg btn-block text-uppercase"
                                        onClick={this.handleCart}
                                        >
                                            <i className="fa fa-shopping-cart"></i> Add To Cart
                                        </a>
                                            )

                                        }

                                        <a href="#" id="buy_btn" className="btn btn-info btn-lg btn-block text-uppercase"
                                        onClick={this.handleCart}
                                        >
                                            <i className="fa fa-shopping-cart"></i> Buy Now
                                        </a>

                                    </form>
                                    <div className="product_rassurance">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><i className="fa fa-truck fa-2x"></i><br/>Fast delivery</li>
                                            <li className="list-inline-item"><i className="fa fa-credit-card fa-2x"></i><br/>Secure payment</li>
                                            <li className="list-inline-item"><i className="fa fa-phone fa-2x"></i><br/>+33 1 22 54 65 60</li>
                                        </ul>
                                    </div>
                                    <div className="reviews_product p-3 mb-2 ">
                                        3 reviews
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        (4/5)
                                        <a className="pull-right" href="#reviews">View all reviews</a>
                                    </div>
                                    <div className="datasheet p-3 mb-2 bg-info text-white">
                                        <a href="" className="text-white"><i className="fa fa-file-text"></i> Download DataSheet</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-light mb-3">
                                <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-align-justify"></i> Description</div>
                                <div className="card-body">
                                    <p className="card-text">
                                   {this.props.product.product.product_description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12" id="reviews">
                            <div className="card border-light mb-3">
                                <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-comment"></i> Reviews</div>
                                <div className="card-body">

                                {

                                    this.state.reviews.map((review) => {

                                        return   <Review 
                                    reviewed_on={review.reviewed_on} 
                                    reviewed_by={review.reviewed_by}  
                                    review={review.review}
                                    review_rate = {review.review_rate}
                                    />


                                    })
                                }

                                  
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
        );

        }

    }



    const mapStateToProps = (state,ownProps) => ({
        
        product : state.products,
        id : ownProps.product

    });


export default  connect(mapStateToProps,{getProduct ,postCartProduct })(withRouter(MainContent));