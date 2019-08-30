import React , { Component } from "react";
// import Logo from "../../assets/images/items/1.jpg";
import { connect } from "react-redux";
import { getProducts  } from "../../actions/productActions";
import { getTotalCartCount } from "../../actions/cartActions";
import ProductList from "./product_lists.js";
import  Category  from "./category";
import BestSelling from "./best_selling_product";
import "../../App.css";
import { Redirect ,  withRouter  } from "react-router-dom";


class MainContent extends Component {

    constructor() {
        super();
        this.handleCart= this.handleCart.bind(this);
        this.styleChange = this.styleChange.bind(this);
        this.handleRedirection = this.handleRedirection.bind(this);
    }

  componentDidMount() {
    this.props.getProducts();    
  }

  componentWillMount(){

  }

  styleChange(e) {

    console.log(e);
    e.target.style.cursor = 'pointer';
  }

  handleRedirection(id){

    this.props.history.push("/details/"+id);

  }
  handleCart(product) {

    var previous_data = localStorage.getItem('cart');
    previous_data = JSON.parse(previous_data);

    if(previous_data) {
         var cart = {
    
            "product_id" : product.id,
            "product_price" : product.price,
            "product_quantity" : 1,
            "product_image" : product.image,
            "product_title" : product.title
        };

        previous_data.push(cart);

        localStorage.setItem("cart", JSON.stringify(previous_data));

        //existing data


    }else{

        var cart = [{
    
            "product_id" : product.id,
            "product_price" : product.price,
            "product_quantity" : 1,
            "product_image" : product.image,
            "product_title" : product.title
        }];

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    this.props.getTotalCartCount();

    return false;
  }

    render() {


        const ListProducts = this.props.product.products.map((product) => {
            let image_url  = "/static/product/"+product.product_image
            return <ProductList key={product._id} 
                                title={product.product_name}
                                price={product.product_selling_price}
                                description={product.product_description}
                                image={image_url}
                                id={product._id} 
                                url ={product.product_name}
                                cartSave={this.handleCart}
                                changeCursor={this.styleChange}
                                redirectDetails={this.handleRedirection}
                                 />
                                
        });


  return(


    <div className="container">
    <div className="row">
        <div className="col-12 col-sm-3">
        <div className="card bg-light mb-3">
        <div className="card-header bg-dark text-white text-uppercase"><i className="fa fa-list"></i> Categories</div>
        
        <Category />

        </div>
            
        <div className="card bg-light mb-3">
        <div className="card-header bg-dark text-white text-uppercase">Best Selling product</div>
             
                <BestSelling />
        </div>
        </div>
        <div className="col">
        <div className="row">
            {ListProducts}
          

        </div>
        </div>
    </div>
</div>
        );
       

      }

}


const mapStateToProps = (state) => ({
    product : state.products,
});


export default  connect(mapStateToProps,{ 
    getProducts , 
    getTotalCartCount
})(withRouter(MainContent));