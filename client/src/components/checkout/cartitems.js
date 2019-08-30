import React ,{useState , Component}from "react";


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

	render() {

				return(

						<tr >
				          <td><img src={this.state.image} alt="no product" style={cartStyle} /></td>
				             <td> {this.state.title} </td>
				             <td><strong>&#8377;{this.state.price} </strong></td>
				            
				        </tr>

					)

	}
	

}

export default CartItem;