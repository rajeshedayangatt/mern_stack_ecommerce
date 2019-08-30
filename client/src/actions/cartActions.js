import { GET_CART_COUNT,GET_CART_ITEMS,CART_SAVE,CART_QUANTITY_UPDATE ,CART_REMOVE} from "./type";
import axios from "axios";



export const postCartProduct = (cart,successCallback,errorCallback) => dispatch => {

		axios.post("/api/cart/save",
		cart,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
				dispatch({
			 	  			type : CART_SAVE,
			 	  			payload :res.data
				});

				successCallback();
		})
		.catch((err) => {
				console.log(err);
				errorCallback();
		})

};

export const removeCartQuantity = (cart,successCallback) => dispatch => {
		axios.post("/api/cart/quantity/remove",
		cart,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
				dispatch({
			 	  			type : CART_REMOVE,
			 	  			payload :res.data
				});

					successCallback();
		})
		.catch((err) => {
				console.log(err);
		})

}
export const updateCartQuantity = (cart) => dispatch => {

		axios.post("/api/cart/quantity/update",
		cart,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {
				dispatch({
			 	  			type : CART_QUANTITY_UPDATE,
			 	  			payload :res.data
				});

				
		})
		.catch((err) => {
				console.log(err);
		})
}

export const getTotalCartCount = (successCallback) => dispatch => {
		console.log("called");
		axios.get("/api/cart/itemscount",
				 {
					headers: { 'x-auth-token': localStorage.getItem("token")}
				 }).then((res) => {
		

					 dispatch({
					 	  			type : GET_CART_COUNT,
					  	  			payload :res.data.data
					 	});
					 successCallback();

				})
				.catch(err =>
				 console.log(err)

				 );



}


 export const getCartItems = (token,successCallback) => dispatch => {

 	

 		axios.get("/api/cart/items",
				 {
					headers: { 'x-auth-token': token}
				 }).then((res) => {

				 	console.log("data",res.data.data);

					 dispatch({
					 	  			type : GET_CART_ITEMS,
					  	  			payload :res.data.data
					 	});

					 successCallback();

				})
				.catch(err =>
				 console.log(err)

				 );
				
						//successCallback();
};
 	






