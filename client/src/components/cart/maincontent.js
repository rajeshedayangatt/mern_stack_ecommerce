import React , { Component } from "react";
//import Logo from "../../assets/images/items/1.jpg";
import CartItem from "./cart_items.js";
import { Link ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCartItems ,updateCartQuantity ,removeCartQuantity } from "../../actions/cartActions";

class MainContent extends Component {

    constructor() {

        super();
        this.state = {

            cart : [],
            sub_total : 0,
            shipping : 6,
            total : 0,
            token : ""
        };
       
        this.cartSuccess = this.cartSuccess.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.deleteQuantity = this.deleteQuantity.bind(this);
        this.removeQuantity = this.removeQuantity.bind(this);
        this.successRemove = this.successRemove.bind(this);

    }

    cartSuccess() {

        console.log("mydata",this.props.cart.cart_data);
         if(this.props.cart.cart_data.cart.length > 0) {
        console.log("props",this.props.cart.cart_data);

        var sub_total = 0;
        this.props.cart.cart_data.cart.map((items) => {

            sub_total = sub_total + (parseInt(items.price) * parseInt(items.quantity)  );
        });

        this.setState({
            cart : this.props.cart.cart_data.cart,
            sub_total : sub_total,
            total : sub_total + 6,
            token : localStorage.getItem("token")
        });
            
        }

        console.log(this.state);

    }
    componentDidMount() {

        var token = localStorage.getItem("token");

        if(token) {

            //get all cart items from server
            this.props.getCartItems(token,this.cartSuccess);

        }else{
            alert(2);
        }



        // if(token) {
        //     this.setState({
        //         token : token
        //     });
        // }

        // var local_cart = JSON.parse(localStorage.getItem("cart"));
        // var cart_data = [] ;
        // if(local_cart) {
        //       cart_data = local_cart;
        // }

        // if(cart_data.length > 0) 
        // {

        //  var i =0 ;
        //  var sub_total = 0;
        //  var total = 0; 
        //  var items = [];
        //  cart_data.map((cart) => {
        //                 i++;
        //                 items.push({
        //                     id : i,
        //                     name : cart.product_title,
        //                     image :cart.product_image,
        //                     quantity :cart.product_quantity,
        //                     price : cart.product_price,
        //                     status : true
        //                 });

        //     sub_total += parseFloat(cart.product_price) * parseFloat(cart.product_quantity);

        // }); 

        //         total = sub_total +this.state.shipping;


        //         this.setState({
        //             cart :items,
        //             sub_total : sub_total,
        //             total : total
        //         });  
        // }



    }


    addQuantity(id,price,e) {
        //increment one quantity price
        //  console.log(id);
        // console.log(price);
        //  console.log(e);

        // console.log(price);
        var cart = {
            cart_id : id ,
            type : "increase"
        };

        this.props.updateCartQuantity(cart);
        this.setState( {
            sub_total :this.state.sub_total += price,
            total :this.state.total += price,

        });





    }

    deleteQuantity(id,price,e) {

        //decrement one quantity price
   
        var cart = {
            cart_id : id ,
            type : "decrease"
        };

        this.props.updateCartQuantity(cart);
        this.setState( {
            sub_total :this.state.sub_total -= price,
            total :this.state.total -= price,

        });


    }

    removeQuantity(id,e) {

        var cart = {
            cart_id : id ,
        };

        this.props.removeCartQuantity(cart,this.successRemove);

    }


    successRemove() {

            alert("successfully removed");
            var token = localStorage.getItem("token");

            this.props.getCartItems(token,this.cartSuccess);
    }
    changeView() {


    }

    checkoutCart() {
        var token = localStorage.getItem("token");

        if(token) {

            //checkout cart

        }

    }


    render() {





        return(
            <div className="container mb-4">
            <div className="row">
                <div className="col-12"> 
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Available</th>
                                    <th scope="col" className="text-center">Quantity</th>
                                    <th scope="col" className="text-right">Price</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>

                          
                               { this.state.cart ?  (this.state.cart.map((items) => {

                                    return <CartItem key={items._id} id={items._id} image={items.image} title={items.productname} 
                                        price={items.price} quantity={items.quantity}
                                         cartIncrease={this.addQuantity} 
                                         cartDecrease={this.deleteQuantity}
                                         cartRemove={this.removeQuantity}
                                    />

                                })) : (<p>No Cart Data</p>) }
                              
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Sub-Total</td>
                                    <td className="text-right">
                                    {
                                        this.state.sub_total 
                                    } $
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Shipping</td>
                                    <td className="text-right">
                                    {
                                        this.state.shipping 
                                    } $
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total</strong></td>
                                    <td className="text-right"><strong>
                                    {
                                        this.state.total
                                    } $
                                    </strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6">
                            <button className="btn btn-block btn-light" onClick={this.changeView.bind(this)}>Continue Shopping</button>
                        </div>
                        <div className="col-sm-12 col-md-6 text-right">{

                            (this.state.token !== "") ? 
                            ( <Link to="/checkout" className="btn btn-lg btn-block btn-success text-uppercase">
                                Place Order
                            </Link>) : 
                            (<Link to="/login" className="btn btn-lg btn-block btn-success text-uppercase">
                                Login
                            </Link>)
                                                        
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>

            
        );

        }

    }

 const mapStateToProps = (state) => ({
   // cartcount : state.cart,
    cart : state.cart
 });
    export default connect(mapStateToProps,{getCartItems,updateCartQuantity,
        removeCartQuantity
    })(withRouter(MainContent));