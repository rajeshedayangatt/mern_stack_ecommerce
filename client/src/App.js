import React, { Component } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import "./assets/css/ui.css";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Home from "./pages/home";
import ProductDetails from "./pages/product_details";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Register from "./pages/register";
import Login from "./pages/login";
import OrderSuccess from "./pages/ordersuccess";
import RegisterSuccess from "./pages/registersuccess";
import Contact from "./pages/contact";

import MyOrder from "./pages/myorder";

class App extends Component {

  render() {


    return (
      
      <Router>
        <div className="App">

        <Route exact path="/"  component={Home} />
        <Route path="/details/:product?" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/ordersuccess" component={OrderSuccess} />
        <Route path="/registersuccess" component={RegisterSuccess} />
         <Route path="/contact" component={Contact} />
         <Route path="/myorder" component={MyOrder} />


        </div>
      </Router>
     
    );
  }
}


export default App ;
