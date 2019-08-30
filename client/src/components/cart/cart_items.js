import React ,{ Component}from "react";


const cartStyle = {
	width : '50px',
	height : '50px'
};

class CartItem extends Component {

	constructor(props) {

		super();

		this.state = {
			quantity : props.quantity,
			image : props.image,
			title : props.title,
			price : props.price,
			id : props.id

		};
	}

    incrementQuantity(id,price,e) {

    	this.setState({ quantity : this.state.quantity + 1});
    	this.props.cartIncrease(id,price,e);
    }
    decrementQuantity(id,price,e) {
    	if(this.state.quantity > 1){

    	    	this.setState({ quantity : this.state.quantity - 1});
    			this.props.cartDecrease(id,price,e);	
    	}

    }

    removecartitem(id,e) {

    	this.props.cartRemove(id,e);
    }

	render() {

				return(

						<tr>
				            <td><img src={this.state.image} alt="no product" style={cartStyle} /> </td>
				             <td>{this.state.title}</td>
				             <td>In stock </td>
				             <td>
				             <button className="btn btn-primary" 
				             onClick={this.decrementQuantity.bind(this,this.state.id,this.state.price)}
							 >-</button>
				             <input className="form-control col-md-2" style={{display: 'inline'}} type="text" value={this.state.quantity} 
				             />
							<button className="btn btn-primary"
							 onClick={this.incrementQuantity.bind(this,this.state.id,this.state.price)} >+</button>
				             </td>
				             <td className="text-right">{this.state.price} $</td>
				             <td className="text-right"><button className="btn btn-sm btn-danger" onClick={this.removecartitem.bind(this,this.state.id)}><i className="fa fa-trash"></i> </button> </td>
				        </tr>

					)

	}
	

}




export default CartItem;