import React , {Component} from "react";
import { connect } from "react-redux";
import { getBestSellingProduct } from "../../actions/productActions";


class BestSelling extends Component {

	constructor() {

		super();
		this.state = {

			image : "",
            title : "",
            discription : "", 
            price : "",
		}
		this.cb = this.cb.bind(this);
	}

  componentDidMount() {

    this.props.getBestSellingProduct(this.cb);
    
  }

	  cb() {
console.log("best",this.props.product.product_selling);
	  	    if(this.props.product.product_selling) {
	            var arr = this.props.product.product_selling;
	            	  	    	console.log("best",this.props.product.product_selling);

	  	         	this.setState({

						image : "/static/product/"+arr.product_image,
	  					title :arr.product_name,
	   					discription : arr.product_description,
	           			price : arr.product_selling_price,
	  	         	});
	        }
	    }

	render() {
		return(
		         <div className="card-body">
		            <img className="img-fluid" src={this.state.image} alt="Best Selling Product" />
		            <h5 className="card-title">{this.state.title}</h5>
		            <p className="card-text">{this.state.discription}</p>
		            <p className="bloc_left_price">{this.state.price}</p>
		          </div>
		);
	}
}



const mapStateToProps = (state) => ({
    product : state.products,

});


export default  connect(mapStateToProps,{ 
    getBestSellingProduct,
})(BestSelling);