import {   LOGIN_FAILED ,LOGIN_USER,LOGOUT_USER} from "./type";
import axios from "axios";

export const userLogout = (successCallback) => dispatch => {

	dispatch({
		type : LOGOUT_USER,
		payload : null
	});
	successCallback();

}


export const userLogin = (user,successCallback,failureCallback) => dispatch =>  {

	axios.post("/api/user/auth",{
			    email: user.email,
			    password : user.password,
			  })
			.then((res) => {

								localStorage.setItem("token", res.data.token);

								var response_data = res.data;

								//var cart = JSON.parse(localStorage.getItem("cart"));
								//var token = localStorage.getItem("token");

										dispatch({
												type : LOGIN_USER,
												payload : {
													token : response_data.token,
													user : response_data.user
												}
											});
											successCallback();
										  	console.log(res);



								// if(cart) {

								// axios.post("http://localhost:5000/api/cart/save",{
								// 		    cart : cart ,
								// 			 } , {
								// 	 		 headers: { 'x-auth-token': token }
								// 			}).then(res => {
								// 			localStorage.removeItem("cart");
											
								// 			dispatch({
								// 				type : LOGIN_USER,
								// 				payload : {
								// 					token : response_data.token,
								// 					user : response_data.user
								// 				}
								// 			});
								// 			successCallback();
								// 		  	console.log(res);

								// 		  }).catch(function (err) {
								// 			     console.log(err.response);
								// 			     // console.log(err.response.status);
								// 								// 	dispatch({
								// 								// 		type : LOGIN_FAILED,
								// 								// 		payload : err.response.data.msg
								// 								// 	});
								// 				// 	failureCallback(err.response.data.msg);
								// 			  });
									
								// }




				


			}).catch( (err) =>  {
		     console.log(err);
		     // console.log(err.response.status);
							 	dispatch({
									type : LOGIN_FAILED,
							 		payload : err.response.data.msg
							 	});
							 	failureCallback(err.response.data.msg);
		  });


	
}