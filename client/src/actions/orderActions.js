import { ORDER_SAVE } from "./type";
import axios from "axios";

export const postOrder = (data,successCallBack,failureCallback) => dispatch => {

	axios.post("/api/order/save",
		data,
		{	
		headers: { 'x-auth-token': localStorage.getItem("token")
		} 
		}
		)
		.then((res) => {

				dispatch({
				 	  			type : ORDER_SAVE,
				 	  			payload :null
					});	
				if(res.data.status === 0) {

					failureCallback();

				}else{

					successCallBack();
				}

		})
		.catch((err) => {
				console.log(err);
		})
	 
}