import React , { Component } from "react";
import { postOrder } from "../../actions/orderActions";
import { connect } from "react-redux";
import { Link ,withRouter } from "react-router-dom";
import CartItem from "./cartitems.js";
import { getCartItems } from "../../actions/cartActions";

class MainContent extends Component {

    constructor() {

        super();
        this.state = {

            cart : [],
            sub_total : 0,
            shipping : 6,
            total : 0,
            token : "",
            name : "",
            email : "",
            address : ""
        };
       
        this.cartSuccess = this.cartSuccess.bind(this);
        this.handleInputEvent = this.handleInputEvent.bind(this);
        this.orderSave = this.orderSave.bind(this);
        this.orderSuccess = this.orderSuccess.bind(this);
        this.orderFailure = this.orderFailure.bind(this);

    }

    handleInputEvent(e) {

        this.setState({
            [e.target.name] : [e.target.value]
        });
    }

    orderSave(e) {
        var data = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address
        };
        this.props.postOrder(data,this.orderSuccess,this.orderFailure);
        e.preventDefault();
    }

    orderSuccess() {

        //alert("order successfully created");
        this.props.history.push("/ordersuccess")
    }

    orderFailure () {

        alert("order failed");
    }
    

    cartSuccess() {

        if(this.props.cart.cart_data.cart.length > 0) {
        console.log("props",this.props.cart.cart_data.cart);

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

        console.log(this.state.cart);
            
        }

    }


    componentDidMount() {

        var token = localStorage.getItem("token");

        if(token) {

            //get all cart items from server
            this.props.getCartItems(token,this.cartSuccess);

        }
        var total = 0;
        var shipping = 6;
        var sub_total = 0;
        if(this.state.cart.length > 0) {
            this.state.cart.map((item) => {

                    sub_total += item.price * item.quantity;
            });

            total = sub_total + shipping;
            this.setState({

                total: total ,
                sub_total : sub_total
            });
        }

    }
    render() {

        return(
            
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><i className="fa fa-envelope"></i> Checkout.
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputEvent} id="name" aria-describedby="emailHelp" placeholder="Enter name"  />
                                </div>
                                <div className="form-group">
                                    <label >Email address</label>
                                    <input type="email" className="form-control" name="email"  value={this.state.email} onChange={this.handleInputEvent} id="email" aria-describedby="emailHelp" placeholder="Enter email"  />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label >Address</label>
                                    <textarea className="form-control " name="address"  value={this.state.address} onChange={this.handleInputEvent} placeholder="Enter Delviery Address" id="message" rows="6" ></textarea>
                                </div>
                                <div className="mx-auto">
                                <button type="submit" onClick={this.orderSave} className="btn btn-primary text-right">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4">
                    <div className="card bg-light mb-3">
                        <div className="card-header bg-success text-white text-uppercase"><i className="fa fa-home"></i> Cart</div>
                        <div className="card-body">


                            <table className="table">
                            <thead>
                                { this.state.cart ?  (this.state.cart.map((items) => {



                                    return <CartItem key={items.id} id={items.id} image={items.image} title={items.productname} 
                                        price={items.price} quantity={items.quantity}
                                        
                                    />

                                })) : (<th>No Cart Data</th>) 
                              }
                                </thead>
                               <tbody>
                                <tr><td colspan="3">Sub Total : <strong>&#8377; {this.state.sub_total}</strong></td></tr>
                                <tr><td colspan="3">Shipping : <strong>&#8377; {this.state.shipping}</strong></td></tr>
                                <tr><td colspan="3">Total : <strong>&#8377; {this.state.total}</strong></td></tr>
                               </tbody>
                            </table>
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
    export default connect(mapStateToProps,{getCartItems,postOrder})(withRouter(MainContent));