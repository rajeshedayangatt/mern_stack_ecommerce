import { REGISTER_USER , REGISTER_FAILED  } from "./type";
import axios from "axios";

export const userRegistration = (user,successCallback,failureCallback) => dispatch =>  {

	axios.post("/api/user/register",{
			    name: user.name,
			    email: user.email,
			    password : user.password,
			    username : user.username
			  })
			.then((res) => {

								localStorage.setItem("token", res.data.token);

								dispatch({
									type : REGISTER_USER,
									payload : {
										token : res.data.token,
										user : res.data.user
									}
								});
								successCallback();
				


			}).catch(function (err) {
		     console.log(err);
		    console.log(err);
								dispatch({
									type : REGISTER_FAILED,
									payload : err.response.data.msg
								});
								failureCallback(err.response.data.msg);
		  });


	
}