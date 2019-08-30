import React , { Component } from "react";

const cartStyle = {
	width : '50px',
	height : '50px'
};
const paths = window.location.origin;

class OrderDetails extends Component {

	render() {
		if(this.props.status == "show") {
return(

			<div>
			<p>Order Details</p>
            <hr />
			<table className="table">
			<tbody>
			{

				this.props.orderitems.length > 0 && this.props.orderitems.map(order => {

					return(

						<tr>
							<td><img src={order.image} alt="no product" style={cartStyle} /> </td>
							<td>{order.productname}</td>
							<td>{order.quantity}</td>
							<td>{order.price}</td>
						</tr>
					)

				})
			}
			</tbody>
			<tfoot>

				<tr><td colspan="3"><strong>Sub Total</strong></td><td>{this.props.subtotal}</td></tr>
				<tr><td colspan="3"><strong>Shipping</strong></td><td>{this.props.shipping}</td></tr>
				<tr><td colspan="3"><strong>Total</strong></td><td>{this.props.total}</td></tr>
				<tr><td colspan="3"><strong>Payment Status</strong></td><td>{this.props.payment_status}</td></tr>
				<tr><td colspan="3"><strong>Delivery Status</strong></td><td>{this.props.delivery_status}</td></tr>

			</tfoot>
			</table>
			</div>
		)

		}else{

			return(
				<div>

				</div>

				)
		}

		
	}

}


export default OrderDetails;