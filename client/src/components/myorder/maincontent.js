import React , { Component } from "react";
import axios from "axios";
import OrderDetails from "./orderdetails";

class MainContent extends Component {

	constructor() {

		super();
		this.state = {
			orders : [],
			orderitems : [],
			subtotal : "",
			shipping : "",
			total : "",
			payment_status : "",
			delivery_status : "",
			status : ""
		}

		this.orderlist = this.orderlist.bind(this);
	}

	componentDidMount() {
		console.log("123");
		axios.get("/api/order/list",
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
			// this.setState(prevState => ({
			//   orders: [...prevState.orders, res.data]
			// }))

			this.setState({
			  orders: res.data
			})
					
							
				
		})
		.catch((err) => {
				console.log(err);
		})

	}

	orderlist() {

		return(
			<tr><td colspan='5'>No Orders Found</td></tr>
			)
	}

	cancelOrder(orderid) {

		axios.get("/api/order/cancel/"+orderid,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
			
			this.setState({
				orderitems: res.data.orderitems,
				subtotal :res.data.subtotal,
				shipping : res.data.shipping,
				total :res.data.total,
				payment_status : res.data.payment_status,
				delivery_status : res.data.delivery_status,
				status : "show"
			})
			

			alert("Order Cancelled");
							
				
		})
		.catch((err) => {
				console.log(err);
		})
	}

	showOrder(orderid) {
			this.setState({

						status : ""
			});
		axios.get("/api/order/listitems/"+orderid,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
			this.setState({
				orderitems: res.data.orderitems,
				subtotal :res.data.subtotal,
				shipping : res.data.shipping,
				total :res.data.total,
				payment_status : res.data.payment_status,
				delivery_status : res.data.delivery_status,
				status : "show"
			})
							
				
		})
		.catch((err) => {
				console.log(err);
		})
	}
	render() {
		
		if(this.state.orders.length > 0 ){
			var orderlist = this.state.orders.map((order) => {

				return (

					<tr>
					<td>#</td>
					<td>{order._id}</td>
					<td>
					<button data-id={order._id} onClick={this.showOrder.bind(this,order._id)} className="btn btn-info mr-2"><i className="fa fa-eye" title="View Order"></i></button>
					<button data-id={order._id} onClick={this.cancelOrder.bind(this,order._id)} className="btn btn-primary"><i className="fa fa-remove" title="Cancel Order"></i></button></td>
					</tr>
				)
			})

		}else{

			var orderlist =this.orderlist() ;
		}

		return(

			<div className="container mb-4">
            <div className="row">
                <div className="col-6"> 
                    <div className="table-responsive">
                        	<table className="table">
                        		<thead>
                        				<th>#</th>
                        				<th>Order Id</th>
                        				
                        				<th>Action</th>
                        		</thead>
                        		<tbody>
                        		{orderlist}
                        		</tbody>
                        	</table>
                    </div>
                </div>

                 <div className="col-6"> 
                			
                 <OrderDetails 
                 orderitems = {this.state.orderitems} 
 				 subtotal = {this.state.subtotal}
  				 shipping = {this.state.shipping}
   				 total = {this.state.total}
    			 payment_status = {this.state.payment_status}
     			 delivery_status = {this.state.delivery_status}
     			 status = {this.state.status}
                 />
                 </div>
               
            </div>
        </div>

		)
	}
}

export default MainContent;